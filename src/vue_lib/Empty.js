import Vue from "../lib/vue.js";


var Empty = Vue.component("empty",{
    template : `        
        <div id="empty">
            <link rel="stylesheet" href="./src/styles/empty.css">
        </div>
            
        `,

        data(){
            return {
            }
        }
})

export default Empty;