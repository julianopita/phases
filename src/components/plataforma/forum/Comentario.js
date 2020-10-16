import socket from '../../../connection/socket.js';

const Comentario = {
    name : "comentario",
    template : `
        <div class="comentario">
            
            <div class="divComentario">
                <p>{{item.userName}}</p>
                <p>{{item.comentario}}</p>
                <p>{{item.data}}</p>
                <p>{{item.hora}}</p>
                <p>{{item.interesse}}</p>
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

            const userName = sessionStorage.getItem('userName');
            const idUsuario = sessionStorage.getItem('id');
            // console.log(userName);
            // console.log(idUsuario);
            // console.log(index);

            const data = Date(Date.now()).split(' ');
            const dataBr = data[2]+'/'+data[1]+'/'+data[3];
            const hora = data[4];


            socket.emit('resposta',{
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