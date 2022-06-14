import * as path from 'path';
import * as fs from 'fs';

export function createTestLoggerFile({
  data,
  targetPath = 'test.json',
}: {
  data: unknown;
  targetPath?: string;
}) {
  fs.writeFileSync(
    path.resolve(process.env.PWD, targetPath),
    JSON.stringify({
      data,
    }),
    'utf-8',
  );
}
