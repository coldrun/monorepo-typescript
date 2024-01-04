import { execa } from 'execa';
import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { resolve } from 'path';
import c from 'picocolors';
import prompts from 'prompts';
import { inc, valid } from 'semver';
import { fileURLToPath } from 'url';

const { version: currentVersion } = createRequire(import.meta.url)('../package.json');

const versionIncrements = ['patch', 'minor', 'major'];
const tags = ['latest', 'next'];

const dir = fileURLToPath(new URL('.', import.meta.url));
const increment = (i) => inc(currentVersion, i);
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts });
const step = (msg) => console.log(c.cyan(`\n${msg}`));

async function main() {
  let targetVersion;

  const versions = versionIncrements.map((i) => `${i} (${increment(i)})`).concat(['custom']);

  const { release } = await prompts({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versions,
  });

  if (release === 3) {
    targetVersion = (
      await prompts({
        type: 'text',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version;
  } else {
    targetVersion = versions[release].match(/\((.*)\)/)[1];
  }

  if (!valid(targetVersion)) {
    throw new Error(`Invalid target version: ${targetVersion}`);
  }

  const { tag } = await prompts({
    type: 'select',
    name: 'tag',
    message: 'Select tag type',
    choices: tags,
  });

  const { yes: tagOk } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion} on ${tags[tag]}. Confirm?`,
  });

  if (!tagOk) {
    return;
  }

  // Update the package version.
  step('Updating the package version...');
  updatePackage(targetVersion);

  // Generate the changelog.
  step('Generating the changelog...');
  await run('pnpm', ['changelog']);
  await run('pnpm', ['prettier', '--write', 'CHANGELOG.md']);

  const { yes: changelogOk } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `Changelog generated. Does it look good?`,
  });

  if (!changelogOk) {
    return;
  }

  // Commit changes to the Git and create a tag.
  step('Committing changes...');
  await run('git', ['add', 'CHANGELOG.md', 'package.json']);
  await run('git', ['commit', '-m', `release: v${targetVersion}`]);
  await run('git', ['tag', `v${targetVersion}`]);

  // Push to GitHub.
  step('Pushing to GitHub...');
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`]);
  await run('git', ['push']);
}

function updatePackage(version) {
  const pkgPath = resolve(resolve(dir, '..'), 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  pkg.version = version;

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
