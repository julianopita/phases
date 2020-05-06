import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import {Viewer} from "../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
import Login from "./lib/login.js"
import click from "./lib/click.js"


const bimServerAddress = "http://www.nomads.usp.br:8080/bimserver/";


// Create a Viewer
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
Login(viewer,bimServerClient,bimServerLoader);

//pega os cliques e armazena na sessão
click(viewer,bimServerClient);

