import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import {Viewer} from "../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
import Login from "./lib/login.js"
//import areaOcupada from "./lib/areaOcupada.js"


//const bimServerAddress = "http://ec2-23-23-28-142.compute-1.amazonaws.com:8080/bimserver/";
const bimServerAddress = "http://192.168.2.100:8080/bimserver/";
const poidOne = 131073;
const roidOne = 65539;
const pack = "ifc2x3tc1";
const username = "platnomads@gmail.com";
const password = "@bimserver";

//visualizadores
const viewerUm = new Viewer({
    canvasId: "canvas_1"
});

//Carrega o projeto 1
const bimServerClientUm = new BimServerClient(bimServerAddress);
const bimServerLoaderUm = new BIMServerLoaderPlugin(viewerUm, {
   bimServerClient: bimServerClientUm
});

Login.cria(viewerUm,bimServerClientUm,bimServerLoaderUm,poidOne);


// Initialize the BIMServerClient
//bimServerClientUm.init(() => {
    

    // Login to the BIMServerClient
    bimServerClientUm.login(username, password, () => {
       
      //****ÁREA OCUPADA***** */
        // Obtem Oid dos terrenos (IfcSite)
        bimServerClientUm.call("LowLevelInterface", "getDataObjectsByType",  {roid: roidOne , packageName: pack , className: "IfcSite" , flat: true}, 
        function(oid){
           for (var i = 0; i < oid.length; i++){ 
            console.log(oid[i].oid);

              //Obtem área dos terrenos a partir do Oid
              bimServerClientUm.call("ServiceInterface", "getArea",  {roid: roidOne , oid: oid[i].oid},             
              function(area){
                console.log(area);
                //-----somar as áreas e armazenar em uma variável              
              });
            };
          });

          //Obtem a soma das áreas dos espaços
          bimServerClientUm.call("LowLevelInterface", "getDataObjectsByType",  {roid: roidOne , packageName: pack , className: "IfcSpace" , flat: true}, 
          function(oid){
             for (var i = 0; i < oid.length; i++){ 
              console.log(oid[i].oid);
  
                //Obtem área dos terrenos a partir do Oid
                bimServerClientUm.call("ServiceInterface", "getArea",  {roid: roidOne , oid: oid[i].oid},             
                function(area){
                  console.log(area);
                });
              };
            });
                  
          //-----dividir a soma da áreas dos espaços pela soma da área no terreno e enviar para visualização
         
    //****ÁREA DE CADA PAVIMENTO - talvez seja possível obter a partir do IfcBuildingStorey>IfcRelAggregates>IfcSpaces***** */      

           // A associação dos IfcSpace com os IfcBuildingStorey através do IfcSpace>Decomposes>IfcRelAggregates>IfcBuildingStoreys
        bimServerClientUm.call("LowLevelInterface", "getDataObjectsByType",  {roid: roidOne , packageName: pack , className: "IfcSpace" , flat: true}, 
        function(StoreytoSpace){
           for (var i = 0; i < StoreytoSpace.length; i++){ 
            //obtem a oid de cada IfcSpace
            console.log(StoreytoSpace[i].oid);

            bimServerClientUm.call("LowLevelInterface", "getDataObjectByOid",  {roid: roidOne , oid: StoreytoSpace[i].oid}, 
            function(Decomposes){
                              
                  console.log(Decomposes);
                         var n = "Decomposes";
                         console.log(n);
                         // Verifica no array os valores com fieldName=Decomposes. Este valor agrega os objetos compostos pelos espaços
                         for (var j = 0; j < Decomposes.values.length; j++){
                           // procura o valor Decomposes em fieldName
                           if (Decomposes.values[j].fieldName == n){
                             var m="IfcRelAggregates";
                              //continua buscando no array até encontrar o objeto IfcRelAggregates no segundo nível do array                           
                              for (var l = 0; l < Decomposes.values[j].values.length; l++){
                             // Verifica se o typeName corresponde a IfcRelAggregates (que agrega as relaçoes hierarquicas entre objetos)
                              if (Decomposes.values[j].values[l].typeName == m){
                                //esse é o valor dos IfcRelAggregates associados a cada IfcSpace. A partir do oid é possível encontrar o IfcBuildingStorey correspondente e agrupas os espaços
                                 console.log (Decomposes.values[j].values[l].oid);
                                 //busca os storeys a partir do oid do IfcRelAggregates

                                 bimServerClientUm.call("LowLevelInterface", "getDataObjectByOid",  {roid: roidOne , oid: Decomposes.values[j].values[l].oid}, 
                                  function(SpacetoStorey){
                                    var o = "IfcBuildingStorey";
                                    //a partir do oid do IfcRelAggregates obtido antes busca os IfcBuildingStorey associados                          
                                       for (var s = 0; s < SpacetoStorey.values.length; s++){
                                       // Verifica se o typeName corresponde a IfcBuildingStorey
                                       if (SpacetoStorey.values[s].typeName == o){
                                         //esse é o valor dos oid do IfcBuildingStorey associado a cada IfcSpace. A partir desse é possível obter o nome e agrupar.
                                          console.log (SpacetoStorey.values[s].oid);
                                       };
                                      };
                                    });
                                 
             
                              };
                             };

                };
               };
              });

            };
          });


          // Fecha BimServerClientUm        
        });
 




// Carrega o projeto 2
//Carrega o projeto 1
//const bimServerClientDois = new BimServerClient(bimServerAddress);
//const bimServerLoaderDois  = new BIMServerLoaderPlugin(viewerDois, {
//    bimServerClient: bimServerClientDois
//});
//Login.cria(viewerDois,bimServerClientDois,bimServerLoaderDois,poidTwo);




//-------------

// // Create a BIMServerClient

// // faz o login no servidor
// Login.cria(viewer,bimServerClient,bimServerLoader,poidTwo);
// //pega os cliques e armazena na sessão
// click(viewer,bimServerClient,roidTwo);


//--------------

// // Create a BIMServerClient
// const bimServerClient = new BimServerClient(bimServerAddress);

// // Add a BIMServerLoaderPlugin
// const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
//     bimServerClient: bimServerClient
// });

// // faz o login no servidor
// Login.cria(viewer,bimServerClient,bimServerLoader,poidThree);

// //pega os cliques e armazena na sessão
// click(viewer,bimServerClient,roidThree);



function projectOne(){

    document.getElementById("canvas_1").style.zIndex = 10;
    document.getElementById("canvas_2").style.zIndex = 5;
    document.getElementById("canvas_3").style.zIndex = 1;
}

//function projectTwo(){

 //   document.getElementById("canvas_1").style.zIndex = 1;
  //  document.getElementById("canvas_2").style.zIndex = 10;
  //  document.getElementById("canvas_3").style.zIndex = 5;
//}

//function projectThree(){

    //document.getElementById("canvas_1").style.zIndex = 5;
    //document.getElementById("canvas_2").style.zIndex = 1;
    //document.getElementById("canvas_3").style.zIndex = 10;
//}





// seleciona projeto
//ulChildren[0].addEventListener("click",projectOne,"true");
//ulChildren[1].addEventListener("click",projectTwo,"true");

// ulChildren[2].addEventListener("click",projectThree,"true");


  

