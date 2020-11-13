const interesses = {};
const Formulario = {
    name : "formulario",
    template : `
        <div id="formulario">
            <div>
                <ul>
                </ul>
            </div>
            <div class="bloco-entradas">
                <div class= "block">            
                    <li v-for="(item, i) in items.formItem" :key="i">
                        <input v-model="item.conteudo" 
                        :placeholder=items.formItem[i].texto 
                        :type=items.formItem[i].type v-bind:title=items.formItem[i].tooltip />
                    </li> 
                    <li>                
<<<<<<< Updated upstream
                        <select v-model="interesse":selected=interesse.value title="Escolha uma atividade" id="interesse">
                            <option selected disabled value="">Relação com a edificação</option>  
=======
                        <select v-model="interesse":selected=interesse.value name="interesse" id="interesse" title="Escolha uma atividade">
                            <option selected disabled value="undefined">Relação com a edificação</option>  
>>>>>>> Stashed changes
                            <option value = "estudante">Estudante</option>
                            <option value = "professor">Professor</option>
                            <option value = "educador">Educador</option>
                            <option value = "tecnico">Técnico</option>
                            <option value = "gestor">Gestor público</option>
                        </select>
                    </li>                
                </div>            
                <div class="button-class">
                    <button  @click="buttonFunc">{{pag.tipo}}</button>
                    <a @click="mudaPag">{{pag.mensagem}}</a>
                </div>  
            </div>
        </div>
    `,
    
    props : ['items','pag','metodo','goTo'],
    data(){
        return{
            interesse : {                
                value : '',                
            },                          
        }
    },
    methods : {
        buttonFunc : async function(){ 
            //let interesses = interesse.value;
            console.log(interesse);           
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
console.log(interesses);


export default Formulario;