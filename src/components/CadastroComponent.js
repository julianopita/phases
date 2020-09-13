import Outdoor from './outdoorInicial.js';
import UserAreaCadastro from './userAreaCadastro.js';
               
let cadastro = Outdoor[1];


var CadastroComponent = {
    name : "cadastro-component",
    template : `
        <div id="cadastroComponent">
            <cadastro/>
            <UserAreaCadastro/>

            <link rel="stylesheet" href="../styles/cadastro.css">
        </div>
    `,
    components : {
        cadastro,UserAreaCadastro
    }
}

export default CadastroComponent;