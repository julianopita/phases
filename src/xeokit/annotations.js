import {BIMServerLoaderPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js'
import {Viewer} from '../../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js';
import BimServerClient from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js';
import {DistanceMeasurementsPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/DistanceMeasurementsPlugin/DistanceMeasurementsPlugin.js';
import {TreeViewPlugin} from '../../node_modules/@xeokit/xeokit-sdk/src/plugins/TreeViewPlugin/TreeViewPlugin.js';
import {AnnotationsPlugin} from "../../node_modules/@xeokit/xeokit-sdk/src/plugins/AnnotationsPlugin/AnnotationsPlugin.js";
import {math} from "../../node_modules/@xeokit/xeokit-sdk/src/viewer/scene/math/math.js";


import Login from "./login.js"
import click from "./click.js"

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

    viewer.scene.input.on("mouseclicked", () => {      
               
        const entity = viewer.scene.objects["0777WCdvX848sQnXrJZ7E4"];
        console.log(entity);
        const aabb = entity.aabb;
        console.log(aabb);
        const entityCenter = math.getAABB3Center(aabb);
        console.log(entityCenter);
             
       

        
    });
 

export default Annotations;