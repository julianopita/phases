import socket from "../../../connection/socket.js";

const NovoComentario = {
    name : 'novo-comentario',
    template : `
        <div class="novo-comentario" id="novoComentario">
            <textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova conversa">
            </textarea>
            <button @click="comentar" >Submit</button>                    
        </div>
    `,
    props : ['cols','rows','comentar'],
    data(){
        return{
            comentario : ''            
        }
    },
    methods : {
        // comentar : async function() {
        //     await socket.emit('comentar',{
        //         userName : "Victor",
        //         comentario : this.comentario,
        //         idUsuario : "4",
        //         respostas : []
        //     });
        //     this.comentario = null;
        // }
    }
}


export default NovoComentario;