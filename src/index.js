import Vue from "./lib/vue.js";
import NavBar from "./vue_lib/NabBar.js"
import Comentarios from "./vue_lib/Comentarios.js"
import Empty from "./vue_lib/Empty.js"




Vue.component("app",{
    
    //HTML principal
    template : `
        <div id="principal">
	        <link rel="stylesheet" href="./src/styles/principal.css">
            <nav-bar></nav-bar>
            <div id="layoutMain">
                <empty></empty>
                <comentarios> </comentarios>
            </div>
        </div>
    `


    }
)



new Vue({
    el: "#app",
})