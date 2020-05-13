import Vue from "../lib/vue.js";


var Empty = Vue.component("empty",{
    template : `        
        <div id="empty">
            <link rel="stylesheet" href="./src/styles/empty.css">

            <ul id="buttonBox">
                <li v-for="item in navItems">{{item.item}}</li>
            </ul>
        </div>
            
        `,

        data(){
            return {
                navItems : [
                    {item : "1"},
                    {item : "2"},
                    {item : "3"},
                ]
            }
        }
})

export default Empty;