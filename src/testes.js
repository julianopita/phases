import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import {Viewer} from "../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
import Login from "./lib/login.js"
import click from "./lib/click.js"


const bimServerAddress = "http://www.nomads.usp.br:8080/bimserver/";
const poidOne = 196609;
const roidOne = 131075;

const viewerUm = new Viewer({
    canvasId: "canvas_1"
});
//Carrega o projeto 1
const bimServerClientUm = new BimServerClient(bimServerAddress);
const bimServerLoaderUm = new BIMServerLoaderPlugin(viewerUm, {
    bimServerClient: bimServerClientUm
});
Login.cria(viewerUm,bimServerClientUm,bimServerLoaderUm,poidOne);
click(viewerUm,bimServerClientUm,roidOne);