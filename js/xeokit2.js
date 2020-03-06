


import {Viewer} from "../xeokit/src/viewer/Viewer.js";
import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
import {ReadableGeometry} from "../xeokit/src/viewer/scene/geometry/ReadableGeometry.js";
//import {AnnotationsPlugin} from "../bimnomads2/xeokit/src/plugins/AnnotationsPlugin/AnnotationsPlugin.js";
//import {DistanceMeasurementsPlugin} from "../bimnomads2/xeokit/src/plugins/DistanceMeasurementsPlugin/DistanceMeasurementsPlugin.js";
import {StoreyViewsPlugin} from "../xeokit/src/plugins/StoreyViewsPlugin/StoreyViewsPlugin.js";

const bimServerAddress = "http://www.nomads.usp.br:8080/bimserver/";
const username = "platnomads@gmail.com";
const password = "@bimserver";
const poid = 655361;

// Create a Viewer
const viewer = new Viewer({
    canvasId: "canvas_aux1"
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

//---MILAGRE--

//Chamada da função
obterDados(2097155,1442586);

// Initialize the BIMServerClient
function obterDados(roidClicado, oidClicado){

  bimServerClient.init(() => {

      // Login to the BIMServerClient
      bimServerClient.login(username, password, () => {

      bimServerClient.call("ServiceInterface", "getArea",  {roid: roidClicado , oid:oidClicado }, function(data){
           document.getElementById("area").innerHTML = "Area: "+data;
      });
      
      bimServerClient.call("ServiceInterface", "getVolume",  {roid: roidClicado , oid:oidClicado }, function(data){
           document.getElementById("volume").innerHTML = "Volume: "+data;
      });
      //Fechando o login
      });
  //Fechando o BimServerClient
  });
}


//const distanceMeasurements = new DistanceMeasurementsPlugin(viewer);
//distanceMeasurements.control.activate();  // <------------ Activate the DistanceMeasurementsControl

//storey view
const storeyViewsPlugin = new StoreyViewsPlugin(viewer);
const storey = storeyViewsPlugin.storeys["0B5gfVFyr9cw1sh0d96Zrl"]; // ID of the IfcBuildingStorey

const modelId  = "myModel"; //storey.modelId;  // "myModel"
const storeyId = "0B5gfVFyr9cw1sh0d96Zrl"; // "2SWZMQPyD9pfT9q87pgXa1"
//const aabb     = storey.aabb;     // Axis-aligned 3D World-space boundary of the IfcBuildingStorey

  //------------------------------------------------------------------------------------------------------------------
    // Create an AnnotationsPlugin, with which we'll create annotations
    //------------------------------------------------------------------------------------------------------------------

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

    annotations.on("markerClicked", (annotation) => {
        annotation.labelShown = !annotation.labelShown;
    });

        //------------------------------------------------------------------------------------------------------------------
    // Use the AnnotationsPlugin to create an annotation wherever we click on an object
    //------------------------------------------------------------------------------------------------------------------

    var i = 1;

    viewer.scene.input.on("mouseclicked", (coords) => {

        var pickResult = viewer.scene.pick({
            canvasPos: coords,
            pickSurface: true  // <<------ This causes picking to find the intersection point on the entity
        });

        if (pickResult) {

            const annotation = annotations.createAnnotation({
                id: "myAnnotation" + i,
                pickResult: pickResult, // <<------- initializes worldPos and entity from PickResult
                occludable: true,       // Optional, default is true
                markerShown: true,      // Optional, default is true
                labelShown: true,       // Optional, default is true
                values: {               // HTML template values
                    glyph: "A" + i,
                    title: "My annotation " + i,
                    description: "My description " + i
                },
            });

            i++;
        }
    });
//picker
//viewer.scene.input.on("mouseclicked", function (coords) {

  //  const hit = viewer.scene.pick({
  //      canvasPos: coords
  //  });

  //  if (hit) {
  //      const entity = hit.entity;
  //      const metaObject = viewer.metaScene.metaObjects[entity.id];
  //      if (metaObject) {
  //          console.log(JSON.stringify(metaObject.getJSON(), null, "\t"));
  //      }
  //  }
//});

 //------------------------------------------------------------------------------------------------------------------
    // Create some metadata for our model
    //------------------------------------------------------------------------------------------------------------------

    viewer.metaScene                            // This is the MetaScene for the Viewer
        .createMetaModel("building", {         // Creates a MetaModel in the MetaScene
            "projectId": "myTableProject",
            "revisionId": "V1.0",
            "metaObjects": [
                {
                    "id": "data",              // ID does not match any Entity
                    "name": "House",
                    "type": "IFC",        // Arbitrary type, could be IFC type
                    "properties": {             // Arbitrary properties, could be IfcPropertySet
                        IfcPropertySet: "material"
                    }
                }],
            });

// Get matadata on our model
  // Get the whole table model

 //   var tableModel = viewer.scene.models["building"];

   // tableModel.edges = true;

    //------------------------------------------------------------------------------------------------------------------
    // Create a tree view that toggles object visibilities
    //------------------------------------------------------------------------------------------------------------------


    // Builds tree view data from MetaModel
//    var createData = function (metaModel) {
 //       const data = [];

  //      function visit(expand, data, metaObject) {
  //          if (!metaObject) {
   //             return;
   //         }
  //          var child = {
   //             id: metaObject.id,
 //               text: metaObject.name
 //           };
  //          data.push(child);
  //          const children = metaObject.children;
   //         if (children) {
  //              child.children = [];
  //              for (var i = 0, len = children.length; i < len; i++) {
  //                  visit(true, child.children, children[i]);
  //              }
   //         }
//        }

 //       visit(true, data, metaModel.rootMetaObject);
  //      return data;
  //  };

    // Get MetaModel we loaded for our model
 //   const modelId = tableModel.id;
//    const metaModel = viewer.metaScene.metaModels[modelId];

    // Create the tree view
//    var treeView = new InspireTree({
   //     selection: {
   //         autoSelectChildren: true,
   //         autoDeselect: true,
   //         mode: 'default'
   //     },
   //     checkbox: {
   //         autoCheckChildren: true
  //      },
  //      showCheckboxes: true,
 //       data: createData(metaModel)
 //   });

 //   new InspireTreeDOM(treeView, {
 //       target: document.getElementById("treePanel")
 //   });

    // Initialize the tree view once loaded
 //   treeView.on('model.loaded', function () {

  //      treeView.select();

  //      treeView.model.expand();
 //       treeView.model[0].children[0].expand();


 //       treeView.on('node.selected', function (event, node) {
 //           const objectId = event.id;
 //           viewer.scene.setObjectsVisible(objectId, true);
 //       });

//        treeView.on('node.deselected', function (event, node) {
 //           const objectId = event.id;
 //           viewer.scene.setObjectsVisible(objectId, false);
 //       });

 //   });


// Get metadata on an element


const metaObject = metaModel.metaObjects["240cc98c-7143-4700-8396-4bffd4ebd765"];

const name = metaObject.name; // "stelkozijn",
const type = metaObject.type; // "IfcWindow",
const parent = metaObject.parent; // "2SWZMQPyD9pfT9q87pgXa1"

// Define our own custom initial states for objects

 const myObjectDefaults = {
    IfcDoor: {
        colorize: [0.837255, 0.203922, 0.270588]
    },
    IfcCovering: {
        colorize: [0.4470588235, 0.727450980392, 0]
    },
    //...
};

// Use our custom initial default states for object Entities

const model = gltfLoader.load({
    id: "myModel",
    src: "./models/gltf/duplex/scene.gltf",
    metaModelSrc: "./metaModels/duplex/metaModel.json",

    objectDefaults: myObjectDefaults
});
//window.viewer = viewer;