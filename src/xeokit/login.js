import {BIMServerLoaderPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js'
import {Viewer} from '../../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js';
import BimServerClient from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js';


const username = "platnomads@gmail.com";
const password = "@bimserver";


var Login;



export default Login = {
    cria
};
    function cria(viewer,bimServerClient,bimServerLoader,poid){
        bimServerClient.init(() => {
        // Login to the BIMServerClient
        bimServerClient.login(username, password,() => {
            // Get information on our project
            bimServerClient.call("ServiceInterface", "getProjectByPoid", {
                poid: poid 
                }, (project) => {
    
                    // Load the latest revision of the project.
                    // Use whatever IFC schema the model uses.
    
                    const roid = project.lastRevisionId;
                    const schema = project.schema;
    
                    // Load our model from BIMServer
                    const model = bimServerLoader.load({ // Returns a Node representing the model
                        id: "canvas_main",                   // Assigned to Node#id, and Node#isModel will also be set true
                        poid: poid,
                        roid: roid,
                        schema: schema,                 // Load the schema that's available for our project
                        scale: [1, 1, 1],   // Scale the model
                        rotation: [-90, 0, 0],          // Rotate the model
                        edges: true                     // Emphasise edges
                    });
    
                    // Fit camera to model when loaded
                    model.on("loaded", function() {
                        viewer.cameraFlight.jumpTo(model);
                    });
    
                    model.on("error", function (errMsg) {
                        console.error("Loading failed: " + errMsg);
                    });
                });
        },(error) => {
            console.log("Error logging in: " + error.message);
        });
    });
}