import {BIMServerLoaderPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js'
import {Viewer} from '../../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js';
import BimServerClient from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js';

import Login from "./login.js";
import click from "./plugins/click.js";
import Annotations from "./plugins/annotations.js";
import Measurement from './plugins/measurement.js';
//import {measureControl} from '../components/plataforma/Plataforma.js';
import measurementEvent from './measurementClick.js';

//Viewer
const clientNomads = function(bimServerAddress,poid,canvasId, roid){
    const bimServerClient = new BimServerClient(bimServerAddress);
       
    const viewer = new Viewer({
        canvasId: canvasId
    });
    
    
    //sets the camera parameters
    const cameraControl = viewer.cameraControl;
    console.log(cameraControl);
    cameraControl.mouseWheelDollyRate = 2;

//Activate xeokit plugins

    // Measurement (viewer, measureControl);    
    Annotations(viewer);   

    //Load model in the viewer    
    const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
        bimServerClient: bimServerClient
    });
    Login.cria(viewer,bimServerClient,bimServerLoader,poid);
    click(viewer,bimServerClient,roid);
}

  //console.log(this.$showMeasurement);

export default clientNomads