const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

const GIT_SERVER = 'https://github.com/';
const GIT_REPO = GIT_SERVER + '/iamkenos/ellie/';
const LOG_FORMAT = `- [%h](${GIT_REPO}commit/%h) %s [[%an](${GIT_SERVER}%an)]`;
const RELEASE_LOG_FILE = path.join(__dirname, '../docs/RELEASES.md');

const gitReset = () => shell.exec('git reset --hard', { silent: true });
const getVersion = () => shell.exec('./bin/ellie.js --version', { silent: true }).stdout.trim();
const getGitLog = () => shell.exec(`git log --pretty=format:"${LOG_FORMAT}" --graph $(git rev-parse --abbrev-ref HEAD)`, { silent: true }).stdout.split('\n');
const getNextVersion = () => shell.exec('npm --no-git-tag-version version patch', { silent: true }).stdout;

const dt = new Date();
const dd = ('0' + dt.getDate()).slice(-2);
const mm = ('0' + (dt.getMonth() + 1)).slice(-2);
const yyyy = dt.getFullYear();

const releaseLogContent = fs.readFileSync(RELEASE_LOG_FILE, 'utf8');
const releaseLogHeader = releaseLogContent.split('\n').splice(0, 8).join('\n');
const prevChanges = releaseLogContent.replace(releaseLogHeader, '').trim();

const releaseDate = '`' + `${yyyy}-${mm}-${dd}` + '`';
const lastVersion = prevChanges.trim().substring(3, prevChanges.indexOf('\n'));
const newVersion = getNextVersion();
const releaseVersion = '## ' + newVersion.substring(1, newVersion.indexOf('\n'));

const gitLog = gitReset() && getGitLog();
const currChanges = gitLog.splice(0, gitLog.findIndex(i => i.includes(`release: ${lastVersion}`)))
  .map(i => i.substring(2))
  .join('\n');

const release =
`${releaseLogHeader}
${releaseVersion}

${releaseDate}

${currChanges}

${prevChanges}
`;

fs.outputFileSync(RELEASE_LOG_FILE, release);
shell.exec('git add . && npm version patch -f -m "release: %s"');
