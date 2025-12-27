export enum Environment {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export function getEnvironment(): Environment {
  const { ENVIRONMENT } = process.env;
  const env = Object.values(Environment).find((env) => env === ENVIRONMENT);
  return env ? env : Environment.PRODUCTION;
}

export function isLocalEnvironment(env?: Environment): boolean {
  const environment = env ? env : getEnvironment();
  return environment === Environment.LOCAL;
}
