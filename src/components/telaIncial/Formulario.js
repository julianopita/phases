const Formulario = {
    name : "formulario",
    template : `
        <div id="formulario">
            <div class="bloco-entradas">
                <li v-for="(item, i) in items" :key="i">
                    <input v-model="item.conteudo" :placeholder=items[i].texto :type=items[i].type />
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
    }
}


export default Formulario;