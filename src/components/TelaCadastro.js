import BarraNavegacao from './telaIncial/BarraNavegacao.js'
import Formulario from './telaIncial/Formulario.js';


const TelaCadastro = {
    name : "tela-cadastro",
    template : `
        <div id="tela-cadastro">
            <barra-navegacao/>
            <img src="assets/cadastroImagem.png">
            <formulario :items="formItens" :goTo=paraLogin :pag="cadastro" />
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
        }
    }

}


export default TelaCadastro;


            // await axios
            // .post("http://localhost:2000/cadastro/usuario",{
            //     nome : this.items.userName.conteudo,
            //     senha : this.items.password.conteudo
            // })
            // .then((rs)=>{
            //     if(rs.status == 200){
            //         this.$router.push('login')
            //     }
            // })