import BarraNavegacao from '../components/telaIncial/BarraNavegacao.js'
import Formulario from '../components/telaIncial/Formulario.js';
import axiosInstance from '../connection/index.js';

const TelaCadastro = {
    name : "tela-cadastro",
    template : `
        <div id="tela-cadastro">
            <barra-navegacao/>
            <img src="assets/cadastroImagem.png">
            <formulario :items="form" :goTo=paraLogin :pag="cadastro" :metodo="cadastroApi"/>
            <link rel="stylesheet" href="src/style/cadastro/tela_cadastro.css">
        </div>
    `,
    components : {
        BarraNavegacao, Formulario
    },
    data(){        
        return{ 
            form : {
                formErros : {
                    campoVazio : {
                        conteudo : "Campo vazio",
                        valido : true,    
                    },
                    usuario : {
                        conteudo:"UserName já existe",
                        valido : false
                    },
                    password : {
                        conteudo: "Senha menor que 4 caracteres",
                        valido : true
                    },
                    email : {
                        conteudo:"Email Inválido",
                        valido : true
                    },
                    cep: {
                        conteudo : "CEP não encontrado",
                        valido : false
                    }
                },
                                
                formItem :{
                    nomeCompleto : {
                        texto : "nome completo",
                        conteudo : null,
                        type :  "text",
                        tooltip: "Esta informação não será visível em suas postagens"
                    },
                    userName : {
                        texto : "nome de usuário",
                        conteudo : null,
                        type :  "text",
                        tooltip: "Este nome será visível em suas postagens"
                    },
                    password : {
                        texto : "senha com mínimo 6 caracteres",
                        conteudo : null,
                        type :  "password",
                        tooltip: "Procure criar uma senha com letras, números e símbolos"
                    },
                    email : {
                        texto : "e-mail",
                        conteudo : null,
                        type :  "text",
                        tooltip: "Esta informação não será visível em suas postagens"
                    },
                    cep : {
                        texto : "CEP sem traços",
                        conteudo : null,
                        type :  "text",
                        tooltip: "Esta informação não será visível em suas postagens"
                    },                                       
            }                        
        },
        cadastro : {
            tipo : "enviar",
            mensagem : "já possuo cadastro"
            },
        booleano : false
        }        
    },
    
            
     
    methods : {
        paraLogin: function(){
            this.$router.push('login');
        },
        cadastroApi : async function(item){
            console.log(this.booleano);
            await this.validaCadastro(item);
            console.log(this.booleano);
            if(this.booleano == true){
                await axiosInstance.post('cadastro/usuario',{
                    name : item.formItem.nomeCompleto.conteudo,
                    senha : item.formItem.password.conteudo,
                    userName : item.formItem.userName.conteudo,
                    email : item.formItem.email.conteudo,
                    cep : item.formItem.cep.conteudo,
                    interesse : interesse.value,
    
                }).then((response)=>{
                    alert('Usuario Cadastrado');
                    this.paraLogin();
    
                }).catch((err)=>{
                    alert(err);
                });
            }
        },
        validaCadastro: async function(item){
            const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

            let count = 0;

            //valida email
            if(email.test(item.formItem.email.conteudo) != true){
                alert('Digite um e-mail válido.');
                item.formErros.email.valido = false;
                count++;
            }
            //valida senha
            if(item.formItem.password.conteudo != null && item.formItem.password.conteudo.length < 5){
                alert('Digite uma senha com pelo menos 6 caracteres.');
                item.formErros.password.valido = false;
                count++;
            }
            //valida campos vazios
            for(let i in item.formItem){
                if(item.formItem[i].conteudo == null){
                    alert('Preencha todos os campos.');
                    item.formErros.campoVazio.valido = false;
                    count++;
                }
            }
            //valida cep
            await axios.get(`https://viacep.com.br/ws/${item.formItem.cep.conteudo}/json/`)
            .then((response)=>{
                console.log("Cep encontrado");
            })
            .catch((err)=>{
                item.formErros.cep.valido = false;
                alert('Digite um CEP válido.')
                count++;
                console.log(err);
            })
            console.log(count);
            
            //caso não haja erro a flag vai pra true
            if(count == 0){
                this.booleano = true;
            }

        }
    }

}


export default TelaCadastro;


