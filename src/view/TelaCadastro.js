import BarraNavegacao from '../components/telaIncial/BarraNavegacao.js'
import Formulario from '../components/telaIncial/Formulario.js';
import axiosInstance from '../connection/index.js';

const TelaCadastro = {
    name : "tela-cadastro",
    template : `
        <div id="tela-cadastro">
            <barra-navegacao/>
            <img src="assets/cadastroImagem.png">
            <formulario :items="formItens" :goTo=paraLogin :pag="cadastro" :metodo="cadastroApi"/>
            <link rel="stylesheet" href="src/style/cadastro/tela_cadastro.css">
        </div>
    `,
    components : {
        BarraNavegacao, Formulario
    },
    data(){
        return{
            formItens : {
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
            },
            cadastro : {
                tipo : "enviar",
                mensagem : "já possuo cadastro"
            }
        }
    },
    methods : {
        paraLogin: function(){
            this.$router.push('login');
        },
        cadastroApi : async function(item){


            console.log(item);


            await axiosInstance.post('cadastro/usuario',{
                name : item.nomeCompleto.conteudo,
                senha : item.password.conteudo,
                userName : item.userName.conteudo,
                email : item.email.conteudo,
                cep : item.cep.conteudo,
                interesse : item.interesse.conteudo

            }).then((response)=>{
                alert('Usuario Cadastrado');
                this.$router.push('login');


            }).catch((err)=>{
                alert(err);
            })
        }
    }

}


export default TelaCadastro;


