import Requisition from '../lib/requisitions.js';



const Comentario = {
    name : 'comentario',
    template : `
        <div id="comentario">
            <div v-for="(comentario,i) in dadoTratado" :key="i">
                <div v-for="(j,index) in comentario" :key="index">
                    <div v-if="index == 0" id="mainCom">
                        <div class="mainName">{{j.name}} </div>
                        <div class="mainBody">{{j.body}} </div>
                    </div >
                        
                    <div v-else id="answer">
                        <div class="mainName">{{j.name}} </div>
                        <div class="mainBody"> {{j.body}}</div>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="../styles/comentario.css">

        </div>
    `,
    data(){
        return {
            coment : "",
            dadoTratado : []
        }
    },
    methods : {

        get : async function() {
            var muda;
            var req = Requisition.get();
            await req.then(function (params) {
                muda = params;
            })
            this.coment = muda;
        },
        //trata os dados vindo do Get
        manipulaGet : function(getResponse) {
            var postId = 1;
            var listaComentarios = [];
            var lenComentOne = 0;
            
            //adiciona apena o primeiro comentario e resposta ao 
            // dadoTratado
            for (let index = 0; index < getResponse.length; index++) {
                if(postId == getResponse[index].postId){
                    listaComentarios.push(getResponse[index]);
                }else{
                    this.dadoTratado.push(listaComentarios);
                    break;
                }
            }

            console.log(this.dadoTratado);
            lenComentOne = listaComentarios.length;
            listaComentarios = [];
            for (lenComentOne; lenComentOne < getResponse.length; lenComentOne++){
                if(getResponse[lenComentOne].postId != postId){
                    this.dadoTratado.push(listaComentarios);
                    listaComentarios = [];
                    postId = getResponse[lenComentOne].postId;
                }
                listaComentarios.push(getResponse[lenComentOne]);
            }
            this.dadoTratado.push(listaComentarios);
            console.log(this.dadoTratado);
        }


    },
    mounted: async function(){
        await this.get();
        this.manipulaGet(this.coment);


    }
}

export default Comentario;