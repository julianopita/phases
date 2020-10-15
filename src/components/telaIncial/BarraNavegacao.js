const BarraNavegacao = {
    name : 'barra-navegacao',
    template : `
        <div id="barra-navegacao">
            <div class="logo">
                <img src="../../../assets/logo.png"
                height=60px padding=10px background-color = white></img>
            </div>
            <div class="item-navegacao">
                <div class="menu-item"><a href="#"> início </a></div>
                <div class="menu-item"><a href="#"> registro </a></div>
                <div class="menu-item"><a href="#"> sobre </a></div>
                <div class="menu-item"><a href="#"> ajuda </a></div>
            </div>         
        </div>
    `,

    components : {
    },

    data(){
        return{
            visitante : [
                {
                    title : 'início',
                    link : '#'
                },
                {
                    title : 'registro',
                    link : '#'
                },
                {
                    title : 'About',
                    link : '#'
                },
                {
                    title : 'help',
                    link : '#'
                }

            ]
        }
    }
}


export default BarraNavegacao;