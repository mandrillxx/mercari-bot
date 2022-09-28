import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '../.env') });

export const KEYWORD =
  encodeURIComponent(process.env.KEYWORD) || 'video%20game';
