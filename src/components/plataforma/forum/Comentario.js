import NovoComentario from './NovoComentario.js';


const Comentario = {
    name : "comentario",
    template : `
        <div class="comentario">
            {{index}}
            <p>{{item.userName}}</p>
            <p>{{item.comentario}}</p>
            <ul>
                <li v-for="(resposta,i) in item.resposta">                    
                    <p>{{resposta.userName}}</p>
                    <p>{{resposta.comentario}}</p>
                </li>
            </ul>
        </div>
    `,
    props: ['item','index'],
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