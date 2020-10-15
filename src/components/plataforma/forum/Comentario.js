import socket from '../../../connection/socket.js';

const Comentario = {
    name : "comentario",
    template : `
        <div class="comentario">

            <div class="divComentario">                
                <p class="dados">{{item.userName}} | 15 out 2020 | 4 Comentários</p>
                <p class="texto">{{item.comentario}}</p>
                <p><a class="interesse">Morador</a><a class="tag">Implantação</a></p>
            </div>

            <ul class="respostas">
                <li v-for="(resposta,i) in item.resposta">                    
                    <p>{{resposta.userName}}</p>
                    <p>{{resposta.comentario}}</p>
                    <p>{{resposta.interesse}}</p>
                </li>
            </ul>
            <div class="nova-resposta">
                <textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova conversa">
                </textarea>
                <button @click="responder(index)" >Submit</button>
            </div>
            <link rel="stylesheet" href="../../../src/style/plataforma/forum.css">
        </div>
    `,
    props: ['item','index'],
    data(){
        return{
            cols : 50,
            rows : 6,
            comentario : ''
        }
    },
    methods : {
        responder : function (index) {
            socket.emit('resposta',{
                idComentario : index+1,
                idUsuario : "4",
                comentario : this.comentario,
                userName : "Nome",
                interesse : "interesse"
            });
            this.comentario = '';
        }
    },
    components : {
    }
}


export default Comentario;