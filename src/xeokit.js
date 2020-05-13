import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import {Viewer} from "../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
import Login from "./lib/login.js"
import click from "./lib/click.js"


const bimServerAddress = "http://www.nomads.usp.br:8080/bimserver/";
const poid = 196609;
const roid = 131075;



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
    Login.cria(viewer,bimServerClient,bimServerLoader,poid);
    
    //pega os cliques e armazena na sessão
    click(viewer,bimServerClient,roid);
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
    Login.cria(viewer,bimServerClient,bimServerLoader,poid);
    
    //pega os cliques e armazena na sessão
    click(viewer,bimServerClient,roid);
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
    Login.cria(viewer,bimServerClient,bimServerLoader,poid);
    
    //pega os cliques e armazena na sessão
    click(viewer,bimServerClient,roid);
}






ulChildren[0].addEventListener("click",projectOne,"true");
ulChildren[1].addEventListener("click",projectTwo,"true");
ulChildren[2].addEventListener("click",projectThree,"true");


// Create a Viewer

