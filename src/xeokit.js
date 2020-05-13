import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import {Viewer} from "../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
import Login from "./lib/login.js"
import click from "./lib/click.js"


const bimServerAddress = "http://www.nomads.usp.br:8080/bimserver/";
const poidOne = 196609;
const roidOne = 131075;

const poidTwo = 1179649;
const roidTwo = 2097155;

const poidThree = 1376257;
const roidThree = 13631491;


var ul = document.getElementById("buttonBox");
var ulChildren = ul.children
console.log(ulChildren);

function projectOne(){
    const viewer = new Viewer({
        canvasId: "canvas_main"
    });
    // Create a BIMServerClient
    const bimServerClient = new BimServerClient(bimServerAddress);
    
    // Add a BIMServerLoaderPlugin
    const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
        bimServerClient: bimServerClient
    });
    
    // faz o login no servidor
    Login.cria(viewer,bimServerClient,bimServerLoader,poidOne);
    
    //pega os cliques e armazena na sessão
    click(viewer,bimServerClient,roidOne);
}

function projectTwo(){
    const viewer = new Viewer({
        canvasId: "canvas_main"
    });
    // Create a BIMServerClient
    const bimServerClient = new BimServerClient(bimServerAddress);
    
    // Add a BIMServerLoaderPlugin
    const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
        bimServerClient: bimServerClient
    });
    
    // faz o login no servidor
    Login.cria(viewer,bimServerClient,bimServerLoader,poidTwo);
    
    //pega os cliques e armazena na sessão
    click(viewer,bimServerClient,roidTwo);
}

function projectThree(){
    const viewer = new Viewer({
        canvasId: "canvas_main"
    });
    // Create a BIMServerClient
    const bimServerClient = new BimServerClient(bimServerAddress);
    
    // Add a BIMServerLoaderPlugin
    const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
        bimServerClient: bimServerClient
    });
    
    // faz o login no servidor
    Login.cria(viewer,bimServerClient,bimServerLoader,poidThree);
    
    //pega os cliques e armazena na sessão
    click(viewer,bimServerClient,roidThree);
}






ulChildren[0].addEventListener("click",projectOne,"true");
ulChildren[1].addEventListener("click",projectTwo,"true");
ulChildren[2].addEventListener("click",projectThree,"true");


// Create a Viewer

