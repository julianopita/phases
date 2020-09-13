
import Vue from '../lib/vue.js';
import VueRouter from '../lib/vue-router.js';
// import CadastroComponent from '../views/cadastro/CadastroComponent.vue';


Vue.use(VueRouter)

const routes = [
  {
    path : '/',
    name : 'CadastroComponent',
    component : '<template><div>asdasd</div></template>'
  }

]

const router = new VueRouter({
  routes
})

export default router