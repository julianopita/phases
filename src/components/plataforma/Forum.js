import Comentario from './forum/Comentario.js';



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
        </div>
    `,
    data(){
        return {
            comentarios : null
        }
    },
    methods: {
        getComentarios : async function(){
            await axios
            .get("https://projetos.descubra.net.br/bimnomads/busca_msg.php")
            .then(response => (this.comentarios = response));
            console.log(this.comentarios)

        }
    },
    created(){
        this.getComentarios();
    },
    components : {
        Comentario
    }
}


export default Forum;