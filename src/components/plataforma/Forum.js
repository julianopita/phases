import Comentario from './forum/Comentario.js';
import NovoComentario from './forum/NovoComentario.js';
import socket from '../../connection/socket.js';
import axiosInstance from  '../../connection/index.js';

const Forum = {
    name : 'forum',
    template : `
        <div id="forum">
            <ul class="containerForum">
                <li v-for="(item,i) in comentarios" :key="i">
                    <comentario :item=item :index=i >
                    </comentario>
                </li>
            </ul>

            <div class="novo-comentario">
                <textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova conversa">
                </textarea>
                <label for="tag">Selecione o assunto do comentário:</label>
                    <select name="tag" id="tag">
                        <option value="Implantacao">Implantação</option>
                        <option value="Localização">Localização</option>
                        <option value="Uso">Uso</option>
                        <option value="Custo">Custo</option>
                    </select>
                <button @click="comentar" >Submit</button>
            </div>


            <link rel="stylesheet" href="src/style/plataforma/forum.css">
        </div>
    `,
    data(){
        return {
            cols : 54,
            rows : 5,            
            comentarios : [],
            comentario : '',
        }
    },
    methods: {

        comentar : async function() {
            const interesse = sessionStorage.getItem('interesse');
            const userName = sessionStorage.getItem('userName');
            const idUsuario = sessionStorage.getItem('id');            
            console.log(userName,idUsuario, tag.value);

            const data = Date(Date.now()).split(' ');
            const dataBr = data[2]+'-'+data[1]+'-'+data[3];
            const hora = data[4];

            await socket.emit('comentar',{
                interesse : interesse,
                data : dataBr,
                hora : hora,
                userName : userName,
                comentario : this.comentario,
                idUsuario : idUsuario,
                tag : tag.value,
                respostas : []
            });
            this.comentario = '';
        },
    },
    mounted: async function(){

        await axiosInstance.get('/comentario/list')
        .then((response)=>{
            this.comentarios = response.data;
        })

        await socket.on('listComentariosInicial',(data)=>{
            this.comentarios = data;
        })
    },
    components : {
        Comentario, NovoComentario
    }
}


export default Forum;