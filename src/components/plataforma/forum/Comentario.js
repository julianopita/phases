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
        </div>
    `,
    props: ['item']
}


export default Comentario;