import App from './App.js';
import Vue from './lib/vue.js';
// import router from './router/index.js'


console.log(axios)


Vue.config.productionTipimport = false;

new Vue({
  render: h => h(App)
}).$mount('#app')

