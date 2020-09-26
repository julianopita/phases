import BarraNavegacao from './telaIncial/BarraNavegacao.js'
import Formulario from './telaIncial/Formulario.js';


const TelaLogin = {
    name : "tela-login",
    template : `
        <div id="tela-login">
            <barra-navegacao/>
            <img src="assets/loginImagem.png">
            <formulario :items="formItens" :pag="login"/>
            <link rel="stylesheet" href="src/style/login/tela_login.css">
        </div>
    `,
    components : {
        BarraNavegacao, Formulario
    },
    data(){
        return{
            formItens : {
                userName : {
                    type : "U S E R N A M E",
                    conteudo : ""
                },
                password : {
                    type : "S E N H A",
                    conteudo : ""
                }
            },
            login : {
                tipo : "L O G I N",
                mensagem : "Não tenho cadastro!"
            }
        }
    }
}


export default TelaLogin;