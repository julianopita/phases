
import Vue from '../lib/vue.js';
import VueRouter from '../lib/vue-router.js';
import Plataforma from '../components/plataforma/Plataforma.js';
import Cadastro from '../components/TelaCadastro.js';
import Login from '../components/TelaLogin.js';


Vue.use(VueRouter)

const routes = [
  {
    path : '/plataforma',
    name : 'plataforma',
    component : Plataforma
  },
  {
    path : '/',
    name : 'cadastro',
    component : Cadastro
  },
  {
    path : '/login',
    name : 'login',
    component : Login
  },


]

const router = new VueRouter({
  routes
})

export default router;