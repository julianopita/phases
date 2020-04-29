import Vue from "./lib/vue.js";
import NavBar from "./lib/NabBar.js"



Vue.component("app",{
    
    //HTML principal
    template : `
        <div id="principal" v-else :style="css">

            <nav-bar></nav-bar>
        </div>
    `,




    //CSS principal
    data(){
        return {
            width : window.width,

            css : {
                "background-color" : "blue",
                position : "absolute",
                top : "0px"
                }
            }
        }
    }
)



new Vue({
    el: "#app",
})