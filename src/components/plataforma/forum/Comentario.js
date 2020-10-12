import socket from '../../../connection/socket.js';

const Comentario = {
    name : "comentario",
    template : `
        <div class="comentario">

            <div class="divComentario">
                {{index}}
                <p>{{item.userName}}</p>
                <p>{{item.comentario}}</p>
            </div>

            <ul class="respostas">
                <li v-for="(resposta,i) in item.resposta">                    
                    <p>{{resposta.userName}}</p>
                    <p>{{resposta.comentario}}</p>
                </li>
            </ul>
            <div class="nova-resposta">
                <textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova conversa">
                </textarea>
                <button @click="responder(index)" >Submit</button>
            </div>
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
                idUsuario : '4',
                comentario : this.comentario,
                userName : 'Victor'
            });
            this.comentario = '';
        }
    },
    components : {
    }
}


export default Comentario;