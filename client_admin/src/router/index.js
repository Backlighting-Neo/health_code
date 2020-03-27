import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/report'
  }, {
    path: '/report',
    component: () => import('@/views/report.vue')
  }, {
    path: '/qrcode',
    component: () => import('@/views/qrcode.vue')
  }, {
    path: '/field',
    component: () => import('@/views/field.vue')
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
