import App from './App.js';
import Vue from './lib/vue.js';
import router from './router/index.js'



Vue.config.productionTipimport = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

