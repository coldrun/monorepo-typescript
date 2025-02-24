# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.0](https://github.com/coldrun/monorepo-typescript/compare/v0.2.0-rc.1...v0.2.0) (2025-02-24)

### Bug Fixes

* **ci:** handle conventional-graduate in release workflow ([5ecdaeb](https://github.com/coldrun/monorepo-typescript/commit/5ecdaeb33464a7539c0d5b3e6c0c39b4582e9039))
* **ci:** invalid condition in release workflow ([5ad97ce](https://github.com/coldrun/monorepo-typescript/commit/5ad97ce8bf7690f45f7329627e2a19a40e9e063a))

## [0.2.0-rc.1](https://github.com/coldrun/monorepo-typescript/compare/v0.2.0-rc.0...v0.2.0-rc.1) (2025-02-24)

### Features

* **ci:** add git-town action ([39dc7f5](https://github.com/coldrun/monorepo-typescript/commit/39dc7f5bb8825a852d115a872b07b68c1520ebe6))
* **ci:** add github token for NPM private packages ([b132205](https://github.com/coldrun/monorepo-typescript/commit/b1322052c4c3af0977a2ea0dded5f29c5491bac0))
* **ci:** release workflow ([892efae](https://github.com/coldrun/monorepo-typescript/commit/892efaea2844730c945b412509ada4827363eac1))
* commitlint ([#17](https://github.com/coldrun/monorepo-typescript/issues/17)) ([6ffb216](https://github.com/coldrun/monorepo-typescript/commit/6ffb2169f6c2277b34c4babdbbf9098a2e7d5040))
* **package:** switch from `simple-git-hooks` to `husky` ([#18](https://github.com/coldrun/monorepo-typescript/issues/18)) ([f2ee0d7](https://github.com/coldrun/monorepo-typescript/commit/f2ee0d772f4e89f19bdaf2f41a1d152d70c9f530))

### Bug Fixes

* **ci:** docker build ([a538087](https://github.com/coldrun/monorepo-typescript/commit/a538087cc9ba95068cdbd62f93efa90ff85ca6a4))

### Documentation

* improved readme ([a0c084b](https://github.com/coldrun/monorepo-typescript/commit/a0c084bea98b33ed69e6fd30dd5750a48d88ba77))

## [0.2.0-rc.0](https://github.com/coldrun/monorepo-typescript/compare/v0.1.1...v0.2.0-rc.0) (2024-11-15)

### Features

* add publishable `core` package ([#16](https://github.com/coldrun/monorepo-typescript/issues/16)) ([4ece9c4](https://github.com/coldrun/monorepo-typescript/commit/4ece9c484e0dcfebcb6f81f1bc5660617ce6ebdb)), closes [#5](https://github.com/coldrun/monorepo-typescript/issues/5) [#5](https://github.com/coldrun/monorepo-typescript/issues/5) [#5](https://github.com/coldrun/monorepo-typescript/issues/5)

### Bug Fixes

* **docker:** use lerna version + combined dockerfile ([#14](https://github.com/coldrun/monorepo-typescript/issues/14)) ([63933d4](https://github.com/coldrun/monorepo-typescript/commit/63933d449626ae8e3c1847748a3b4f9796ccfaf1))

## [0.1.1](https://github.com/coldrun/monorepo-typescript/compare/v0.1.0...v0.1.1) (2024-10-08)

### Bug Fixes

* **ci:** enable github releases ([20bb006](https://github.com/coldrun/monorepo-typescript/commit/20bb00623e0f8c37ca6aa549ebe1289ef580b733))
* **package:** pnpm workspace packages filtering ([#15](https://github.com/coldrun/monorepo-typescript/issues/15)) ([c609caf](https://github.com/coldrun/monorepo-typescript/commit/c609cafc74f7b97b914d4139bcc578b7fac69ccc))

## [0.1.0](https://github.com/coldrun/monorepo-typescript/compare/v0.0.4...v0.1.0) (2024-10-08)

### ⚠ BREAKING CHANGES

* rename website package to playground

### Features

* **package:** setup lerna-lite ([#11](https://github.com/coldrun/monorepo-typescript/issues/11)) ([2e87031](https://github.com/coldrun/monorepo-typescript/commit/2e8703186df59accf0bb56755676c69cc9e7cd61))
* rename website package to playground ([b24dc83](https://github.com/coldrun/monorepo-typescript/commit/b24dc8305560bbd3509cf12f843de9a5b8966dca))

### Bug Fixes

* docker build after package rename ([16b1409](https://github.com/coldrun/monorepo-typescript/commit/16b14092bac8fb9c39e387627ed02b79ec728a54))
* **package:** rename ([a232b24](https://github.com/coldrun/monorepo-typescript/commit/a232b24653505cdfd989dff0a4f0ab4bb8f80a84))
* **package:** rename ([fc27f33](https://github.com/coldrun/monorepo-typescript/commit/fc27f335a1d614cff9eb58f3db9733abe584848d))
* **playground:** public image import ([#12](https://github.com/coldrun/monorepo-typescript/issues/12)) ([ef1638b](https://github.com/coldrun/monorepo-typescript/commit/ef1638be98555250e28d62baa4de16c9e2e406e4))
* rename from website to playground ([001d10c](https://github.com/coldrun/monorepo-typescript/commit/001d10c1b705e1984c631acbdd277c8d59ccbd71))
* **shared:** set source files as entry point ([e40dceb](https://github.com/coldrun/monorepo-typescript/commit/e40dceb3c7e712c15d0b53642c1a282d202b8afe))

## [0.0.4](https://github.com/coldrun/monorepo-typescript/compare/v0.0.3...v0.0.4) (2024-08-19)

### Bug Fixes

- **ci:** github pages base url ([4a6242f](https://github.com/coldrun/monorepo-typescript/commit/4a6242f0b047daeba02e62bf2e379810f1ecb29b))
- **ci:** github pages base url ([938ac7e](https://github.com/coldrun/monorepo-typescript/commit/938ac7e04d5c022763b577b7e2524163e17a2690))
- **ci:** multiple versions of pnpm specified ([c73bbba](https://github.com/coldrun/monorepo-typescript/commit/c73bbbad27ba7ba54be1fb0ce91b85617e2b06a4))

### Features

- **ci:** deploy to github pages ([0948391](https://github.com/coldrun/monorepo-typescript/commit/0948391a5ebb7f307b499ac44529908f1973a032))
- **docker:** add docker-compose.yml ([fba820d](https://github.com/coldrun/monorepo-typescript/commit/fba820dc4028de57f0f873c3d7f6d0f8b6231509))

## [0.0.3](https://github.com/coldrun/monorepo-typescript/compare/v0.0.2...v0.0.3) (2024-01-04)

### Bug Fixes

- **ci:** dockerfile location ([3bd58b9](https://github.com/coldrun/monorepo-typescript/commit/3bd58b9b653c53107d321a0332bb40fc35aeea87))

## [0.0.2](https://github.com/coldrun/monorepo-typescript/compare/v0.0.1...v0.0.2) (2024-01-04)

### Bug Fixes

- **ci:** docker publish ([27062d3](https://github.com/coldrun/monorepo-typescript/commit/27062d3ddf352aeb67a05750f2b1702cc3b180e8))
- **release:** remove build step ([2e4f378](https://github.com/coldrun/monorepo-typescript/commit/2e4f3780340d2a5a64ba614799ff2810f0f4768a))

### Features

- **ci:** docker publish ([d83d1c4](https://github.com/coldrun/monorepo-typescript/commit/d83d1c49815c20f90558923fad175db0bbce027b))
- **package:** docker build ([98cdff9](https://github.com/coldrun/monorepo-typescript/commit/98cdff930f8d4824983e42161e795893ed8d78ba))

## [0.0.1](https://github.com/coldrun/monorepo-typescript/compare/78836223f74026dce4def8b2d69753202dfa18fc...v0.0.1) (2024-01-04)

### Features

- **package:** release & changelog ([38acccc](https://github.com/coldrun/monorepo-typescript/commit/38acccc70a2a977be00fb09952bb3fbc4e62e1e9))
- **setup:** typescript, prettier, eslint, lint-staged, simple-git-hooks ([7883622](https://github.com/coldrun/monorepo-typescript/commit/78836223f74026dce4def8b2d69753202dfa18fc))
- shared library package ([5f37462](https://github.com/coldrun/monorepo-typescript/commit/5f3746295022c6ba530cb52f25bbcdeb342452bf))
- website package ([828ab2d](https://github.com/coldrun/monorepo-typescript/commit/828ab2d1c77d8bfc3ea8cfea53d9f94ad49be949))
