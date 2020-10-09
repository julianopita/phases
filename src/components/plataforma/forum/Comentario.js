import NovoComentario from './NovoComentario.js';


const Comentario = {
    name : "comentario",
    template : `
        <div class="comentario">
            <p>{{item.idUsuario}}<p>
            <p>{{item.comentario}}<p>
            <ul>
                <li v-for="(resposta,i) in item.resposta">                    
                    {{resposta}}
                </li>
            <ul>
            <novo-comentario/>
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