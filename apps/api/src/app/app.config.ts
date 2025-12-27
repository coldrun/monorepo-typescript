import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { registerAs } from '@nestjs/config';
import { Environment, getEnvironment, isLocalEnvironment } from './environment';

export type AppConfig = {
  environment: Environment;
  host: string;
  port: number;
  globalPrefix: string;
  cors: CorsOptions;
};

function getAppConfig(): AppConfig {
  const environment = getEnvironment();
  const origins = process.env.CORS_ORIGIN?.split(',') ?? [];
  if (isLocalEnvironment(environment)) {
    origins.push('*.\\.localhost');
  }

  return {
    environment,
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000,
    globalPrefix: process.env.GLOBAL_PREFIX || '',
    cors: {
      origin: origins.map((origin) => new RegExp(`^https?://${origin}:?[0-9]*$`)),
    },
  };
}

export const appConfig = registerAs('app', getAppConfig);
