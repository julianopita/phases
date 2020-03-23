


import {Viewer} from "../xeokit/src/viewer/Viewer.js";
import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
import {ReadableGeometry} from "../xeokit/src/viewer/scene/geometry/ReadableGeometry.js";
import {AnnotationsPlugin} from "../xeokit/src/plugins/AnnotationsPlugin/AnnotationsPlugin.js";
//import {DistanceMeasurementsPlugin} from "../bimnomads2/xeokit/src/plugins/DistanceMeasurementsPlugin/DistanceMeasurementsPlugin.js";
import {StoreyViewsPlugin} from "../xeokit/src/plugins/StoreyViewsPlugin/StoreyViewsPlugin.js";

const bimServerAddress = "http://www.nomads.usp.br:8080/bimserver/";
const username = "platnomads@gmail.com";
const password = "@bimserver";
const poid = 1179649;
const roid = 2097155;


// Create a Viewer
const viewer = new Viewer({
    canvasId: "canvas_main"
});

// Create a Annotation plugin
const annotations = new AnnotationsPlugin(viewer, {

        markerHTML: "<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>",
        labelHTML: "<div class='annotation-label' style='background-color: {{labelBGColor}};'><div class='annotation-title'>{{title}}</div><div class='annotation-desc'>{{description}}</div></div>",

        values: {
            markerBGColor: "red",
            glyph: "X",
            title: "Untitled",
            description: "No description"
        }
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

 //------------------------------------------------------------------------------------------------------------------
    // Highlights selected entities
    //------------------------------------------------------------------------------------------------------------------

    var lastEntity = null;

    viewer.scene.input.on("click", function (coords) {

        var hit = viewer.scene.pick({
            canvasPos: coords
        });

        if (hit) {

        
              if (!lastEntity || hit.entity.id !== lastEntity.id) {

                if (lastEntity) {
                    lastEntity.highlighted = false;
                }

                lastEntity = hit.entity;
                hit.entity.highlighted = true;
            }
        } else {

            if (lastEntity) {
                lastEntity.highlighted = false;
                lastEntity = null;
            }
        }        
         

        console.log (lastEntity.id);

                //Obtain area, description and name of building
                      obterOidIfcBuilding();
                      

                      //exibir o que foi salvo no storage
                      
                    var IfcBuildingGuid = lastEntity;
                    
                    console.log (IfcBuildingGuid.id);

                    // Initialize the BIMServerClient
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
                                 bimServerClient.call("LowLevelInterface", "getDataObjectByGuid",  {roid: roid , guid: IfcBuildingGuid.id}, function(IfcBuildingData){
                                   //obterm o Oid do site e o salva em uma sessao local
                                       sessionStorage.setItem("IfcBuildingOid", IfcBuildingData.oid);
                                       console.log(IfcBuildingData.oid);
                                       
                                       
                                             //get Area from Oid
                                              
                                               bimServerClient.call("ServiceInterface", "getArea",  {roid: roid , oid: IfcBuildingData.oid}, function(IfcBuildingData2){
                                                 //obterm o Oid do site e o salva em uma sessao local
                                                     sessionStorage.setItem("IfcOidArea", IfcBuildingData2);
                                                     console.log(IfcBuildingData2);
                                                  //closing Area
                                                   });

                                               //get Name from Oid
                                               bimServerClient.call("LowLevelInterface", "getDataObjectByOid",  {roid: roid , oid: IfcBuildingData.oid}, function(IfcBuildingData2){
                                                 //obterm o Oid do site e o salva em uma sessao local
                                                     //sessionStorage.setItem("IfcOidName", IfcBuildingData3);
                                                     console.log(IfcBuildingData2);
                                                            var n = "Name";
                                                            console.log(n);
                                                            // iterate over each element in the array
                                                            for (var i = 0; i < IfcBuildingData2.values.length; i++){
                                                              // look for the entry with a matching `code` value
                                                              if (IfcBuildingData2.values[i].fieldName == n){
                                                                 // we found it
                                                                // obj[i].name is the matched result
                                                                sessionStorage.setItem("IfcBuildingName", IfcBuildingData2.values[i].stringValue);
                                                                console.log (IfcBuildingData2.values[i].stringValue);
                                                //closing Name

                                                 };
                                                 };
                                                 });
                                              
                                              //get Description from Oid
                                              bimServerClient.call("LowLevelInterface", "getDataObjectByOid",  {roid: roid , oid: IfcBuildingData.oid}, function(IfcBuildingData2){
                                                 //obterm o Oid do site e o salva em uma sessao local
                                                     //sessionStorage.setItem("IfcOidName", IfcBuildingData3);
                                                     console.log(IfcBuildingData2);
                                                            var n = "Description";
                                                            console.log(n);
                                                            // iterate over each element in the array
                                                            for (var i = 0; i < IfcBuildingData2.values.length; i++){
                                                              // look for the entry with a matching `code` value
                                                              if (IfcBuildingData2.values[i].fieldName == n){
                                                                 // we found it
                                                                // obj[i].name is the matched result
                                                                sessionStorage.setItem("IfcBuildingDescription", IfcBuildingData2.values[i].stringValue);
                                                                console.log (IfcBuildingData2.values[i].stringValue);

                                                //closing Description
                                                 };
                                                 };
                                                 });


                                                  //closing Guid call
                                                   });
                                                   });

                                                      //------------------------------------------------------------------------------------------------------------------
                                                      // Use the AnnotationsPlugin to create an annotation wherever we click on an object
                                                      //------------------------------------------------------------------------------------------------------------------

                                                    annotations.on("markerClicked", (annotation) => {
                                                          annotation.labelShown = !annotation.labelShown;
                                                      });

                                                      var i = 1;

                                                      viewer.scene.input.on("mouseclicked", (coords) => {

                                                          var pickResult = viewer.scene.pick({
                                                              canvasPos: coords,
                                                              pickSurface: true  // <<------ This causes picking to find the intersection point on the entity
                                                          });

                                                          if (pickResult) {
                                                             var d = i
                                                              annotations.destroyAnnotation("myAnnotation" + [d]);
                                                              const annotation = annotations.createAnnotation({
                                                                  id: "myAnnotation" + i,
                                                                  pickResult: pickResult, // <<------- initializes worldPos and entity from PickResult
                                                                  occludable: false,       // Optional, default is true
                                                                  markerShown: true,      // Optional, default is true
                                                                  labelShown: true,       // Optional, default is true
                                                                  values: {               // HTML template values
                                                                      glyph: "A",
                                                                      title: "Informação sobre  " + IfcBuildingName,
                                                                      description: IfcBuildingDescription + "</br> Area: " + IfcOidArea + "m²",
                                                                  },
                                                              });
                                                          ++i;  
                                                          }
                                                       });
                                                    
                                                      window.viewer = viewer;
                                                 
                                      //closing Bimserver connection        
                                                };
                                //closing object picking
    
                                });


                              

