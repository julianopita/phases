const BarraNavegacao = {
    name : 'barra-navegacao',
    template : `
        <div id="barra-navegacao">
            <div class="logo">
                <img class="img" src="../../../assets/logo.png"></img>
            </div>
            <div class="item-navegacao">
                <div class="menu-item"><a href="/"> início </a></div>
                <div class="menu-item"><a href="#/"> registro </a></div>
                <!--<div class="menu-item"><a href="#"> sobre </a></div>
                <div class="menu-item"><a href="#"> ajuda </a></div>-->
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
                    link : '../principal/index.html'
                },
                {
                    title : 'registro',
                    link : 'index.html'
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