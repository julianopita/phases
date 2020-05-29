import Vue from "../lib/vue.js";
import Pessoa from "./Pessoa.js"

var Comentarios = Vue.component("comentarios",{
    template : `        
        <div id="comentarios">
            <link rel="stylesheet" href="./src/styles/comentarios.css">
            <pessoa></pessoa>
        </div>
            
        `,

        data(){
            return {
            }
        }
})

export default Comentarios;