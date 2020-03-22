import Router from 'koa-router';
import { getFieldsByToken } from './controller/register';
import { listQrcode, addQrcode, listField, addField } from './controller/administrator';

const router = new Router({
  prefix: '/api',
});

router.get('/user/fields', getFieldsByToken);
router.put('/user/submit', getFieldsByToken);

router.get('/admin/qrcode/all', listQrcode);
router.put('/admin/qrcode/new', addQrcode);
router.get('/admin/field/all', listField);
router.put('/admin/field/new', addField);

export default router;