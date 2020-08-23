import App from './App.js';
import Inicial from './components/Inicial.js';
import Vue from './lib/vue.js';
import VueRouter from './lib/vue-router.js';



new Vue({
    el: '#app',
    components : {
        App,
        Inicial

    }
})