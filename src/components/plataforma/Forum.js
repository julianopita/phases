import Comentario from './forum/Comentario.js';
import NovoComentario from './forum/NovoComentario.js';
import axiosInstance from '../../connection/index.js';

const Forum = {
    name : 'forum',
    template : `
        <div id="forum">
            <ul>
                <li v-for="(item,i) in comentarios" :key="i">
                    <comentario :item=item :index=i >
                    </comentario>
                </li>
            </ul>
            <input v-model="novo_comentario" ></input>
            <button @click="postComentario" >botao</button>
            {{novo_comentario}}
            <link rel="stylesheet" href="src/style/plataforma/forum.css">
        </div>
    `,
    data(){
        return {
            cols : 60,
            rows : 5,
            comentarios : [],
            novo_comentario : '',
        }
    },
    methods: {
        getComentarios : async function(){
            await axiosInstance
            .get("/comentario/list")
            .then(response => (this.comentarios = response.data))
            .catch((err)=>{
                console.log({getComentarios : err});
            });

        },
        postComentario : async function(){
            await axiosInstance
            .post("/comentario/cadastro",{
                userName : 'Victor',
                comentario : this.novo_comentario,
                idUsuario : 'asdasdsad'

            })
            .then(response =>{
                this.comentarios.push({
                    userName : 'Victor',
                    comentario : this.novo_comentario,
                    idUsuario : 'asdasdsad',
                    idComentario : response.data.idComentario
                })
            })
            .catch((err)=>{
                console.log({postComentarios : err});
            });
            console.log(this.comentarios);
        }
    },
    mounted: async function(){
        await this.getComentarios();
        console.log(this.comentarios);
    },
    components : {
        Comentario, NovoComentario
    }
}


export default Forum;