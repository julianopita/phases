import {infoClicked} from '../../components/plataforma/Plataforma.js'



let lastEntity = null;


const click = function(viewer,bimServerClient,roid){


    function calls(hit,roid){

        bimServerClient
        .call("LowLevelInterface", "getDataObjectByGuid",
            {roid: roid , guid: hit.entity.id},

            function(IfcBuildingData){

                bimServerClient
                .call("ServiceInterface", "getArea",  {roid: roid , oid: IfcBuildingData.oid},             
                    function(area){
                        document.getElementById('area').innerHTML = area+'m²';
                    });
            
                bimServerClient
                .call("LowLevelInterface", "getDataObjectByOid",  {roid: roid , oid: IfcBuildingData.oid}, 
                    function(data){
                        document.getElementById('descricao').innerHTML = data.name;
            })    
        });
    }

    viewer.scene.input.on("dblclick",async function (coords) {

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
        }else{
            if (lastEntity) {
                lastEntity.highlighted = false;
                lastEntity = null;
            }
        }
    });
}

export default click;

