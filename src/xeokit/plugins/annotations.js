//Annotations 
import {AnnotationsPlugin} from "../../../node_modules/@xeokit/xeokit-sdk/src/plugins/AnnotationsPlugin/AnnotationsPlugin.js"; 
import {getKeyByValue} from "./supportFunctions.js"

export default function Annotations(viewer){
    const annotations = new AnnotationsPlugin(viewer, {
        
    markerHTML: "<div class='annotation-marker' style='background-color: {{markerBGColor}}; visibility: hidden;'{{glyph}}></div>",
    labelHTML: "<div class='annotation-label' style='background-color: {{labelBGColor}};'>\
        <div class='annotation-title'>{{title}}</div>\
        <div class='annotation-desc'>{{description}}</div>\
        </div>",

    values: {
        markerBGColor: "red",
        labelBGColor: "white",
        glyph: "a",
        title: "Untitled",
        description: "No description"
    }
});

//Label shown on mouseover 
annotations.on("markerMouseEnter", (annotation) => {
    annotation.setLabelShown(true);
});

annotations.on("markerMouseLeave", (annotation) => {
    annotation.setLabelShown(false);
});

var numAnnotations = 0;
let control = true;
const annotationClick = document.getElementById('annotations');

annotationClick.addEventListener('click',()=>{
    if (control == true) {     
    control = false;
    
    //read JSON of spaces Guid fed by the apiInfo
    const spaceJSON = $.getJSON("../annotationData.json",function(json) {            
        const spaceGuid = spaceJSON.responseJSON;
        console.log(spaceGuid);       
                          

        //iterate over the JSON and use each of the space GUID to create an annotation
        for (var value of Object.values(spaceGuid)) {

            //define here the contents of the label
            var name = getKeyByValue(spaceGuid, value); 

            //define the insertion point at the center of the space and the lowest z value
            const guid = value[0];
            const area = value[1];
            const piso = value[2];
            const parede = value[3];
            const forro = value[4];   
            const entity = viewer.scene.objects[guid];
            console.log(value,guid,area);
                        
            const locX = (entity.aabb[0]+entity.aabb[3])/2;
            const locY = (entity.aabb[1]-1);
            const locZ = (entity.aabb[2]+entity.aabb[5])/2;                              
        
            //create the annotations
            annotations.createAnnotation({
                id: "myAnnotation" + numAnnotations++,
                entity: "",
                worldPos: [locX,locY,locZ],
                occludable: false,
                markerShown: true,
                labelShown: false,

                values: {
                    glyph: "a",
                    title: name,
                    description: "<strong>Área</strong>: "+ area + "m²</br><strong>Acabamento piso</strong>: " + piso + "</br><strong>Acabamento parede</strong>: " + parede + "</br><strong>Acabamento forro</strong>: " + forro,
                    markerBGColor: ""
                }
            });
        }
    });
} else  {
annotations.clear();
control = true;
} 
});
};

