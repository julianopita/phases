import Comentario from './forum/Comentario.js';
import NovoComentario from './forum/NovoComentario.js';


const Forum = {
    name : 'forum',
    template : `
        <div id="forum" v-if="comentarios != null">
            <div class="forumName">
                 F O R U M
            </div>
            
            <div class="forumArea">
                <li v-for="(item,i) in comentarios.data" :key="i" >
                    <comentario :item=item />
                </li>
            </div>
            <div class="comentarioForum">
                <novo-comentario :cols=cols :rows=rows />
            </div>
        </div>
    `,
    data(){
        return {
            cols : 60,
            rows : 5,
            comentarios : null
        }
    },
    methods: {
        getComentarios : async function(){
            await axios
            .get("http://localhost:2000/comentario/list")
            .then(response => (this.comentarios = response.data));
            console.log(this.comentarios)

        }
    },
    created(){
        this.getComentarios();
    },
    components : {
        Comentario, NovoComentario
    }
}


export default Forum;