import clientNomads from '../../../xeokit/index.js';
const bimServerAddress = "http://plat-nomads.ddns.net:8080/bimserver/";
const poid1 = 131073;
const roid1 = 655363;

    
const canvaComponent = {
    name : 'canvaComponent',
    template : `
    <div id="canva">
        <div class="botoes">
            <button id="button1" @click="canvasUm">versão 1</button>
            <button id="button2" @click="canvasDois">versão 2</button>
            <button id="button3" @click="canvasTres">versão 3</button>
            <button id="annotations" @click="annotations">anotações (F)</button>
            <button id="measurements" @click="measurements">medidas (L)</button>
            <button id="storeys"@click="storeysTree">andares</button>           
        </div>
    <div id="modelos">
        <canvas id='c1' style="background:white"></canvas>
        <canvas id='c2' style="background:blue"></canvas>
        <canvas id='c3'style="background:red"></canvas>
    </div>
        <link rel="stylesheet" href="src/style/plataforma/canva.css">
    </div>`,
    mounted(){
        new clientNomads(bimServerAddress,poid1,"c1", roid1);
        // new clientNomads(bimServerAddress,poid2,"c2", roid2);
        // new clientNomads(bimServerAddress,poid3,"c3", roid3);
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
            this.changeCanvas('c3','c1','c2');            
        },
        simulateKeyPress : function (key){
            console.log();
        },
        annotations : function() {
            this.simulateKeyPress(70);
            console.log(70);
        },
        measurements : function() {
            this.simulateKeyPress(76);
            console.log(76);
        },
        storeysTree : function() {
            if (document.getElementById("treeViewContainer").style.zIndex == -10) {
                document.getElementById("treeViewContainer").style.zIndex = 20000;
            } else {
                document.getElementById("treeViewContainer").style.zIndex = -10
            }
        }
        
        
    }
}

export default canvaComponent;