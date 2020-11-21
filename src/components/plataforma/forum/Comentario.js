import socket from '../../../connection/socket.js';
const Comentario = {
    name : "comentario",
    template : `
    <div class="comentario">
            
    <div class="divComentario">        
        <a v-for="(resposta,i) in item.resposta" :key="i"</a> 
        <span class="dados">{{itemsCount}} respostas</span>               
    </div>

    
    
</div>
    `,
    props: ['item','index'],
    data(){
        return{
            cols : 35,
            rows : 3,
            comentario : '',            
            showRespostas : false,
            likes : [],
            dislikes : [],
            logged : sessionStorage.getItem('logged') 
        }
    },    

    computed: {
        itemsCount() {
            return this.item.resposta.length
        }
    },
   
    methods : { 
        responder : function (index) {
            
            const interesse = sessionStorage.getItem('interesse');
            const userName = sessionStorage.getItem('userName');
            const idUsuario = sessionStorage.getItem('id');            

            const data = Date(Date.now()).split(' ');
            const dataBr = data[2]+'-'+data[1]+'-'+data[3];            
            const hora = data[4];
            

            socket.emit('resposta',{
                interesse : interesse,
                idComentario : index+1,
                idUsuario : idUsuario,
                comentario : this.comentario,
                userName : userName,
                data : dataBr,
                hora : hora
            });
            console.log(dataBr, hora);
            this.comentario = '';
        }
    },
    components : {
    }
}


export default Comentario;