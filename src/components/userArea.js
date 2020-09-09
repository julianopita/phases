var UserArea  = {
    name :'userArea',
    template : `
        <div id="user-Area">
            <div class="formulario">
                <form>
                    <input type="text" placeholder="Username">
                    <input type="password" placeholder="Senha">
                    <button v-on:click="alert('tchau')">Login</button>
                
                </form>
            </div>
        </div>
    `
}


export default UserArea;