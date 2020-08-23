const Cadastro = {
    name : 'cadastro',
    template : `
    <div id="cadastro">
        <div class="textoCadastro">
            <p> CADASTRO </p>
        </div>

        <div class="formulario">
            <div class="caixa nome">
                <p> NOME </p>
                <input type="text" v-model="nome" >
            </div>
            <div class="caixa senha">
                <p> SENHA </p>
                <input type="text" v-model="senha" >
            </div>
            
            <div class="caixa cpf">
                <p> CPF </p>
                <input type="text" v-model="cpf" >
            </div>
        </div>


        <link rel="stylesheet" href="../../styles/cadastro.css">
    </div>
    `,
    data(){
        return {
            nome : "",
            senha : "",
            confirmacao : "",
            cpf : ""
        }
    }
}


export default Cadastro;