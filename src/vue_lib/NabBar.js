import Vue from "../lib/vue.js";


var NavBar = Vue.component("nav-bar",{
    template : `        
        <div id="navbar">
            
            <ul>
                <li v-for="item in navItems">{{item.item}}</li>
            </ul>
            <link rel="stylesheet" href="./src/styles/barra_navegacao.css">
        </div>
            
        `,

        data(){
            return {
                navItems : [
                    {item : "Home"},
                    {item : "Nomads"},
                    {item : "Sobre"},
                ]
            }
        }
})

export default NavBar;