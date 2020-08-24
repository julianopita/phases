const Cadastro = {
    name : 'cadastro',
    template : `
    <div id="divCadastro">
        <div class="textoCadastro">
            <p> CADASTRO </p>
        </div>

        <div class="form">
            <div>
                <div class="caixa nome">
                    <p> NOME </p>
                    <input type="text" v-model="usuario.nome" >
                </div>
                <div class="caixa senha">
                    <p> SENHA </p>
                    <input type="text" v-model="usuario.senha" >
                </div>
                
                <div class="caixa cpf">
                    <p> USERNAME </p>
                    <input type="text" v-model="usuario.username" >
                </div>
            </div>
            
            <div class="formulario2">
                <div class="caixa nome">
                    <p> EMAIL </p>
                    <input type="text" v-model="usuario.email" >
                </div>
            
                <div class="caixa senha">
                    <p> CPF </p>
                    <input type="text" v-model="usuario.cpf" >
                </div>
            
                <div class="caixa cpf">
                    <p> CEP </p>
                    <input type="text" v-model="usuario.cep" >
                </div>
            </div>
        </div>
        <div class="button" >
            <button @click="showUser">ENVIAR</button>
            <a href="#">Ja possui cadastro?</a>
        </div>
        <link rel="stylesheet" href="../../styles/cadastro.css">

    </div>
    `,
    data(){
        return {
            usuario : {
                nome : "",
                senha : "",
                cep : "",
                cpf : "",
                username : "",
                email : "",

            }
        }
    },
    methods : {
        showUser : function (params) {
            console.log(this.usuario);
        }
    }

}


export default Cadastro;