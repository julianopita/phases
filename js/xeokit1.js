


import {Viewer} from "../xeokit/src/viewer/Viewer.js";
import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
// import {ReadableGeometry} from "../xeokit/src/viewer/scene/geometry/ReadableGeometry.js";
import {AnnotationsPlugin} from "../xeokit/src/plugins/AnnotationsPlugin/AnnotationsPlugin.js";
//import {DistanceMeasurementsPlugin} from "../bimnomads2/xeokit/src/plugins/DistanceMeasurementsPlugin/DistanceMeasurementsPlugin.js";
// import {StoreyViewsPlugin} from "../xeokit/src/plugins/StoreyViewsPlugin/StoreyViewsPlugin.js";
// import {XKTLoaderPlugin} from "../src/plugins/XKTLoaderPlugin/XKTLoaderPlugin.js";


const bimServerAddress = "http://www.nomads.usp.br:8080/bimserver/";
const username = "platnomads@gmail.com";
const password = "@bimserver";
const poid = 1179649;
const roid = 2097155;


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
// Create a Annotation plugin
// const annotations = new AnnotationsPlugin(viewer, {

//     markerHTML: "<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>",
//     labelHTML: "<div class='annotation-label' style='background-color: {{labelBGColor}};'><div class='annotation-title'>{{title}}</div><div class='annotation-desc'>{{description}}</div></div>",

//     values: {
//         markerBGColor: "red",
//         glyph: "X",
//         title: "Untitled",
//         description: "No description"
//     }
// });


// Initialize the BIMServerClient
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
    },(error) => {
        console.log("Error logging in: " + error.message);
    });
});




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

// annotations.on("markerClicked", (annotation) => {
//     annotation.labelShown = !annotation.labelShown;
// });

//------------------------------------------------------------------------------------------------------------------
// Highlights selected entities
//------------------------------------------------------------------------------------------------------------------
var i = 1;
var lastEntity = null;
var flag = -1;
var annotation = null;
viewer.scene.input.on("mouseclicked",async function (coords) {
    // coords[0] = coords[0] - 100;
    // coords[1] = coords[1] - 100;
    var hit = viewer.scene.pick({
        canvasPos: coords,
        pickSurface : true
    });

    if (hit) {
            if(flag == 1 && annotation != null){
                annotation.destroy();
                flag = -1;
            }
            calls(hit);
            if (!lastEntity || hit.entity.id !== lastEntity.id) {

            if (lastEntity) {
                lastEntity.highlighted = false;
            }

            lastEntity = hit.entity;
            hit.entity.highlighted = true;
            if (hit) {

                annotation = await annotations.createAnnotation({
                    id: "myAnnotation" + i,
                    pickResult: hit, // <<------- initializes worldPos and entity from PickResult
                    occludable: true,       // Optional, default is true
                    markerShown: true,      // Optional, default is true
                    labelShown: true,       // Optional, default is true
                    values: {               // HTML template values
                        glyph: "A" + i,
                        title: "My annotation " + i,
                        description: "My description " + i
                    },
                });
                flag = 1;
                i++;
            }
            // document.getElementsByClassName('annotation-marker')[0].style.setProperty('visibility','visible');
        }
    } else {

        if (lastEntity) {
            lastEntity.highlighted = false;
            lastEntity = null;
        }
    }
});

//chamadas ao servidor
async function calls(hit){
    await bimServerClient.call("LowLevelInterface", "getDataObjectByGuid",
    {roid: roid , guid: hit.entity.id},
    function(IfcBuildingData){
        //obterm o Oid do objeto e o salva em uma sessao local
        sessionStorage.setItem("IfcBuildingOid", IfcBuildingData.oid);
        console.log(IfcBuildingData.oid);
    });
    //get Area from Oid
    await bimServerClient.call("ServiceInterface", "getArea",  {roid: roid , oid: sessionStorage.getItem('IfcBuildingOid')}, 
        function(area){
        //obterm o Oid do site e o salva em uma sessao local
            sessionStorage.setItem("IfcOidArea", area);
            console.log(area);
        //closing Area
        });
    await bimServerClient.call("LowLevelInterface", "getDataObjectByOid",  {roid: roid , oid: sessionStorage.getItem('IfcBuildingOid')}, 
        function(data){
        // obterm o Oid do site e o salva em uma sessao local
            sessionStorage.setItem("IfcOidName", data.name);
            console.log(data.name);
       })
}


// Testing annotations



viewer.camera.eye = [-3.93, 2.85, 27.01];
viewer.camera.look = [4.40, 3.72, 8.89];
viewer.camera.up = [-0.01, 0.99, 0.039];



//------------------------------------------------------------------------------------------------------------------
// Use the AnnotationsPlugin to create an annotation wherever we click on an object
//------------------------------------------------------------------------------------------------------------------



// viewer.scene.input.on("mouseclicked", (coords) => {
//     console.log(coords);
//     coords[1] = coords[1] - 10;
//     console.log(coords);
//     var pickResult = viewer.scene.pick({
//         canvasPos: coords,
//         pickSurface: true  // <<------ This causes picking to find the intersection point on the entity
//     });

 
// });

window.viewer = viewer;