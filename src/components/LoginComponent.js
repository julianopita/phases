import Outdoor from './outdoorInicial.js';
import UserArea from './userArea.js';



let login = Outdoor[0]

var LoginComponent = {
    name : "login-component",
    template : `
        <div id="loginComponent">
            <login/>
            <UserArea/>
fdsfsdf
            <link rel="stylesheet" href="../styles/login.css">
        </div>
    `,
    components : {
        login,UserArea
    }
}

export default LoginComponent;