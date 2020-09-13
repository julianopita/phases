import App from './App.js';
import Vue from './lib/vue.js';
import VueRouter from './lib/vue-router.js';
import LoginComponent from './components/LoginComponent.js';
import CadastroComponent from './components/CadastroComponent.js';

Vue.use(VueRouter);


const app = new Vue({
    el: '#app',
    components : {
        App,
        LoginComponent,
        CadastroComponent
    }
})

