import { registerAs } from '@nestjs/config';
import { Environment, getEnvironment } from './environment';

export type AppConfig = {
  environment: Environment;
  host: string;
  port: number;
};

function getAppConfig(): AppConfig {
  return {
    environment: getEnvironment(),
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000,
  };
}

export const appConfig = registerAs('app', getAppConfig);
