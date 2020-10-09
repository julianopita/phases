import Comentario from './forum/Comentario.js';
import NovoComentario from './forum/NovoComentario.js';
import axiosInstance from '../../connection/index.js';

const Forum = {
    name : 'forum',
    template : `
        <div id="forum">
            <ul>
                <li v-for="(item,i) in comentarios" :key="i">
                    <p>{{item.comentario}}</p>
                </li>
            </ul>
        </div>
    `,
    data(){
        return {
            cols : 60,
            rows : 5,
            comentarios : ''
        }
    },
    methods: {
        getComentarios : async function(){
            await axiosInstance
            .get("/comentario/list")
            .then(response => (this.comentarios = response.data));
            console.log(this.comentarios);

        }
    },
    mounted(){
        this.getComentarios();
    },
    components : {
        Comentario, NovoComentario
    }
}


export default Forum;