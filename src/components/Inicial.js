import Cadastro from './Cadastro.js';


const Inicial = {
    name : "inicial",
    template : `
        <div id="inicial">
            <cadastro/>

            <link rel="stylesheet" href="../../styles/inicial.css">
        </div>
    ` ,
    data(){
        return {

        }
    },
    components : {
        Cadastro
    }
}

export default Inicial;