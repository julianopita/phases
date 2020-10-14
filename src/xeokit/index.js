import {BIMServerLoaderPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js'
import {Viewer} from '../../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js';
import BimServerClient from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js';
import {DistanceMeasurementsPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/DistanceMeasurementsPlugin/DistanceMeasurementsPlugin.js';
import {TreeViewPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/TreeViewPlugin/TreeViewPlugin.js';
import {AnnotationsPlugin} from "../../node_modules/@xeokit/xeokit-sdk/src/plugins/AnnotationsPlugin/AnnotationsPlugin.js";



import Login from "./login.js"
import click from "./click.js"

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  };



const clientNomads = function(bimServerAddress,poid,canvasId, roid){
    const bimServerClient = new BimServerClient(bimServerAddress);
    const viewer = new Viewer({
        canvasId: canvasId
    }); 
     
     
    //Measurements
    
           
    const distanceMeasurements = new DistanceMeasurementsPlugin(viewer,{labelMinAxisLength:10000});
        let measureControl = 0
        viewer.scene.input.on("keydown", (keyCode) => {
            if (measureControl == 1 && keyCode == 76) {
                measureControl = 0;
                distanceMeasurements.control.activate();
            } else if (measureControl == 0 && keyCode == 76) {
                distanceMeasurements.control.deactivate();
                distanceMeasurements.clear();
                measureControl = 1;
            } else {
                console.log("no")
            }
        });  
    
    //TreeView
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

    //Annotations 
       
        const annotations = new AnnotationsPlugin(viewer, {

        markerHTML: "<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>",
        labelHTML: "<div class='annotation-label' style='background-color: {{labelBGColor}};'>\
            <div class='annotation-title'>{{title}}</div>\
            <div class='annotation-desc'>{{description}}</div>\
            </div>",

        values: {
            markerBGColor: "red",
            labelBGColor: "white",
            glyph: "X",
            title: "Untitled",
            description: "No description"
        }
    });

    let numAnnotations = 0;
    let annoControl = 0
    
    viewer.scene.input.on("keydown", (keyCode) => {
        if (annoControl == 0 && keyCode == 70) { 
        annoControl = 1;
        console.log("yay!");
        
        //read JSON of spaces Guid fed by the apiInfo
        const spaceJSON = $.getJSON("../annotationData.json",function(json) {            
            const spaceGuid = spaceJSON.responseJSON;            

            //iterate over the JSON and use each of the space GUID to create an annotation
            for (var value of Object.values(spaceGuid)) {
                var name = getKeyByValue(spaceGuid, value);
                

                //define the insertion point at the center of the space and the lowest z value       
                const entity = viewer.scene.objects[value];             
                const locX = (entity.aabb[0]+entity.aabb[3])/2;
                const locY = entity.aabb[1];
                const locZ = (entity.aabb[2]+entity.aabb[5])/2;                              
            
                //create the annotations
                annotations.createAnnotation({
                    id: "myAnnotation" + numAnnotations++,
                    entity: entity,
                    worldPos: [locX,locY,locZ],
                    occludable: false,
                    markerShown: true,
                    labelShown: true,

                    values: {
                        glyph: "" + numAnnotations++,
                        title: name,
                        description: "",
                        markerBGColor: "green"
                    }
                });
            }
        });
} else if (annoControl == 1 && keyCode == 70) {
    annotations.clear();
    annoControl = 0;
    console.log("boo!");
} else { 
    console.log("nope");
};
});

    const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
        bimServerClient: bimServerClient
    });
    Login.cria(viewer,bimServerClient,bimServerLoader,poid);
    click(viewer,bimServerClient,roid);
    
     

}





export default clientNomads;