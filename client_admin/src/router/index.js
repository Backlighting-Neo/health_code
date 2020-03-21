import Vue from 'vue';
import VueRouter from 'vue-router';

import report from '@/views/report.vue';
import qrcode from '@/views/qrcode.vue';
import field from '@/views/field.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/report'
  }, {
    path: '/report',
    component: report
  }, {
    path: '/qrcode',
    component: qrcode
  }, {
    path: '/field',
    component: field
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
