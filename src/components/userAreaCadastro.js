var UserAreaCadastro  = {
    name :'userAreaCadastro',
    template : `
        <div id="user-Area">
            <div class="formulario">
                    <input type="text" placeholder="Username">
                    <input type="password" placeholder="Senha">
                    <input type="text" placeholder="Nome Completo">
                    <input type="text" placeholder="CPF">
                    <input type="text" placeholder="CEP">
                    <input type="text" placeholder="Email">
                    <button @click="application">Cadastrar</button>
                    <button @click= "login"> Não possui cadastro? </button>
                
            </div>
        </div>
    `,
    methods : {

        application : function () {
            this.$router.push('application')
        },
        login : function(){
            console.log('hello world');
            this.$router.push('login')
        }
    }
}


export default UserAreaCadastro;