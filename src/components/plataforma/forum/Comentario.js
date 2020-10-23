import socket from '../../../connection/socket.js';
const Comentario = {
    name : "comentario",
    template : `
    <div class="comentario">
            
    <div class="divComentario">        
        <a v-for="(resposta,i) in item.resposta" :key="i"</a>        
        <p class="texto">{{item.comentario}}</p>
        <p class="dados">{{itemsCount}} respostas | <button class="button-forum" @click="showRespostas = !showRespostas" >ver e responder</button></p>               
        <p><a class="interesse">{{item.interesse}}</a><a class="tag">{{item.tag}}</a></p>
    </div>

    <ul class="respostas" v-show = "showRespostas">
        <li v-for="(resposta,i) in item.resposta">                    
            <p class="dados">{{resposta.userName}} | {{resposta.data}} | {{resposta.hora}}</p>
            <p class="texto">{{resposta.comentario}}</p>
            <p><a class="interesse">{{resposta.interesse}}</a></p>
        </li>
    


    <div class="nova-resposta">
        <p><textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova resposta"></textarea></p>
        <p><button class="button-resposta" @click="responder(index)" >Responder</button></p>
        
    </div>
    </ul>
    
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
            dislikes : []                        
        }
    
    },
    computed: {
        itemsCount() {
            return this.item.resposta.length
        }
    },
   
    methods : {

        like : function(i){
            console.log('like no comentario : '+i);
            const idUsuario = sessionStorage.getItem('id');            
            const checkLike = this.comentarios[i].likes.includes(idUsuario);
            const checkDislike = this.comentarios[i].dislikes.includes(idUsuario);
            console.log(checkLike, checkDislike);
            console.log(this.comentarios[i].likes);

            if(checkDislike == true){

                this.comentarios[i].dislikes = this.comentarios[i].likes.filter(function(value,index,arr){
                    return value != idUsuario;
                })
                console.log(this.comentarios[i].dislikes);
            }
            if(checkLike == true){
                this.comentarios[i].likes = this.comentarios[i].likes.filter(function(value,index,arr){
                    return value != idUsuario;
                })
                console.log(this.comentarios[i].likes);

            }else{
                this.comentarios[i].likes.push(idUsuario);
                console.log('usuario adicionado(like) :'+idUsuario);
                console.log(this.comentarios[i].likes);
            }
        },

        dislike : function(i){
            console.log('dislike no comentario : '+i);
            const idUsuario = sessionStorage.getItem('id');
            const checkLike = this.comentarios[i].likes.includes(idUsuario);
            const checkDislike = this.comentarios[i].dislikes.includes(idUsuario);
            var dislike = "";

            if(checkDislike == true){

                this.comentarios[i].dislikes = this.comentarios[i].likes.filter(function(value,index,arr){
                    return value != idUsuario;
                })
                console.log(this.comentarios[i].dislikes);
            }
            if(checkLike == true){
                //  dislikes trocar nome
                this.comentarios[i].likes = this.comentarios[i].likes.filter(function(value,index,arr){
                    return value != idUsuario;
                })
                console.log(this.comentarios[i].likes);

            }else{
                this.comentarios[i].likes.push(idUsuario);
                console.log('usuario adicionado(dislike) :'+idUsuario);
                console.log(this.comentarios[i].likes);                
            }
        },  
            
              
        responder : function (index) {
            
            const interesse = sessionStorage.getItem('interesse');
            const userName = sessionStorage.getItem('userName');
            const idUsuario = sessionStorage.getItem('id');
            // console.log(userName);
            // console.log(idUsuario);
            // console.log(index);

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
            this.comentario = '';
        }
    },
    components : {
    }
}


export default Comentario;