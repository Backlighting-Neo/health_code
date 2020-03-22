import Router from 'koa-router';
import { getFieldsByToken, submit } from './controller/register';
import { listQrcode, addQrcode, listField, addField, listRegister } from './controller/administrator';

const router = new Router({
  prefix: '/api',
});

router.get('/user/fields', getFieldsByToken);
router.put('/user/submit', submit);

router.get('/admin/qrcode/all', listQrcode);
router.put('/admin/qrcode/new', addQrcode);
router.get('/admin/field/all', listField);
router.put('/admin/field/new', addField);
router.get('/admin/register/all', listRegister);

export default router;