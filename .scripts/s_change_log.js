const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

const GIT_SERVER = 'https://github.com/';
const GIT_REPO = GIT_SERVER + '/iamkenos/ellie/';
const LOG_FORMAT = `- [%h](${GIT_REPO}commit/%h) %s [[%an](${GIT_SERVER}%an)]`;
const RELEASE_LOG_FILE = path.join(__dirname, '../docs/RELEASES.md');

const gitReset = () => shell.exec('git reset --hard', { silent: true });
const getVersion = () => shell.exec('./bin/ellie.js --version', { silent: true }).stdout.trim();
const getGitLog = () => shell.exec(`git log --pretty=format:"${LOG_FORMAT}" --graph`, { silent: true }).stdout.split('\n');
const getNextVersion = () => shell.exec('npm --no-git-tag-version version patch', { silent: true }).stdout;

const dt = new Date();
const dd = ('0' + dt.getDate()).slice(-2);
const mm = ('0' + (dt.getMonth() + 1)).slice(-2);
const yyyy = dt.getFullYear();

const releaseDate = '`' + `${yyyy}-${mm}-${dd}` + '`';
const currVersion = getVersion();
const tmpVersion = getNextVersion();
const newVersion = '## ' + tmpVersion.substring(0, tmpVersion.indexOf('\n'));

const gitLog = gitReset() && getGitLog();
const releaseLogContent = fs.readFileSync(RELEASE_LOG_FILE, 'utf8');
const releaseLogHeader = releaseLogContent.split('\n').splice(0, 5).join('\n');

const prevChanges = releaseLogContent.replace(releaseLogHeader, '').trim();
const currChanges = gitLog.splice(0, gitLog.findIndex(i => i.includes(`release: ${currVersion}`)))
  .map(i => i.substring(2))
  .join('\n');

const release =
`${releaseLogHeader}

${newVersion}

${releaseDate}

${currChanges}

${prevChanges}
`;

fs.outputFileSync(RELEASE_LOG_FILE, release);
