import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '../.env') });

export const KEYWORD =
  encodeURIComponent(process.env.KEYWORD) || 'video%20game';

export const INTERVAL = +process.env.INTERVAL || 2000;

export const WORKERS = process.env.WORKERS || 3;

export const RETRIEVE_METHOD: RetrieveMethod =
  (process.env.RETRIEVE_METHOD as RetrieveMethod) || 'workers';
