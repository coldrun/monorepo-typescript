import { execa } from 'execa';
import minimist from 'minimist';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, '../');
const packagesDir = 'packages';
const packagesPath = path.join(rootPath, packagesDir);

const packages = fs.readdirSync(packagesPath);
const {
  version,
  docker: { registry },
} = createRequire(import.meta.url)('../package.json');

const args = minimist(process.argv.slice(2), { alias: { t: 'tag', v: 'verbose' } });
const target = `${args._[0]}`;
const tag = args.tag || 'latest';

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', cwd: rootPath, ...opts });

async function main() {
  if (!packages.includes(target)) {
    throw new Error(`Invalid target: '${target}'`);
  }
  const targetPath = `${packagesPath}/${target}`;
  const targetPackage = createRequire(import.meta.url)(`${targetPath}/package.json`);
  const name = targetPackage.name.replace('@', '');
  const packageName = `${registry}/${name}`;
  const currentImage = `${packageName}:v${version}`;
  const tagImage = `${packageName}:${tag}`;

  const dockerArgs = [
    'build',
    '.',
    '-f',
    `${targetPath}/Dockerfile`,
    '-t',
    currentImage,
    '-t',
    tagImage,
  ];
  if (args.verbose) {
    dockerArgs.push('--progress', 'plain');
  }
  await run('docker', dockerArgs);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
