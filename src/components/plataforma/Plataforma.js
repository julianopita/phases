import BarraNavegacao from '../telaIncial/BarraNavegacao.js';
import Forum from './Forum.js';
import Modelo from './modelo/Modelo.js';
import axiosInstance from '../../connection/apiInfo.js';


const infoClicked = {
    descricao  : null,
    area : null
}


const Plataforma = {
    name : "plataforma",
    template : `
        <div id="plataforma">
    <barra-navegacao/>
    <button class="dropbtn" id="drop1" @click="showTreeView = !showTreeView">Ver árvore
        <i class="fa fa-caret-down"></i>
    </button>
        <div class="dropdown" id="dropDown-tree" v-show= "showTreeView">
            <div id="treeViewContainer"></div>            
        </div> 
    <button class="dropbtn" id="drop2" @click="showStoreyMap = !showStoreyMap">Ver árvore
        <i class="fa fa-caret-down"></i>
    </button>
    <button class="dropbtn" id="drop3" @click="showForum = !showForum">Ver árvore
        <i class="fa fa-caret-down"></i>
    </button>
        <div class="dropdown" id="dropDown-storey" v-show= "showStoreyMap">
            <div id="storeyMap"></div>            
        </div>                          
        
        <div class="modelo-forum" id="dropDown-forum">            
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
                    <div class="fixed">
                    <div class= "infoName">
                        <div class="left">Area projeto: 182.56m²</br>                                                            
                            Coef. Aproveitamento: 0,08</br>
                            Taxa de ocupação: 8,38%
                        </div>
                        <div class="right">Informações do terreno</br>
                                &nbsp Área total: 2058,00m²</br>
                                &nbsp Comprimento: 62,92m</br>
                                &nbsp Largura: 58,30m</br>
                                &nbsp Desnível: 1,54m</br>
                        </div>
                        
                    </div>
                    </div>
                    
                </div>
        </div>
        <a v-show= "showForum">
        <forum/>
        </a>
    </div>
    <link rel="stylesheet" href="src/style/plataforma/plataforma.css">
</div>
    `,
    data(){
        return{
            descricao : infoClicked.descricao,
            area : infoClicked.area,
            apiInfo : '',
            showTreeView : true,
            showStoreyMap : true,
            showForum : true
        }
    },
    methods : {
        getApiInfo : async function (){
            await axiosInstance.get('/infos')
            .then((data)=>{
                console.log(data);
            })
        }                
    },

    mounted : async function (){
        await this.getApiInfo()
        console.log("oooooooooooo")
    },
    components :{
        BarraNavegacao, Forum, Modelo
    }
}

export{
    Plataforma,
    infoClicked,
};