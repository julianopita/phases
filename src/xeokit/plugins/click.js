import {AnnotationsPlugin} from '../../../node_modules/@xeokit/xeokit-sdk/src/plugins/AnnotationsPlugin/AnnotationsPlugin.js';
import {math} from '../../../node_modules/@xeokit/xeokit-sdk/src/viewer/scene/math/math.js';
let lastEntity = null;

const click = function(viewer,bimServerClient,roid){

    let clickControl = false;
    const clickClick = document.getElementById('info');
    
    clickClick.addEventListener('click',()=>{
        if (clickControl == true) {
            annotations.clear();
            lastEntity.highlighted = false;
            lastEntity = null;
            clickControl = false;            
        } else {
            clickControl = true;            
        };
    });

    const annotations = new AnnotationsPlugin(viewer, {
        markerHTML: "<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>",
        labelHTML: "<div class='annotation-label' style='background-color: {{labelBGColor}};'>\
            <div class='annotation-title' id='click-name'></div>\
            <div class='annotation-desc' id='click-area'></div>\
            <div class='annotation-desc' id='click-description'></div>\
            </div>",

        values: {
            markerBGColor: "red",
            labelBGColor: "white",
            glyph: "X",
            title: "Untitled",
            description: "No description"
        }
    });    

    function calls(hit,roid){
        console.log(hit);
        const aabb = hit.entity.aabb;
        const locX = (hit.entity.aabb[0]+hit.entity.aabb[3])/2;
        const locY = (hit.entity.aabb[1]+hit.entity.aabb[4])/10;
        const locZ = (hit.entity.aabb[2]+hit.entity.aabb[5])/2;
        const entityCenter = math.getAABB2Center(aabb);
        annotations.clear();
        annotations.createAnnotation({
           id: "Informação",
           entity: hit.entity,
           worldPos: [locX, locY, locZ],
           occludable: false,
           markerShown: true,
           labelShown: true,
           values: {
               glyph:"i",
               title: hit.entity.label,
               description: "",
               markerBGColor: "blue",
           }
        })

        bimServerClient
        .call("LowLevelInterface", "getDataObjectByGuid",
            {roid: roid , guid: hit.entity.id},
            
            function(IfcBuildingData){
                
                bimServerClient
                .call("ServiceInterface", "getArea",  {roid: roid , oid: IfcBuildingData.oid},             
                    function(area){
                        document.getElementById('click-area').innerHTML = Number(area).toFixed(2)+'m²';
                    });
            
                bimServerClient
                .call("LowLevelInterface", "getDataObjectByOid",  {roid: roid , oid: IfcBuildingData.oid}, 
                    function(data){
                        let i = 0;
                        for (i in data.values) {
                            if (data.values[i].fieldName == "ObjectType") {
                                document.getElementById('click-name').innerHTML = data.values[i].stringValue;
                            }
                        }                        
                        console.log(data);
            }) 
            bimServerClient
                .call("LowLevelInterface", "getDataObjectByOid",  {roid: roid , oid: IfcBuildingData.oid}, 
                    function(data){
                        let i = 0;
                        for (i in data.values) {
                            if (data.values[i].fieldName == "Description") {
                                if (data.values[i].stringValue == !null) {
                                    document.getElementById('click-description').innerHTML = data.values[i].stringValue;
                                    console.log(data.values[i].stringValue);
                                } else {
                                    document.getElementById('click-description').innerHTML = "Sem descrição"; 
                                }
                            }
                        }                        
                        
            })   
        });
    }

    viewer.scene.input.on("click",async function (coords) {
        if (clickControl == true) {
        let hit = viewer.scene.pick({
        canvasPos: coords,
        pickSurface : true
        });

            if (hit) {
                if (!lastEntity || hit.entity.id !== lastEntity.id) {
                    await calls(hit,roid);
                        if (lastEntity) {
                            lastEntity.highlighted = false;
                            }
                        lastEntity = hit.entity;
                        hit.entity.highlighted = true;
                        }
                } else if (lastEntity) {
                        lastEntity.highlighted = false;
                        lastEntity = null;
                        }
        } else if (lastEntity == !null) {
            lastEntity.highlighted = false;
            lastEntity = null;            
                    };        
    });
}

export default click;

