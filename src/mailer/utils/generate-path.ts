import { join } from 'path';

export const generatePath = (fileName: string) =>
  join(process.cwd(), 'emails', fileName);
