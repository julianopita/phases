const BarraNavegacao = {
    name : 'barra-navegacao',
    template : `
        <div id="barra-navegacao"> 
            <div class="item-navegacao">
                <div class="menu-item"><a href="#"> U S U A R I O </a></div>
                <div class="menu-item"><a href="#"> N O M A D S </a></div>
                <div class="menu-item"><a href="#"> S O B R E </a></div>
            </div>         
        </div>
    `,

    components : {
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


export default BarraNavegacao;