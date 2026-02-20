FROM node:24-slim AS base

ARG ENV=prod

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update && apt-get install -y curl git && rm -rf /var/lib/apt/lists/*
RUN corepack enable

FROM base AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tsconfig.json ./
COPY packages/core packages/core
COPY packages/shared packages/shared
COPY packages/playground packages/playground

RUN --mount=type=cache,id=pnpm,target=/pnpm/store  \
    --mount=type=secret,id=npmrc,target=/root/.npmrc \
    pnpm install --frozen-lockfile
RUN pnpm build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store  \
    --mount=type=secret,id=npmrc,target=/root/.npmrc \
    pnpm deploy --legacy --filter="@coldrun/monorepo-typescript-playground" --prod /app/deploy

FROM nginx:stable AS playground

COPY packages/playground/.docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY packages/playground/.docker/expires.conf /etc/nginx/conf.d/expires.conf

COPY --from=build /app/deploy/dist /app
COPY --from=build /app/deploy/node_modules /app/node_modules

RUN ls -al /app
RUN ls -al /app/node_modules
#ENTRYPOINT ["node", "main.js"]
