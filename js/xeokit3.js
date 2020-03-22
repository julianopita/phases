


import {Viewer} from "../xeokit/src/viewer/Viewer.js";
import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
import {ReadableGeometry} from "../xeokit/src/viewer/scene/geometry/ReadableGeometry.js";
//------------------------------------------------------------------------------------------------------------------
    // Import the modules we need for this example
    //------------------------------------------------------------------------------------------------------------------

    
    import {StoreyViewsPlugin} from "../xeokit/src/plugins/StoreyViewsPlugin/StoreyViewsPlugin.js";
    import {math} from "../xeokit/src/viewer/scene/math/math.js";
    
    import {CameraMemento} from "../xeokit/src/viewer/scene/mementos/CameraMemento.js";
    import {NavCubePlugin} from "../xeokit/src/plugins/NavCubePlugin/NavCubePlugin.js";


const bimServerAddress = "http://www.nomads.usp.br:8080/bimserver/";
const username = "platnomads@gmail.com";
const password = "@bimserver";
const poid = 196609;
const roid = 131075;



// Create a Viewer
const viewer = new Viewer({
    canvasId: "canvas_aux2"
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
            console.log(roid);
            console.log(schema);

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
          

             //Obtain area, description and name of building
                      obterOidIfcBuilding();
                      

                    // Initialize the BIMServerClient
                       function obterOidIfcBuilding(){


                        var IfcBuildingOid = sessionStorage.getItem('IfcBuildingOid');
                        var IfcBuildingRelAggregates = sessionStorage.getItem('IfcBuildingRelAggregates');
                        var IfcBuildingName = sessionStorage.getItem('IfcBuildingName');
                        var IfcBuildingDescription = sessionStorage.getItem('IfcBuildingDescription');

                       console.log (IfcBuildingOid);
                       console.log (IfcBuildingRelAggregates);
                       console.log (IfcBuildingName);
                       console.log (IfcBuildingDescription);
                                                     
                         	//get IfcBuildings Oid from project revision (if there is more than one building this expression must change to a array - TO DO)
                              bimServerClient.call("LowLevelInterface", "getDataObjectsByType",  {roid: roid , packageName: schema , className: "IfcBuilding" , flat: "true"}, function(IfcBuildingData){
                                   //store in IfcBuildingOid variable
                                       sessionStorage.setItem("IfcBuildingOid", IfcBuildingData[0].oid);
                                       console.log(IfcBuildingData[0].oid);                                                                                           
                                                                                                                        
                                             //get Rel Aggregate from Ifc building
                                               bimServerClient.call("LowLevelInterface", "getDataObjectByOid",  {roid: roid , oid: IfcBuildingData[0].oid}, function(IfcBuildingData2){
                                                 //set parameters to search for. This parameters can be increased infinitely
                                                            var n = "IsDecomposedBy";
                                                            var m = "IfcRelAggregates";
                                                           // iterate over each element in the array
                                                            for (var i = 0; i < IfcBuildingData2.values.length; i++){
                                                              // look for the entry with a matching `IsDecomposedBy` value in fieldName
                                                              if (IfcBuildingData2.values[i].fieldName == n){
                                                               // look for the entry with a matching `IfcRelAggregates` value in typeName
                                                                for (var j = 0; j < IfcBuildingData2.values[i].values.length; j++){
                                                                  if (IfcBuildingData2.values[i].values[j].typeName == m){
                                                                  	//stores in IfcBuildingRelAggregates variable
                                                                    sessionStorage.setItem("IfcBuildingRelAggregates", IfcBuildingData2.values[i].values[j].oid);
                                                                    console.log (IfcBuildingData2.values[i].values[j].oid);
                                                                    //close second if loop
                                                                  };
                                                                 // close second for loop
                                                                };                                                         
                                                             //close first if loop 
                                                		     };
                                                		   // close first for loop  
                                                		 };
                                                		//close second Bimserver call
                                                	 });
                                               		//close first Bimserver call
                                              	 });
                              		//recover IfcBuildingRelAggregates from session storage
                              		 var IfcBuildingRelAggregates = sessionStorage.getItem('IfcBuildingRelAggregates');
                              		 console.log (IfcBuildingRelAggregates);
                              
                                //get storeys from IfcRelAggregates
                                               bimServerClient.call("LowLevelInterface", "getDataObjectByOid",  {roid: roid , oid: IfcBuildingRelAggregates}, function(IfcBuildingData){
                                                 //obterm o Oid do site e o salva em uma sessao local
                                                     //sessionStorage.setItem("IfcOidName", IfcBuildingData3);
                                                     console.log(IfcBuildingData.values);
                                                            var n = "RelatedObjects";
                                                            var m = "IfcBuildingStorey";
                                                            var IfcBuildingStoreysGuid = [];
                                                            // iterate over each element in the array
                                                            for (var i = 0; i < IfcBuildingData.values.length; i++){
                                                              // look for the entry with a matching `RelatedObjects` value in fieldName
                                                              if (IfcBuildingData.values[i].fieldName == n){
                                                                // look for the entry with a matching `IfcBuildingStorey` value in typeName
                                                                for (var j = 0; j < IfcBuildingData.values[i].values.length; j++){
                                                                  if (IfcBuildingData.values[i].values[j].typeName == m){
                                                                  	                                                             
                                                                  	 //get every guid from oid
                                                                  	 	bimServerClient.call("LowLevelInterface", "getDataObjectByOid",  {roid: roid , oid: IfcBuildingData.values[i].values[j].oid}, function(IfcBuildingData2){
										                                   //store in IfcBuildingOid variable
										                                       IfcBuildingStoreysGuid.push(IfcBuildingData2.guid);
										                                       
										                                       //turn array into string to add to storage
			                                                                    sessionStorage.setItem("IfcBuildingStoreys", JSON.stringify(IfcBuildingStoreysGuid));
			                                                                    
										                                });

                                                                  	                                                                    
                                                                    
                                                                    
                                                                  //close second if loop
                                                                  };
                                                                 // close second for loop
                                                                };                                                         
                                                             //close first if loop 
                                                		     };
                                                		   // close first for loop  
                                                		 };
                                                		 //close Bimserver call
                                                	 });

                                         //recover Storey Ids from session storage in a array      		
                                   		var IfcBuildingStoreysAll = JSON.parse(sessionStorage.getItem("IfcBuildingStoreys"));
                                   		console.log(JSON.parse(sessionStorage.getItem("IfcBuildingStoreys")));
                                        console.log (IfcBuildingStoreysAll);
                                              	
 //------------------------------------------------------------------------------------------------------------------
    // Add a StoreyViewsPlugin
    //------------------------------------------------------------------------------------------------------------------

    const storeyViewsPlugin = new StoreyViewsPlugin(viewer);

    //------------------------------------------------------------------------------------------------------------------
    // When model loaded, build a clickable set of storey plan images from the StoreyViewsPlugin, bind mouse
    // events to fly the Camera to a first-person view at whatever location we click within each plan view image
    //------------------------------------------------------------------------------------------------------------------

    model.on("loaded", function () {

        // Make all doors transparent
        viewer.scene.setObjectsOpacity(viewer.metaScene.getObjectIDsByType("IfcDoor"), 0.3);

        buildStoreyMapsMenu();
    

    function buildStoreyMapsMenu() {

        const cameraMemento = new CameraMemento(); // Saves 3D perspective camera to restore
        cameraMemento.saveCamera(viewer.scene);
// Get matadata on our model
const metaModel = viewer.metaScene.metaModels["myModel"];

        var test= viewer.metaScene.getObjectIDsByType("IfcBuildingStorey");
        console.log(test);

        const storeyDiv = document.getElementById("storeys");
        //const storeyIds = IfcBuildingStoreysAll
        const storeyIds = test;
        console.log(storeyIds);

        const canStandOnTypes = { // IFC types we can stand on in first-person mode
            IfcSlab: true,
            IfcStair: true,
            IfcFloor: true,
            IfcFooting: true
        };

        for (var i = 0, len = storeyIds.length; i < len; i++) {

            const storeyId = storeyIds[i];

            const storeyMap = storeyViewsPlugin.createStoreyMap(storeyId, {
                format: "png",
                width: 300,
                useObjectStates: true
            });

            const img = document.createElement("img");
            img.src = storeyMap.imageData;
            img.style.border = "1px solid #000000";
            img.style.background = "lightblue";
            img.style.width = storeyMap.width + "px";
            img.style.height = storeyMap.height + "px";

            storeyDiv.appendChild(img);

            img.onmouseenter = () => {
                img.style.cursor = "default";
            };

            img.onmousemove = (e) => {
                img.style.cursor = "default";
                const imagePos = [e.offsetX, e.offsetY];
                const pickResult = storeyViewsPlugin.pickStoreyMap(storeyMap, imagePos, {});
                if (pickResult) {
                    const entity = pickResult.entity;
                    const metaObject = viewer.metaScene.metaObjects[entity.id];
                    if (metaObject) {
                        if (canStandOnTypes[metaObject.type]) {
                            img.style.cursor = "pointer";
                        }
                    }
                }
            };

            img.onmouseleave = (e) => {
                img.style.cursor = "default";
            };

            const worldPos = math.vec3();

            img.onclick = (e) => {

                const imagePos = [e.offsetX, e.offsetY];

                const pickResult = storeyViewsPlugin.pickStoreyMap(storeyMap, imagePos, {
                    pickSurface: true
                });

                if (pickResult) {
                    worldPos.set(pickResult.worldPos);
                    worldPos[1] += 7.5;

                    viewer.cameraFlight.flyTo({
                        eye: worldPos,
                        up: viewer.camera.worldUp,
                        look: math.addVec3(worldPos, viewer.camera.worldForward, []),
                        projection: "perspective",
                        duration: 1.5
                    }, () => {
                        viewer.cameraControl.firstPerson = true;
                        viewer.cameraControl.pivoting = false;
                    });
                } else {
                    cameraMemento.restoreCamera(viewer.scene, () => {
                        viewer.cameraControl.firstPerson = false;
                    });
                }
            };
        }
    }                                              
                                           
});




                                 };
                              });
                           });
});
                                                  //closing Guid call
                                                   
                                                   
                                                    
                                          
    