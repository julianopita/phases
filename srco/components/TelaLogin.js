import BarraNavegacao from './telaIncial/BarraNavegacao.js'
import Formulario from './telaIncial/Formulario.js';


const TelaLogin = {
    name : "tela-login",
    template : `
        <div id="tela-login">
            <barra-navegacao/>
            <img src="assets/loginImagem.png">
            <formulario :items="formItens"/>
            <link rel="stylesheet" href="srco/style/login/tela_login.css">
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
            }
        }
    }
}


export default TelaLogin;