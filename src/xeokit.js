import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import {Viewer} from "../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
import Login from "./lib/login.js"
import click from "./lib/click.js"


const bimServerAddress = "http://plat-nomads.ddns.net:8080/bimserver/";
const poid = 131073;
const roid = 65539;

let clientNomads = function(bimServerAddress,poid){
    const bimServerClient = new BimServerClient(bimServerAddress);
    const viewer = new Viewer({
        canvasId: "c1"
    });
    const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
        bimServerClient: bimServerClient
    });
    Login.cria(viewer,bimServerClient,bimServerLoader,poid);
}



export default clientNomads;

