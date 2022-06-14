import 'dotenv/config';

export const CONFIG = {
  GITHUB_TOKEN: requireEnv('GITHUB_TOKEN'),
  GITHUB_REPO: requireEnv('GITHUB_REPO'),
} as const;

function requireEnv(key: string): string | undefined;
function requireEnv<T>(key: string, defaultValue: T): string | T;
function requireEnv<T>(key: string, defaultValue?: T) {
  const envValue = process.env[key];
  envValue ??
    console.error(`
  - Missing Env: ${key}
  ${defaultValue ? `- Default Value: ${defaultValue}` : ''}
  `);
  return envValue ?? defaultValue;
}
