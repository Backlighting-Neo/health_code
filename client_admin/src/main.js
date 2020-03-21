import Vue from 'vue';
import Layout from '@/layout.vue';
import router from '@/router';

Vue.config.productionTip = false;

const context = require.context('@/plugins/', false, /.*\.js$/);
context.keys().map(context);

new Vue({
  router,
  render: h => h(Layout)
}).$mount('#app');
