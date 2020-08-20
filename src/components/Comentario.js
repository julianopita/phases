import Requisition from '../lib/requisitions.js';



const Comentario = {
    name : 'comentario',
    template : `
        <div id="comentario">
            <ul>
                <li v-for="comentario in coment">
                    {{comentario.name}}
                </li>
            <ul>

            <link rel="stylesheet" href="./src/styles/comentario.css">
        </div>
    `,
    data(){
        return {
            coment : ""
        }
    },
    methods : {

        get : async function() {
            var muda;
            var req = Requisition.get();
            await req.then(function (params) {
                muda = params;
            })
            this.coment = muda;
        }



    },
    mounted(){
        this.get();


    }
}

export default Comentario;