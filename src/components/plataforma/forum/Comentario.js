import socket from '../../../connection/socket.js';
const Comentario = {
    name : "comentario",
    template : `
    <span class="comentario">            
            <button class="button-forum" style="color:blue;" @click="showRespostas = !showRespostas" ><i class="far fa-comment"></i> ver respostas</button>
            <ul  class="respostas" v-show = "showRespostas">
                <li v-for="(resposta,i) in item.resposta">                    
                    <p class="dados">{{resposta.userName}}, <a style="color: red;">{{item.interesse}}</a>, respondeu em {{resposta.data}} às {{resposta.hora}}</br>
                    <a class="texto">{{resposta.comentario}}</a></p>                    
                </li>
                <div class="wrapper-answer"> 
                    <div v-if="logged == 'true' "class="nova-resposta">                        
                        <button id="drop-resposta" title="responder" @click="showAnswer = !showAnswer" v-bind:class = "[showAnswer ? 'dropbtn-answer clicked-answer' : 'dropbtn-answer']">Responder</button>
                        <div class="dropdown" title="Responder" id="answer" v-bind:class = "[showAnswer ? 'dropdown-open-answer' : 'dropdown-closed']">    
                            <div class="justified">
                                <textarea placeholder="responda a essa conversa" v-model="comentario"></textarea>
                                <span><button class="button-enviar-resposta" @click="responder(index)" >Enviar</button></span>
                            </div>                        
                        </div>    
                    </div>                    
                    <div v-else>
                        <p class="button-resposta" style="background-color: grey;"> Você precisa estar conectado para responder </p>
                    </div>
                </div>
            </ul>
         
</span>
    `,
    props: ['item','index'],
    data(){
        return{
            cols : 60,
            rows : 2,
            comentario : '',            
            showRespostas : false,
            showAnswer: false,
            likes : [],
            dislikes : [],
            logged : sessionStorage.getItem('logged') 
        }
    },    

    computed: {
        itemsCount() {
            return this.item.resposta.length
        }
    },
   
    methods : { 
        responder : function (index) {
            
            const interesse = sessionStorage.getItem('interesse');
            const userName = sessionStorage.getItem('userName');
            const idUsuario = sessionStorage.getItem('id');            

            const data = Date(Date.now()).split(' ');
            const dataBr = data[2]+'-'+data[1]+'-'+data[3];            
            const hora = data[4];
            

            socket.emit('resposta',{
                interesse : interesse,
                idComentario : index+1,
                idUsuario : idUsuario,
                comentario : this.comentario,
                userName : userName,
                data : dataBr,
                hora : hora
            });
            console.log(dataBr, hora);
            this.comentario = '';
        }
    },
    components : {
    }
}


export default Comentario;