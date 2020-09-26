import TelaCadastro from './components/TelaCadastro.js'
import TelaLogin from './components/TelaLogin.js';
import Plataforma from './components/plataforma/Plataforma.js'
const Template = `
    <div>
        <plataforma/>
    </div>
` 
export default {
    name : 'App',
    components : {
        TelaCadastro,TelaLogin,
        Plataforma
    } ,
    template : Template
  }