
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
                <div class="menu-item"  title="Abre uma nova aba de ajuda"><a id="trigger_modal" v-on:click="modal(this)"> ajuda </a></div>
                              
               <!--<div id="cont_modal" class="modal">
                cont_modal_content
                    <div class="modal-content">
                        <span class="close" id="close_modal">&times;</span>
                        <p> teste </p>
                    </div>
                </div> 
                <div class="menu-item"><a href="#"> sobre </a></div>-->
            </div> 
            <!-- cont_modal -->
           
        </div>        
    `,

    components : {
    },

    methods : {
        modal(obj){
            console.log("modal");
            window.open("./help.html");
        }


        // modal(obj) { 
        //     var btn = document.getElementById("trigger_modal");           
        //     var modal = document.getElementById("cont_modal");
        //     var span = document.getElementById("close_modal");
            
        //     btn.onclick = function(){
        //         modal.style.visibility = "visible";
        //     }
        //     span.onclick = function(){
        //         modal.style.visibility = "hidden";
        //     }

        //     window.onclick = function (event) {
        //         if (event.target == modal) {
        //             modal.style.visibility = "hidden";
        //         }
        //     }

            

        // }

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