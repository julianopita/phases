import clientNomads from '../../../xeokit/index.js';
const bimServerAddress = "http://plat-nomads.ddns.net:8080/bimserver/";
const poid = 131073;
const roid = 65539;

const canvaComponent = {
    name : 'canvaComponent',
    template : `<div id="canva">
        <canvas id='c1'></canvas>
        <link rel="stylesheet" href="src/style/plataforma/canva.css">
    </div>`,
    mounted(){
        new clientNomads(bimServerAddress,poid,"c1", roid);
    }
}

export default canvaComponent;