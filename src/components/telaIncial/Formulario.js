const Formulario = {
    name : "formulario",
    template : `
        <div id="formulario">
            <div class="bloco-entradas">
                <li v-for="(item, i) in items" :key="i">
                    <input v-model="item.conteudo" :placeholder=items[i].type />
                </li>
            </div>
            <div class="button-class">
                <button @click="cadastra">{{pag.tipo}}</button>
                <a>{{pag.mensagem}}</a>
            </div>
        </div>
    `,
    props : ['items','pag'],
    data(){
        return{
        }
    },
    methods : {
        cadastra : function(){
            // let userInfo = `${this.userName}&${this.senha}&${this.nomeCompleto}&${this.email}&${this.cep}&${this.interesse}`;
        }
    }
}


export default Formulario;