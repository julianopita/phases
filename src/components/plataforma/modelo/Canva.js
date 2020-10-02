import clientNomads from '../../../xeokit/index.js';
const bimServerAddress = "http://plat-nomads.ddns.net:8080/bimserver/";
const poid = 131073;
const roid = 65539;

const canvaComponent = {
    name : 'canvaComponent',
    template : `
    <div id="canva">
        <div class="botoes">
            <button id="button1" @click="canvasUm">1</button>
            <button id="button2" @click="canvasDois">2</button>
            <button id="button3" @click="canvasTres">3</button>
        </div>
    <div id="modelos">
        <canvas id='c1' style="background:white"></canvas>
        <canvas id='c2' style="background:blue"></canvas>
        <canvas id='c3'style="background:red"></canvas>
    </div>
        <link rel="stylesheet" href="src/style/plataforma/canva.css">
    </div>`,
    mounted(){
        new clientNomads(bimServerAddress,poid,"c1", roid);
        document.getElementById('c1').style.zIndex = 10;
    },
    methods : {

        changeCanvas : function (a,b,c) {
            document.getElementById(a).style.zIndex = 10;
            document.getElementById(b).style.zIndex = 5;
            document.getElementById(c).style.zIndex = 1;
        },
        canvasUm : function(){
            this.changeCanvas('c1','c2','c3');
        },
        canvasDois : function(){
            this.changeCanvas('c2','c3','c1');            
        },
        canvasTres : function(){
            this.changeCanvas('c3','c3','c2');            
        }


    }
}

export default canvaComponent;