import NavBar from './components/NabBar.js';
import CanvasComponent from './components/Canvas.js';
import clientNomads from './xeokit.js';
import Forum from './components/Forum.js';
const bimServerAddress = "http://plat-nomads.ddns.net:8080/bimserver/";
const poid = 131073;
const roid = 65539;


const App = {
    name : 'App',
    
    
    components : {
        NavBar,
        CanvasComponent,
        Forum
    },


    template : 
    `<div>

        <NavBar/>

        <div id="layoutMain">
            <link rel="stylesheet" href="../styles/principal.css">


                <div id="leftSide">
                    <div class="generalInfo" > </div>
                    
                    <div class="canvasDiv">
                        <CanvasComponent/>
                    </div>
                    
                    <div class="infoSpace"></div>
        
                </div>
                
                    <Forum/>
        </div>
    </div>
        `,

    data(){
        return{
        }
    },

    mounted(){
        // let a = new clientNomads(bimServerAddress,poid,"c1", roid);
        
    }

}

export default App;