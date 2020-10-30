// import TelaCadastro from './components/TelaCadastro.js'
// import TelaLogin from './components/TelaLogin.js';
// import Plataforma from './components/plataforma/Plataforma.js'


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
    beforeDestroy(){
        sessionStorage.clear();
    }

  }