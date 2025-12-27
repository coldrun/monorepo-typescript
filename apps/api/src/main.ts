import { ConsoleLogger, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { appConfig, AppConfig, AppModule, isLocalEnvironment } from './app';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const { host, port, environment } = app.get<AppConfig>(appConfig.KEY);
  const isLocal = isLocalEnvironment(environment);

  app.useLogger(new ConsoleLogger({ json: !isLocal }));
  const logger = new Logger('Bootstrap');

  app.set('trust proxy', true);
  app.set('query parser', 'extended');

  app.enableShutdownHooks();

  await app.listen(port);

  logger.verbose(`API available at: https://${host}:${port}`);
}

// eslint-disable-next-line no-console
bootstrap().catch((e) => console.error(e));
