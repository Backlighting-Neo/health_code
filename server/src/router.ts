import Router from 'koa-router';
import { getFieldsByToken } from './controller/register';

const router = new Router({
  prefix: '/api',
});

router.get('/user/fields', getFieldsByToken);
router.put('/user/submit', getFieldsByToken);

export default router;