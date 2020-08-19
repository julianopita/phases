import Dropdown from './Dropdown.js';


const Navbar = {
    name : 'NavBar',
    template : `
        <div> 
            <div id="navbar">
                <div class="menu-item"><a href="#"> Home </a></div>
                <div class="menu-item"><a href="#"> Nomads </a></div>  
                <Dropdown title="Visitante" :items="visitante" />
            </div>         
            <link rel="stylesheet" href="./src/styles/barra_navegacao.css">
        </div>
    `,

    components : {
        Dropdown,
    },

    data(){
        return{
            visitante : [
                {
                    title : 'Cadastro',
                    link : '#'
                },
                {
                    title : 'Login',
                    link : '#'
                },
                {
                    title : 'About',
                    link : '#'
                }

            ]
        }
    }
}

export default Navbar;