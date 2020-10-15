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
                        valido : true
                    }
                },
                                
                formItem :{
                    nomeCompleto : {
                        texto : "nome completo",
                        conteudo : null,
                        type :  "text"
                    },
                    userName : {
                        texto : "nome de usuário",
                        conteudo : null,
                        type :  "text"
                    },
                    password : {
                        texto : "senha",
                        conteudo : null,
                        type :  "password"
                    },
                    email : {
                        texto : "e-mail",
                        conteudo : null,
                        type :  "text"
                    },
                    cep : {
                        texto : "CEP",
                        conteudo : null,
                        type :  "text"
                    },
                    interesse : {
                        texto : "interesse",
                        conteudo : null,
                        type :  "text"
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
                    interesse : item.formItem.interesse.conteudo
    
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
                item.formErros.email.valido = false;
                count++;
            }
            //valida senha
            if(item.formItem.password.conteudo != null && item.formItem.password.conteudo.length < 5){
                item.formErros.password.valido = false;
                count++;
            }
            //valida campos vazios
            for(let i in item.formItem){
                if(item.formItem[i].conteudo == null){
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


