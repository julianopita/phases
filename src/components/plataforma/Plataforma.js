import BarraNavegacao from '../telaIncial/BarraNavegacao.js';
import Forum from './Forum.js';
import Modelo from './modelo/Modelo.js';
import axiosInstance from '../../connection/apiInfo.js';

const infoClicked = {
    descricao  : null,
    area : null
};
var measureControl = {
    state: "true",
};

const Plataforma = {
    name : "plataforma",
    template : `
        <div id="plataforma">
    <barra-navegacao/>


    <div class="info-wrapper">
        <div class="wrapper-tree">
            <div>
                <button id="drop1" title="Exibir andares" @click="showTreeView = !showTreeView" v-bind:class = "[showTreeView ? 'dropbtn clicked' : 'dropbtn']">Pavimentos
                    <i v-bind:class = "[showTreeView ? 'fa fa-chevron-down fa-rotate-180' : 'fa fa-chevron-down']"></i>
                </button>
            </div>
            <div class="dropdown" title="Exibir plantas" id="treeViewContainer" v-bind:class = "[showTreeView ? 'dropdown-open-tree' : 'dropdown-closed']">
            </div>
        </div> 
        <div class="wrapper-storey">
            <div>
                <button class="dropbtn" id="drop2" @click="showStoreyMap = !showStoreyMap" v-bind:class = "[showStoreyMap ? 'dropbtn clicked' : 'dropbtn']">Plantas
                    <i v-bind:class = "[showStoreyMap ? 'fa fa-chevron-down fa-rotate-180' : 'fa fa-chevron-down']"></i>
                </button>
            </div>
                <div class="dropdown" id="storeyMap" v-bind:class = "[showStoreyMap ? 'dropdown-open-storey' : 'dropdown-closed']"> 
            </div>
        </div>
        <div class="wrapper-info">
            <div>
                <button class="dropbtn" id="drop4" @click="showgInfo = !showgInfo" v-bind:class = "[showgInfo ? 'dropbtn clicked' : 'dropbtn']">Informações gerais
                    <i v-bind:class = "[showgInfo ? 'fa fa-chevron-down fa-rotate-180' : 'fa fa-chevron-down']"></i>
                </button>
            </div>
                <div class="gInfo" id="generalInfo" v-bind:class = "[showgInfo ? 'dropdown-open-info' : 'dropdown-closed']">
                        
                            <div class='left'>Índices</br>
                                <a class = 'text'>Area projeto: 182.56m²</br>                                                            
                                Coef. Aproveitamento: 0,08</br>
                                Taxa de ocupação: 8,38%</a>
                            </div>
                            <div class='right'>Informações do terreno</br>
                                    <a class='text'>Área total: 2058,00m²</br>
                                    Comprimento: 62,92m</br>
                                    Largura: 58,30m</br>
                                    Desnível: 1,54m</br></a>
                            </div>          
            </div>
        </div>
    </div> 
        <div class="modelo-forum" id="dropDown-forum">            
            <div>
                <modelo/>                                    
            </div>
        </div>
    <div class= "forum-wrapper"  v-bind:class = "[showForum ? 'dropleft-open-forum' : 'dropleft-closed']">
        <div class="toolbar">
            <button class="dropbtn-vertical" title="Recolher ou exibir discussões" id="drop3" @click="showForum = !showForum" v-bind:class = "[showForum ?  'dropbtn-vertical' : 'dropbtn-vertical clicked-vertical']">
                <i class="far fa-comment-alt"></i>
            </button>
            <button class="dropbtn-vertical" title="Ferramenta fita métrica" id="measurements" @click="showMeasurement = !showMeasurement" v-bind:class = "[showMeasurement ? 'dropbtn-vertical clicked-vertical' : 'dropbtn-vertical']">
                <i class="fa fa-ruler"></i>
            </button>
            <button class="dropbtn-vertical" title="Exibir ou esconder anotações" id="annotations" @click="showAnnotations = !showAnnotations" v-bind:class = "[showAnnotations ? 'dropbtn-vertical clicked-vertical' : 'dropbtn-vertical']">
                <i class="fa fa-sticky-note"></i>
            </button>
            <button class="dropbtn-vertical clicked-vertical" title="Mudar visualização" id="cameraview" @click="showView = !showView">
                <i class="fa fa-street-view"></i>
            </button>
            <button class="dropbtn-vertical" title="Exibir informações" id="info" @click="showInfo = !showInfo" v-bind:class = "[showInfo ? 'dropbtn-vertical clicked-vertical' : 'dropbtn-vertical']">
                <i class="fas fa-info-circle"></i>
            </button>
        </div>
        <div id="Forum"  v-bind:class = "[showForum ? 'dropleft-open-forum' : 'dropleft-closed-forum']">       
            <forum/>        
        </div>
    </div>
    <link rel="stylesheet" href="src/style/plataforma/plataforma.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
</div>
</div>
    `,
    
    data(){
        return{
            descricao : infoClicked.descricao,
            area : infoClicked.area,
            apiInfo : '',
            showTreeView : false,           
            showStoreyMap : false,
            showForum : true,            
            showMeasurement : true,
            showAnnotations : true,
            showView: true,
            showInfo: true,
            showgInfo: false,
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
        BarraNavegacao, Forum, Modelo,
    }
}

export {
    Plataforma,
    infoClicked,                         
};



