import NovoComentario from './NovoComentario.js';


const Comentario = {
    name : "comentario",
    template : `
        <div class="comentario">
            <div class="perfil">
                <span>{{item.user_name}}</span>
            </div>
            <div class="texto">
                {{item.discussion}}
            </div>
            <div class="respostas">
                <novo-comentario :cols=cols :rows=rows />
            </div>
        </div>
    `,
    props: ['item'],
    data(){
        return{
            cols : 50,
            rows : 6,
        }
    },
    components : {
        NovoComentario
    }
}


export default Comentario;