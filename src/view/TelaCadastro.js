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
                    texto : "N O M E C O M P L E TO",
                    conteudo : "",
                    type :  "text"
                },
                userName : {
                    texto : "U S E R N A M E",
                    conteudo : "",
                    type :  "text"
                },
                password : {
                    texto : "S E N H A",
                    conteudo : "",
                    type :  "password"
                },
                email : {
                    texto : "E M A I L",
                    conteudo : "",
                    type :  "text"
                },
                cep : {
                    texto : "C E P",
                    conteudo : "",
                    type :  "text"
                },
                interesse : {
                    texto : "I N T E R E S S E",
                    conteudo : "",
                    type :  "text"
                },
            },
            cadastro : {
                tipo : "C A D A S T R O",
                mensagem : "Possuo Cadastro!"
            }
        }
    },
    methods : {
        paraLogin: function(){
            this.$router.push('login');
        },
        cadastroApi : async function(item){
            await axiosInstance.post('cadastro/usuario',{
                nome : item.nomeCompleto.conteudo,
                senha : item.password.conteudo,
                userName : item.userName.conteudo,
                email : item.email.conteudo,
                cep : item.cep.conteudo,
                interesse : item.interesse.conteudo

            }).then((response)=>{
                alert('Usuario Cadastrado');
                this.$router.push('login');
            })
        }
    }

}


export default TelaCadastro;


