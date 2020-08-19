import Vue from './lib/vue.js';
import NavBar from './components/NabBar.js';
import CanvasComponent from './components/Canvas.js';
import clientNomads from './xeokit.js';
const bimServerAddress = "http://plat-nomads.ddns.net:8080/bimserver/";
const poid = 131073;
const roid = 65539;

const App = {
    name : 'App',
    
    
    components : {
        NavBar,
        CanvasComponent
    },


    template : 
    `<div>

        <NavBar/>

        <div id="layoutMain">
            <link rel="stylesheet" href="./src/styles/principal.css">


                <div id="leftSide">
                    <div class="generalInfo" > </div>
                    
                    <div class="canvasDiv">
                        <CanvasComponent/>
                    </div>
                    
                    <div class="infoSpace"></div>
        
                </div>
                
                <div></div>
        </div>
    </div>
        `,

    data(){
        return{
        }
    },

    mounted(){
        let a = new clientNomads(bimServerAddress,poid,"c1", roid);
        
    }

}
new Vue({
    el: '#app',
    components : {
        App,
    }
})