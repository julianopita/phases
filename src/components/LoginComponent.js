import Outdoor from './outdoorInicial.js';
import UserArea from './userArea.js';
               



var LoginComponent = {
    name : "login-component",
    template : `
        <div id="loginComponent">
            <Outdoor/>
            <UserArea/>

            <link rel="stylesheet" href="login.css">
        </div>
    `,
    components : {
        Outdoor,UserArea
    }
}

export default LoginComponent;