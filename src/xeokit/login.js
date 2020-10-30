//Import on load xeokit plugins
import StoreyViews from './plugins/storey.js';
import {AmbientLight} from "../../../node_modules/@xeokit/xeokit-sdk/src/viewer/scene/lights/AmbientLight.js";
import {DirLight} from "../../../node_modules/@xeokit/xeokit-sdk/src/viewer/scene/lights/DirLight.js";
import {Shadow} from "../../../node_modules/@xeokit/xeokit-sdk/src/viewer/scene/lights/Shadow.js";
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
                    // Configure initial objects appearences.
    
                    const roid = project.lastRevisionId;
                    const schema = project.schema;                    
                    const BIMobjectDefaults = {
                        IfcSpace: {
                            visible: false,
                            pickable: false,
                            opacity: 0,
                            edges: false
                        },
                        IfcSite: {
                            edges: false
                        },
                        IfcWindow: {
                            colorize: [0.337255, 0.303922, 0.870588], // Blue
                            opacity: 0.5
                        }, 
                        DEFAULT: {
                            colorize: [0.5, 0.5, 0.5]
                        }
                   };

                   //Set SAO options
                   const sao = viewer.scene.sao;

                    if (!sao.supported) {
                        sao.warn("SAO is not supported on this system - ignoring SAO configs")
                    }

                    sao.enabled = true; // Enable SAO - only works if supported (see above)
                    sao.intensity = 0.25;
                    sao.bias = 0.5;
                    sao.scale = 500.0;
                    sao.minResolution = 0.0;
                    sao.kernelRadius = 100;
                    sao.blendCutoff = 0.2;

                    //Create ambient lights
                    new AmbientLight(viewer.scene, {
                        color: [0.0, 0.0, 0.0],
                        intensity: 1.0                                               
                    });

                    
                    const dirLight = new DirLight(viewer.scene, {
                    id: "fillLight",
                    dir: [-0.8, -0.4, -0.4],
                    color: [0.1, 0.1, 0.3],
                    intensity: 1.0,
                    space: "view",
                    // shadow: new Shadow(dirLight, {
                    //     resolution: [1000, 1000],
                    //     intensity: 0.7,
                    //     sampling: "stratified" // "stratified" | "poisson" | "basic"
                    // })                    
                    });
                    dirLight.shadow = {
                            resolution: [1000, 1000],
                            intensity: 0.7,
                            sampling: "stratified" // "stratified" | "poisson" | "basic"
                        };

                    //Set shadows options
                    //const shadows = viewer.scene.shadow;
                    

                   // shadows.intensity = true; // Enable SAO - only works if supported (see above)
                    // sao.intensity = 0.25;
                    // sao.bias = 0.5;
                    // sao.scale = 500.0;
                    // sao.minResolution = 0.0;
                    // sao.kernelRadius = 100;
                    // sao.blendCutoff = 0.2;
                    
    
                    // Load our model from BIMServer
                    
                    const model = bimServerLoader.load({ // Returns a Node representing the model
                        id: "canvas_main",                   // Assigned to Node#id, and Node#isModel will also be set true
                        poid: poid,
                        roid: roid,
                        backfaces: false,                       
                        schema: schema,                 // Load the schema that's available for our project
                        scale: [1, 1, 1],               // Scale the model
                        rotation: [-90, 0, 0],          // Rotate the model
                        edges: true,                    // Emphasise edges
                        objectDefaults: BIMobjectDefaults,//Adusts model appeareance
                        //saoEnabled: true
                    });
                    
    
                    // Fit camera to model when loaded, activate on load plugins
                    model.on("loaded", function() {
                        viewer.cameraFlight.jumpTo(model);
                        StoreyViews(viewer);
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