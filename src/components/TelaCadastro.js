import BarraNavegacao from './telaIncial/BarraNavegacao.js'
import Formulario from './telaIncial/Formulario.js';


const TelaCadastro = {
    name : "tela-cadastro",
    template : `
        <div id="tela-cadastro">
            <barra-navegacao/>
            <img src="assets/cadastroImagem.png">
            <formulario :items="formItens" :pag="cadastro" />
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
                    type : "N O M E C O M P L E TO",
                    conteudo : ""
                },
                userName : {
                    type : "U S E R N A M E",
                    conteudo : ""
                },
                password : {
                    type : "S E N H A",
                    conteudo : ""
                },
                email : {
                    type : "E M A I L",
                    conteudo : ""
                },
                cep : {
                    type : "C E P",
                    conteudo : ""
                },
                interesse : {
                    type : "I N T E R E S S E",
                    conteudo : ""
                },
            },
            cadastro : {
                tipo : "C A D A S T R O",
                mensagem : "Possuo Cadastro!"
            }
        }
    },

}


export default TelaCadastro;