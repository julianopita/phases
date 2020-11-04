import BarraNavegacao from '../telaIncial/BarraNavegacao.js';
import Forum from './Forum.js';
import Modelo from './modelo/Modelo.js';
import axiosInstance from '../../connection/apiInfo.js';
import {EventBus} from '../../main.js';




const infoClicked = {
    descricao  : null,
    area : null
}
const measureControl = {
    control : 0
}

sessionStorage.setItem("measureControl", "true");

const Plataforma = {
    name : "plataforma",
    template : `
        <div id="plataforma">
    <barra-navegacao/>


    <div class="info-wrapper">
        <div class="wrapper-tree">
            <div>
                <button id="drop1" @click="showTreeView = !showTreeView" v-bind:class = "[showTreeView ? 'dropbtn clicked' : 'dropbtn']">Pavimentos
                    <i v-bind:class = "[showTreeView ? 'fa fa-chevron-down fa-rotate-180' : 'fa fa-chevron-down']"></i>
                </button>
            </div>
            <div class="dropdown" id="treeViewContainer" v-bind:class = "[showTreeView ? 'dropdown-open-tree' : 'dropdown-closed']">
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
    <div class= "forum-wrapper"  v-bind:class = "[showForum ? 'dropleft-open-forum' : 'dropleft-closed']">
        <div class="toolbar">
            <button class="dropbtn-vertical" id="drop3" @click="showForum = !showForum" v-bind:class = "[showForum ? 'dropbtn-vertical clicked-vertical' : 'dropbtn-vertical']">
                <i class="far fa-comment-alt"></i>
            </button>
            <button class="dropbtn-vertical" id="measurements" @click="showMeasurement = !showMeasurement" v-on:click="measurement" v-bind:class = "[showForum ? 'dropbtn-vertical clicked-vertical' : 'dropbtn-vertical']">
                <i class="fa fa-ruler"></i>
            </button>
            <button class="dropbtn-vertical" id="annotations" @click="showForum = !showForum" v-bind:class = "[showForum ? 'dropbtn-vertical clicked-vertical' : 'dropbtn-vertical']">
                <i class="fa fa-sticky-note"></i>
            </button>
            <button class="dropbtn-vertical" id="view" @click="showForum = !showForum" v-bind:class = "[showForum ? 'dropbtn-vertical clicked-vertical' : 'dropbtn-vertical']">
                <i class="fa fa-street-view"></i>
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
            showMeasurement : false
            }
        
    },
    methods : {
        getApiInfo : async function (){
            await axiosInstance.get('/infos')
            .then((data)=>{
                console.log(data);
            })            
        },

        measurement: async function() {  
        
            if (sessionStorage.getItem("measureControl") == "true") {
                console.log("change to false");               
                sessionStorage.setItem("measureControl", "false");
            } else { 
                console.log("change to true");                
                sessionStorage.setItem("measureControl", "true"); 
            }            
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
    measureControl,                  
};

window.addEventListener("measureControl", () => {
    var control = localStorage.getItem("measureControl");
    console.log("fire");
});

