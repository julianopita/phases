import {BIMServerLoaderPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js'
import {Viewer} from '../../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js';
import BimServerClient from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js';
import {DistanceMeasurementsPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/DistanceMeasurementsPlugin/DistanceMeasurementsPlugin.js';
//import {DistanceMeasurement} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/DistanceMeasurementsPlugin/DistanceMeasurement.js';
import {TreeViewPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/TreeViewPlugin/TreeViewPlugin.js';


import Login from "./login.js"
import click from "./click.js"


const clientNomads = function(bimServerAddress,poid,canvasId, roid){
    const bimServerClient = new BimServerClient(bimServerAddress);
    const viewer = new Viewer({
        canvasId: canvasId
    }); 
          
    const distanceMeasurements = new DistanceMeasurementsPlugin(viewer,{labelMinAxisLength:10000});
    distanceMeasurements.control.activate();  
    
    
    const treeView = new TreeViewPlugin(viewer, {
        containerElement: document.getElementById("treeViewContainer"),
        autoExpandDepth: 1, // Initially expand tree one level deep
        hierarchy: "storeys",
        sortNodes: true,

        // With hierarchy:"storeys" and sortNodes:true we can optionally specify which element types
        // we derive the center of each storey from, which we use to spatially sort the storeys on the
        // vertical axis. By default, this is all types, but sometimes some types of element will
        // span multiple storeys, so we have the ability to refine which types contribute to those center points.
        // sortableStoreysTypes: ["IfcWall", "IfcWallStandardCase", "IfcSlab", "IfcFurniture", "IfcFurnishingElement", "IfcDoor", "IfcRoof"]
    });
    


    const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
        bimServerClient: bimServerClient
    });
    Login.cria(viewer,bimServerClient,bimServerLoader,poid);
    click(viewer,bimServerClient,roid);
}



export default clientNomads;