const Formulario = {
    name : "formulario",
    template : `
        <div id="formulario">
            <div class="bloco-entradas">
                <li v-for="(item, i) in items" :key="i">
                    <input v-model="item.conteudo" :placeholder=items[i].type />
                </li>
            </div>
                <button @click="cadastra"><img src="assets/seta.png"/></button>
        </div>
    `,
    props : ['items'],
    data(){
        return{
        }
    },
    methods : {
        cadastra : function(){
            let userInfo = `${this.userName}&${this.senha}&${this.nomeCompleto}&${this.email}&${this.cep}&${this.interesse}`;
            console.log(this.items)
        }
    }
}


export default Formulario;