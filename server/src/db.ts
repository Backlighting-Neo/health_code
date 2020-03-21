import { createConnection } from 'typeorm';
import config from './config';

import { Administrator } from './entity/administrator';
import { Field } from './entity/field';
import { Qrcode } from './entity/qrcode';
import { Register } from './entity/register';


export const connection = () => createConnection({
  ...config.database,
  entities: [
    Administrator,
    Field,
    Qrcode,
    Register,
  ],
});
