const NovoComentario = {
    name : 'novo-comentario',
    template : `
        <div id="novoComentario">
            <textarea  :cols=cols :rows=rows placeholder="Comente Aqui!">
            </textarea>
            <button><img src="assets/setaBranca.png" /></button>
        </div>
    `,
    props : ['cols','rows'],
    data(){
        return{
        }
    }
}


export default NovoComentario;