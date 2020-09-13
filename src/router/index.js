
import Vue from '../lib/vue.js';
import VueRouter from '../lib/vue-router.js';
import CadastroComponent from '../components/CadastroComponent.js';
import LoginComponent from '../components/LoginComponent.js';
import BimNomads from '../BimNomads.js';

Vue.use(VueRouter)

const routes = [
  {
    path : '/',
    name : 'CadastroComponent',
    component : CadastroComponent
  },
  {
    path : '/login',
    name : 'LoginComponent',
    component : LoginComponent
  },
  {
    path : '/application',
    name : 'BimNomads',
    component : BimNomads
  }


]

const router = new VueRouter({
  routes
})

export default router