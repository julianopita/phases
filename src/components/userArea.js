var UserArea  = {
    name :'userArea',
    template : `
        <div id="user-Area">
            <div class="formulario">
                <form>
                    <input type="text" placeholder="Username">
                    <input type="password" placeholder="Senha">
                    <button >Login</button>
                    <button @click="cadastro">Possuo Cadastro</button>
                
                </form>
            </div>
        </div>
    `,
    methods : {
        cadastro : function () {
            this.$router.push('/')
        }
    }
}


export default UserArea;