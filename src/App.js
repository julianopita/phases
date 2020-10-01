// import TelaCadastro from './components/TelaCadastro.js'
// import TelaLogin from './components/TelaLogin.js';
// import Plataforma from './components/plataforma/Plataforma.js'
import clientNomads from './xeokit/index.js';
const bimServerAddress = "http://plat-nomads.ddns.net:8080/bimserver/";
const poid = 131073;
const roid = 65539;



const Template = `
    <div>
        <router-view/>
    </div>
` 
export default {
    name : 'App',
    components : {
    } ,
    template : Template,

  }