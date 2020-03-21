import Router from 'koa-router';
import { getProjectGroupByMis } from './controller/register';

const router = new Router({
  prefix: '/api',
});

router.get('/project/my', getProjectGroupByMis);

export default router;