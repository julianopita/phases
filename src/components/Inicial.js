import Cadastro from './Cadastro.js';
import Login from './Login.js';

const Inicial = {
    name : "inicial",
    template : `
        <div id="inicial">
            <login/>

            <link rel="stylesheet" href="../../styles/inicial.css">
        </div>
    ` ,
    data(){
        return {

        }
    },
    components : {
        Cadastro,
        Login
    }
}

export default Inicial;