import Comentario from './forum/Comentario.js';
import NovoComentario from './forum/NovoComentario.js';
import socket from '../../connection/socket.js';
import axiosInstance from  '../../connection/index.js';

const Forum = {
    name : 'forum',
    template : `
        <div id="forum">
            <div id="v-model-multiple-checkboxes">
            <input type="checkbox" id="ju" value=true @change="" v-model="filterInterest"/>
                <label for="ju">Ju</label>
            <input type="checkbox" id="noju" value="NoJu" v-model="filterInterest"/>
                <label for="noju">No Ju</label>
            <span> Filtro ativo: {{filterInterest}}</span>
            </div>
                  
            <ul class="containerForum">
                <li v-for="(item,i) in comentarios" :key="i">
                    <comentario :item=item :index=i >                    
                    </comentario> <span><button class="button-react" @click="like(i)">apoio</button><button class="button-react" @click="dislike(i)">não apoio</button></span>                   
                </li>
            </ul>

            <div class="novo-comentario">
                <textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova conversa">
                </textarea>
                <label for="tag">Selecione o assunto do comentário:</label>
                    <select name="tag" id="tag">
                        <option value="Implantacao">Implantação</option>
                        <option value="Localização">Localização</option>
                        <option value="Uso">Uso</option>
                        <option value="Custo">Custo</option>
                    </select>
                <button @click="comentar" >Submit</button>
            </div>


            <link rel="stylesheet" href="src/style/plataforma/forum.css">
        </div>
    `,
    data(){
        return {
            cols : 54,
            rows : 5,            
            comentarios : [],
            comentario : '',
            filterInterest: [],
            likes : [],
            dislikes : [],
            tag: ''
        }
    },
    methods: {
        
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
        

        comentar : async function() {
            const interesse = sessionStorage.getItem('interesse');
            const userName = sessionStorage.getItem('userName');
            const idUsuario = sessionStorage.getItem('id');            
            console.log(userName,idUsuario, tag.value);

            const data = Date(Date.now()).split(' ');
            const dataBr = data[2]+'-'+data[1]+'-'+data[3];
            const hora = data[4];
            const like = 0;
            
            await socket.emit('comentar',{
                interesse : interesse,
                likes : [],
                dislikes : [],                               
                data : dataBr,
                hora : hora,
                userName : userName,
                comentario : this.comentario,
                idUsuario : idUsuario,
                tag : tag.value,
                respostas : []
            });
            this.comentario = '';
        }
    },
    
    mounted: async function(){

        await axiosInstance.get('/comentario/list')
        .then((response)=>{
            this.comentarios = response.data;
        })

        await socket.on('listComentariosInicial',(data)=>{
            this.comentarios = data;
        });       
        
    },
    components : {
        Comentario, NovoComentario
    }

    
}



export default Forum;