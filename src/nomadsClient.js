import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
import {Viewer} from "@xeokit/xeokit-sdk/src/viewer/Viewer";
import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
import Login from "./lib/login.js"
import click from "./lib/click.js"



// const NomadsClient = function(bimServerAdress,roid,poid,canvasId){
//         this.bimServerAdress = bimServerAdress;
//         this.roid = roid;
//         this.poid = poid;
//         this.canvasId = canvasId;
//         //----
//         this.viewer = new Viewer({canvasId});
//         this.bimServerClient = new BimServerClient(bimServerAdress);
//         this.bimServerLoader = new BIMServerLoaderPlugin(this.viewer,{
//             bimServerClient : this.bimServerClient
//         });

//         return {
//             log : ()=>{
//                 Login.cria(this.viewer,bimServerClient,bimServerLoader,poid);
//             }
//         }

// }


// export default NomadsClient;

// const nc = new NomadsClient("http://plat-nomads.ddns.net:8080/bimserver/",
//     65539
//     ,131073
//     ,'canvas1');
