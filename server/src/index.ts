import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';

import * as db from './db';
import router from './router';

async function main() {
  await db.connection();
  
  const app = new Koa();

  app.use(logger());
  app.use(helmet());
  app.use(router.routes());
  app.use(router.allowedMethods());

  const {
    APP_PORT = 3000,
    APP_ENV = 'local'
  } = process.env;

  app.listen(APP_PORT, () => {
    console.log(`🚀 Server running on http://0.0.0.0:${APP_PORT} [${APP_ENV}]`);
  });

};

main();