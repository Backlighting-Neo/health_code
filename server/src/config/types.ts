import { ConnectionOptions } from 'typeorm';

export default interface Config {
  [key: string]: any;
  database: ConnectionOptions;
}