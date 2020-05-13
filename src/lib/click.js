import info from "./Info.js"
import Info from "./Info.js";

var click;

var lastEntity = null;
var count = 0;

export default click = (viewer,bimServerClient,roid) =>{
    viewer.scene.input.on("mouseclicked",async function (coords) {

        var hit = viewer.scene.pick({
        canvasPos: coords,
        pickSurface : true
        });

        if (hit) {
            console.log(hit);
            if (!lastEntity || hit.entity.id !== lastEntity.id) {
                await calls(hit,roid);
                if (lastEntity) {
                    lastEntity.highlighted = false;
                }
                lastEntity = hit.entity;
                hit.entity.highlighted = true;
            }
        }else{
            if (lastEntity) {
                lastEntity.highlighted = false;
                lastEntity = null;
            }
        }
    });


    function calls(hit,roid){
        bimServerClient.call("LowLevelInterface", "getDataObjectByGuid",
        {roid: roid , guid: hit.entity.id},
        function(IfcBuildingData){



            bimServerClient.call("ServiceInterface", "getArea",  {roid: roid , oid: IfcBuildingData.oid},             
                function(area){
                    Info.area(area);
                });
           
            bimServerClient.call("LowLevelInterface", "getDataObjectByOid",  {roid: roid , oid: IfcBuildingData.oid}, 
                function(data){
                    console.log(data);
                    Info.descricao(data.name);
                })    
        });

               
    }
}

