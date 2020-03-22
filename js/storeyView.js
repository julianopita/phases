


import {Viewer} from "../xeokit/src/viewer/Viewer.js";
import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";


const bimServerAddress = "http://www.nomads.usp.br:8080/bimserver/";
const username = "platnomads@gmail.com";
const password = "@bimserver";
const poid = 196609;
const roid = 131075;


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

// Initialize the BIMServerClient
bimServerClient.init(() => {

    // Login to the BIMServerClient
    bimServerClient.login(username, password, () => {

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
                id: "myModel",                   // Assigned to Node#id, and Node#isModel will also be set true
                poid: poid,
                roid: roid,
                schema: schema,                 // Load the schema that's available for our project
                scale: [1, 1, 1],   // Scale the model
                rotation: [-90, 0, 0],          // Rotate the model
                edges: true                     // Emphasise edges
            });

            console.log(schema);

            // Fit camera to model when loaded
            model.on("loaded", function() {
                viewer.cameraFlight.jumpTo(model);
            });

            model.on("error", function (errMsg) {
                console.error("Loading failed: " + errMsg);
            });
        });

    }, (error) => {
         console.log("Error logging in: " + error.message);
    });
});

 

                //Obtain area, description and name of building
                      obterOidIfcBuilding();
                      
                     
                       function obterOidIfcBuilding(){

                        var IfcBuildingOid = sessionStorage.getItem('IfcBuildingOid');
                        var IfcOidArea = sessionStorage.getItem('IfcOidArea');
                        var IfcBuildingName = sessionStorage.getItem('IfcBuildingName');
                        var IfcBuildingDescription = sessionStorage.getItem('IfcBuildingDescription');

                       console.log (IfcBuildingOid);
                       console.log (IfcOidArea);
                       console.log (IfcBuildingName);
                       console.log (IfcBuildingDescription);
                                                     
                         bimServerClient.init(() => {
                              //get Oid from Guid
                                 bimServerClient.call("LowLevelInterface", "getDataObjectByGuid",  {roid: roid , packageName: schema , className: "IfcBuildingOid" , flat: "true" }, function(IfcBuildingData){
                                   //obterm o Oid do site e o salva em uma sessao local
                                      // sessionStorage.setItem("IfcBuildingOid", IfcBuildingData.oid);
                                       console.log(IfcBuildingData.oid);
                                     });
                               });
                       };
                                       
                                       
                                            