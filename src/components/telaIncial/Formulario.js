



{/* 
 */}





const Formulario = {
    name : "formulario",
    template : `
        <div id="formulario">
            <div>
                <ul>
                </ul>
            </div>
            <div class="bloco-entradas">
                <li v-for="(item, i) in items.formItem" :key="i">
                    <input v-model="item.conteudo" 
                    :placeholder=items.formItem[i].texto 
                    :type=items.formItem[i].type />
                </li>
            </div>
            <div class="button-class">
                <button @click="buttonFunc">{{pag.tipo}}</button>
                <a @click="mudaPag">{{pag.mensagem}}</a>
            </div>
        </div>
    `,
    props : ['items','pag','metodo','goTo'],
    data(){
        return{
        }
    },
    methods : {
        buttonFunc : async function(){
            await this.metodo(this.items)
        },
        mudaPag : function (){
            this.goTo();
        }
    },
    mounted (){
        console.log(this.items);
    }
}


export default Formulario;