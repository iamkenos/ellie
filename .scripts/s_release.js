const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

const GIT_SERVER = 'https://github.com/';
const GIT_REPO = GIT_SERVER + '/iamkenos/ellie/';
const GIT_BRANCH = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.trim();
const LOG_FORMAT = `- [%h](${GIT_REPO}commit/%h) %s [[%an](${GIT_SERVER}%an)]`;
const RELEASE_LOG_FILE = path.join(__dirname, '../docs/RELEASES.md');
const VERSIONS = ['patch', 'minor', 'major'];

const gitReset = () => shell.exec('git reset --hard', { silent: true });
const gitLog = () => shell.exec(`git log --pretty=format:"${LOG_FORMAT}" --graph ${GIT_BRANCH}`, { silent: true }).stdout.split('\n');

function preRelease(version = VERSIONS[0]) {
  if (!VERSIONS.includes(version)) throw new Error('Invalid version arg: ' + version);

  const dt = new Date();
  const dd = ('0' + dt.getDate()).slice(-2);
  const mm = ('0' + (dt.getMonth() + 1)).slice(-2);
  const yyyy = dt.getFullYear();

  const releaseLogContent = fs.readFileSync(RELEASE_LOG_FILE, 'utf8');
  const releaseLogHeader = releaseLogContent.split('\n').splice(0, 8).join('\n');
  const prevChanges = releaseLogContent.replace(releaseLogHeader, '').trimLeft();

  const releaseDate = '`' + `${yyyy}-${mm}-${dd}` + '`' + '\n';
  const prevVersion = prevChanges.trim().substring(3, prevChanges.indexOf('\n'));
  const nextVersion = shell.exec(`npm --no-git-tag-version version ${version}`, { silent: true }).stdout;
  const releaseVersion = '## ' + nextVersion.substring(1, nextVersion.indexOf('\n')) + '\n';

  const log = gitReset() && gitLog();
  const releaseChanges = log.splice(0, log.findIndex(msg => msg.includes(`release: ${prevVersion}`)))
    .map(msg => msg.substring(2))
    .join('\n')
    .concat('\n');

  const release = [releaseLogHeader, releaseVersion, releaseDate, releaseChanges, prevChanges];

  fs.outputFileSync(RELEASE_LOG_FILE, release.join('\n'));
  return `git add . && npm version ${version} -f -m "release: %s"`;
}

function release() {
  return 'npm publish';
}

function postRelease() {
  return `git push --set-upstream origin ${GIT_BRANCH} && git push origin $(git describe --abbrev=0)`;
}

function printMarker(title) {
  console.log('--------------------------------')
  console.log(title)
  console.log('--------------------------------')
}

function run(header, command, options) {
  printMarker(`Start: ${header}...`)

  const result = shell.exec(command, options);
  console.log(result.stdout.trim())
  if(result.code !== 0) throw new Error(result.stderr.trim());

  printMarker(`End: ${header}...`)
}


run('Changelog', preRelease(process.argv[2]), { silent: true });
run('Publish', release(), { silent: true });
run('Push', postRelease());
