import BarraNavegacao from '../telaIncial/BarraNavegacao.js';
import Forum from './Forum.js';
import Modelo from './modelo/Modelo.js';



const infoClicked = {
    descricao  : null,
    area : null
}






const Plataforma = {
    name : "plataforma",
    template : `
        <div id="plataforma">
            <barra-navegacao/>
            <div id="treeViewContainer"></div>  
            <div class="modelo-forum">            
                <div>
                    <modelo/>
                    <div class="infoName">
                        <span class="left">elemento selecionado</span><span class="right">informaçoes gerais</span>
                    </div>                    
                    <div class="infoBar">                    
                        <div class="click">
                            <div id="descricao"> </div>
                            <div id="area"> </div>
                        </div>
                        <div class="fixed"></div>
                        
                    </div>
                </div>
                <forum/>
            </div>
            <link rel="stylesheet" href="src/style/plataforma/plataforma.css">
        </div>
    `,
    data(){
        return{
            descricao : infoClicked.descricao,
            area : infoClicked.area
        }
    },

    watch : {
    },


    components :{
        BarraNavegacao, Forum, Modelo
    }
}


export{
    Plataforma,
    infoClicked,
};