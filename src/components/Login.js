const Login = {
    name : 'login',
    template : `
    <div id="divLogin">
        <div class="textoLogin">
            <p> Login </p>
        </div>

        <div class="form">
            <div class="caixa username">
                <p> USERNAME </p>
                <input type="text" v-model="usuario.username" >
            </div>
                
            <div class="caixa senha">
                <p> SENHA </p>
                <input type="text" v-model="usuario.senha" >
            </div>

        </div>
        
        <div class="button">
            <button @click="showUser">ENVIAR</button>
            <a href="#">Ja possui login?</a>
        </div>


        <link rel="stylesheet" href="../../styles/login.css">
    </div>
    `,
    data(){
        return {
            usuario : {
                senha : "",
                username : "",
            }
        }
    },
    methods : {
        showUser : function () {
            console.log(this.usuario);
        }
    }

}


export default Login;