import BarraNavegacao from '../components/telaIncial/BarraNavegacao.js'
import Formulario from '../components/telaIncial/Formulario.js';
import axiosInstance from '../connection/index.js';

const TelaLogin = {
    name : "tela-login",
    template : `
        <div id="tela-login">
            <barra-navegacao/>
            <img src="assets/loginImagem.png">
            <formulario :items="formItens" :goTo=paraCadastro :pag="login" :metodo=loginFunc />
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
                    texto : "U S E R N A M E",
                    conteudo : "",
                    type : "text"
                },
                password : {
                    texto : "S E N H A",
                    conteudo : "",
                    type : "password"
                }
            },
            login : {
                tipo : "L O G I N",
                mensagem : "Não tenho cadastro!"
            }
        }
    },
    methods : {
        loginFunc : async function(items){
            await axiosInstance
            .post("/login/usuario",{
                userName : items.userName.conteudo,
                senha : items.password.conteudo,
            })
            .then((res)=>{
                if(res.status == 204){
                    alert('Usuario nao encontrado');
                }else{
                    alert('Usuario Encontrado!!');
                    sessionStorage.setItem('id',res.data.id);
                    this.$router.push('plataforma')
                }

            }).catch((err)=>{
            })
        },
        paraCadastro: function(){
            this.$router.push('/');
        }
    }
}


export default TelaLogin;