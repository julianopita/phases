import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import {Viewer} from "../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
import Login from "./lib/login.js"
import click from "./lib/click.js"


const bimServerAddress = "http://plat-nomads.ddns.net:8080/bimserver/";
const poid = 131073;
const roid = 65539;


const Cvas = Login.cria(viewerUm,bimServerClientUm,bimServerLoaderUm,poidOne);


export default Cvas;

// const poidTwo = 1179649;
// const roidTwo = 2097155;

// const poidThree = 1376257;
// const roidThree = 13631491;


// var ul = document.getElementById("buttonBox");
// var ulChildren = ul.children
// console.log(ulChildren);


let clientNomads = function(bimServerAddress,poid){
    const bimServerClient = new BimServerClient(bimServerAddress);
    const viewer = new Viewer({
        canvasId: "c2"
    });
    const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
        bimServerClient: bimServerClient
    });
    Login.cria(viewer,bimServerClient,bimServerLoader,poid);
}







//Carrega o projeto 1

// click(viewerUm,bimServerClientUm,roidOne);

// Carrega o projeto 2
//Carrega o projeto 1
// const bimServerClientDois = new BimServerClient(bimServerAddress);
// const bimServerLoaderDois  = new BIMServerLoaderPlugin(viewerDois, {
//     bimServerClient: bimServerClientDois
// });
// Login.cria(viewerDois,bimServerClientDois,bimServerLoaderDois,poidTwo);
// click(viewerDois,bimServerClientDois,roidTwo);


//-------------

// // Create a BIMServerClient

// // faz o login no servidor
// Login.cria(viewer,bimServerClient,bimServerLoader,poidTwo);
// //pega os cliques e armazena na sessão
// click(viewer,bimServerClient,roidTwo);


//--------------

// // Create a BIMServerClient
// const bimServerClient = new BimServerClient(bimServerAddress);

// // Add a BIMServerLoaderPlugin
// const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
//     bimServerClient: bimServerClient
// });

// // faz o login no servidor
// Login.cria(viewer,bimServerClient,bimServerLoader,poidThree);

// //pega os cliques e armazena na sessão
// click(viewer,bimServerClient,roidThree);



// function projectOne(){

//     document.getElementById("canvas_1").style.zIndex = 10;
//     document.getElementById("canvas_2").style.zIndex = 5;
//     document.getElementById("canvas_3").style.zIndex = 1;
// }

// function projectTwo(){

//     document.getElementById("canvas_1").style.zIndex = 1;
//     document.getElementById("canvas_2").style.zIndex = 10;
//     document.getElementById("canvas_3").style.zIndex = 5;
// }

// function projectThree(){

//     document.getElementById("canvas_1").style.zIndex = 5;
//     document.getElementById("canvas_2").style.zIndex = 1;
//     document.getElementById("canvas_3").style.zIndex = 10;
// }





// // seleciona projeto
// ulChildren[0].addEventListener("click",projectOne,"true");
// ulChildren[1].addEventListener("click",projectTwo,"true");
// // ulChildren[2].addEventListener("click",projectThree,"true");


