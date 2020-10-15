import BarraNavegacao from '../components/telaIncial/BarraNavegacao.js'
import Formulario from '../components/telaIncial/Formulario.js';
import axiosInstance from '../connection/index.js';

const TelaLogin = {
    name : "tela-login",
    template : `
        <div id="tela-login">
            <barra-navegacao/>
            <img src="assets/loginImagem.png">
            <formulario :items="form" :goTo=paraCadastro :pag="login" :metodo=loginFunc />
            <link rel="stylesheet" href="src/style/login/tela_login.css">
        </div>
    `,
    components : {
        BarraNavegacao, Formulario
    },
    data(){
        return{
            form:{
                formErros : {

                },
                formItem : {
                    userName : {
                        texto : "nome de usuário",
                        conteudo : "",
                        type : "text"
                    },
                    password : {
                        texto : "senha",
                        conteudo : "",
                        type : "password"
                    }
                }
            },
            login : {
                tipo : "entrar",
                mensagem : "não tenho cadastro"
            }
        }
    },
    methods : {
        loginFunc : async function(items){
            console.log(items);

            
            await axiosInstance
            .post("/login/usuario",{
                userName : items.formItem.userName.conteudo,
                senha : items.formItem.password.conteudo,
            })
            .then((res)=>{
                if(res.status == 204){
                    alert('Usuario nao encontrado');
                }else{
                    alert('Usuario Encontrado!!');
                    sessionStorage.setItem('id',res.data.id);
                    // sessionStorage.setItem('userName',i);
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