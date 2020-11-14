import socket from '../../../connection/socket.js';
const Comentario = {
    name : "comentario",
    template : `
    <div class="comentario">
            
    <div class="divComentario">        
        <a v-for="(resposta,i) in item.resposta" :key="i"</a>        
        <p class="texto">{{item.comentario}}</p>
        <p class="dados">{{itemsCount}} respostas | <button class="button-forum" @click="showRespostas = !showRespostas" >ver e responder</button></p>               
        <p><a class="interesse">{{item.interesse}}</a><a class="tag">{{item.tag}}</a></p>
    </div>

    <ul class="respostas" v-show = "showRespostas">
        <li v-for="(resposta,i) in item.resposta">                    
            <p class="dados">{{resposta.userName}} | {{resposta.data}} | {{resposta.hora}}</p>
            <p class="texto">{{resposta.comentario}}</p>
            <p><a class="interesse">{{resposta.interesse}}</a></p>
        </li>   


    <div v-if="logged == 'true' "class="nova-resposta">
        <p><textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova resposta"></textarea></p>
        <p><button class="button-resposta" @click="responder(index)" >Responder</button></p>
    </div>
    <div v-else>
        <p class="button-resposta"> Você precisa estar logado para responder </p>
    </div>
    </ul>
    
</div>
    `,
    props: ['item','index'],
    data(){
        return{
            cols : 35,
            rows : 3,
            comentario : '',            
            showRespostas : false,
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
            this.comentario = '';
        }
    },
    components : {
    }
}


export default Comentario;