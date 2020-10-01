import {BIMServerLoaderPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js'
import {Viewer} from '../../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js';
import BimServerClient from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js';




// import {BimServerLoaderPlugin} from 'node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js';
import Login from "./login.js"
import click from "./click.js"


const clientNomads = function(bimServerAddress,poid,canvasId, roid){
    const bimServerClient = new BimServerClient(bimServerAddress);
    const viewer = new Viewer({
        canvasId: canvasId
    });


    const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
        bimServerClient: bimServerClient
    });
    Login.cria(viewer,bimServerClient,bimServerLoader,poid);
    click(viewer,bimServerClient,roid);
}



export default clientNomads;