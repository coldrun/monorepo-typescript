import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, '../');
const packagesDir = 'packages';
const packagesPath = path.join(rootPath, packagesDir);
const packages = fs.readdirSync(packagesPath);

const {
  docker: { registry },
  repository,
} = createRequire(`${rootPath}/`)('./package.json');

const exec = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', cwd: rootPath, ...opts });

function imageInfo(target, { tag }) {
  if (!packages.includes(target)) {
    throw new Error(`Invalid target: '${target}'`);
  }
  const targetPath = `${packagesPath}/${target}`;
  const targetPackage = createRequire(import.meta.url)(`${targetPath}/package.json`);
  const name = targetPackage.name.split('/').pop();
  const tagName = tag || 'latest';

  const imageName = `${registry}/${name}`;
  const image = `${imageName}:${tagName}`;

  return { imageName, image, targetPath };
}

yargs(hideBin(process.argv))
  .command(
    'build <target>',
    'build docker image',
    {
      tag: { alias: 't', default: 'latest' },
      verbose: { alias: 'v', type: 'boolean' },
    },
    async (args) => {
      const { target, tag, verbose } = args;
      const { image, targetPath } = imageInfo(target, { tag });
      const dockerArgs = [
        'build',
        '.',
        '-f',
        `${targetPath}/Dockerfile`,
        '--label',
        `org.opencontainers.image.source=${repository}`,
        '-t',
        image,
        '--secret',
        `id=npmrc,src=${process.env.HOME}/.npmrc`,
      ];
      if (verbose) {
        dockerArgs.push('--progress', 'plain');
      }
      console.log('Running docker:', dockerArgs.join(' '));
      await exec('docker', dockerArgs);
    },
  )
  .command(
    'push <target>',
    'push docker image',
    {
      verbose: { alias: 'v', type: 'boolean' },
    },
    async (args) => {
      const { target, verbose } = args;
      const { image } = imageInfo(target, {});

      const push = async (args) => {
        if (verbose) {
          args.push('--progress', 'plain');
        }
        console.log('Running docker:', args.join(' '));
        await exec('docker', args);
      };

      const dockerArgs = ['push', image];
      await push(dockerArgs);
    },
  )
  .help()
  .demandCommand()
  .parse();
