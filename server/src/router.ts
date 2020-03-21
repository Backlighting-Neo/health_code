import Router from 'koa-router';
import { getProjectGroupByMis } from './controller/project_group';

const router = new Router({
  prefix: '/api',
});

router.get('/project/my', getProjectGroupByMis);

export default router;