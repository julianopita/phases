import BarraNavegacao from '../telaIncial/BarraNavegacao.js';
import Forum from './Forum.js';
import Modelo from './modelo/Modelo.js';


const Plataforma = {
    name : "plataforma",
    template : `
        <div id="plataforma">
            <barra-navegacao/>
            <div class="modelo-forum">
                <div>
                    <modelo/>
                    <div class="infoName">I N F O R M A Ç Õ E S</div>
                    <div class="infoBar">
                        <div class="click">asd</div>
                        <div class="fixed">das</div>
                    </div>
                </div>
                <forum/>
            </div>
            <link rel="stylesheet" href="src/style/plataforma/plataforma.css">
        </div>
    `,
    components :{
        BarraNavegacao, Forum, Modelo
    }
}


export default Plataforma;