import { ConsoleLogger, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { appConfig, AppConfig, AppModule, isLocalEnvironment } from './app';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const { host, port, environment, globalPrefix, cors } = app.get<AppConfig>(appConfig.KEY);
  const isLocal = isLocalEnvironment(environment);

  app.useLogger(new ConsoleLogger({ json: !isLocal }));
  const logger = new Logger('Bootstrap');

  app.set('trust proxy', true);
  app.set('query parser', 'extended');
  app.setGlobalPrefix(globalPrefix);
  app.enableCors(cors);
  app.use(helmet());
  app.enableShutdownHooks();

  await app.listen(port);

  logger.verbose(`API available at: https://${host}:${port}`);
}

// eslint-disable-next-line no-console
bootstrap().catch((e) => console.error(e));
