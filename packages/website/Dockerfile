FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/shared/package.json packages/shared/
COPY packages/website/package.json packages/website/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY packages/shared packages/shared
COPY packages/website packages/website
RUN pnpm run -r build

FROM nginx:stable as app

COPY packages/website/.docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY packages/website/.docker/expires.conf /etc/nginx/conf.d/expires.conf

RUN mkdir /app
COPY --from=builder /app/packages/website/dist /app
