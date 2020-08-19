import Vue from './lib/vue.js';
import NavBar from './components/NabBar.js';
import CanvasComponent from './components/Canvas.js';
import Cvas from './xeokit.js';


const App = {
    name : 'App',
    
    
    components : {
        NavBar,
        CanvasComponent
    },


template : `<div style="width:100%">
    <NavBar></NavBar>
    <div id="layoutMain">
        <link rel="stylesheet" href="./src/styles/principal.css">
            <div id="leftSide">
                <div class="generalInfo" style="background-color: #482E58">a </div>
                <div class="canvaSpace" style="background-color: #c4c4c4">
                    <CanvasComponent/>
                </div>
                <div class="infoSpace" style="background-color: #482E58">a</div>
            </div>
            
            <div style="background-color: #FAF0F0">b</div>
        </div>
    </div>
    `,

    data(){
        return{
        }
    },

    beforeMount(){
        console.log(document.getElementById('c1'));
    },


    mounted(){
        console.log(document.getElementById('c1'));
    }

}
new Vue({
    el: '#app',
    components : {
        App,
    }
})