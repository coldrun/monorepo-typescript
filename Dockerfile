FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS build

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build
RUN pnpm deploy --filter=monorepo-typescript-playground --prod /prod/playground

FROM nginx:stable AS playground

COPY packages/playground/.docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY packages/playground/.docker/expires.conf /etc/nginx/conf.d/expires.conf

WORKDIR /app
COPY --from=build /prod/playground/dist /app
