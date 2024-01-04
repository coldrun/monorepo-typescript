FROM node:18-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base as builder

WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

RUN pnpm deploy --filter=website --prod /prod/website

#### website
FROM nginx:stable as website

COPY --from=builder /prod/website/.docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /prod/website/.docker/expires.conf /etc/nginx/conf.d/expires.conf

RUN mkdir /app
COPY --from=builder /prod/website/dist /app
