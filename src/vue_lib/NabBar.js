import Vue from "../lib/vue.js";


var NavBar = Vue.component("nav-bar",{
    template : `        
        <div id="navbar">
            <link rel="stylesheet" href="./src/styles/barra_navegacao.css">
            <ul>
                <li v-for="item in navItems"  style="padding-left: 15px;
                padding-right: 15px;">{{item.item}}</li>
            </ul>
            
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