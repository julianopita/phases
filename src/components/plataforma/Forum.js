import Comentario from './forum/Comentario.js';
import NovoComentario from './forum/NovoComentario.js';
import socket from '../../connection/socket.js';
import axiosInstance from  '../../connection/index.js';


const Forum = {
    name : 'forum',
    template : `
        <div id="forum">

            <!--<div id="v-model-multiple-checkboxes">
                <input type="checkbox" id="ju" value=true @change="" v-model="filterInterest"/>
                <label for="ju">Ju</label>
                <input type="checkbox" id="noju" value="NoJu" v-model="filterInterest"/>
                <label for="noju">No Ju</label>
                <span> Filtro ativo: {{filterInterest}}</span>
            </div>-->
            <div class="comentario">      
            <ul>
                <li v-for="(item,i) in comentarios" :key="i">                   

                    <p class="linhasuperior">{{item.userName}} | {{item.data}} | 
                    <button class="button-react" @click="like(i)">apoio</button>{{comentarios[i].likes.length}} |
                    <button class="button-react" @click="dislike(i)">não apoio</button>{{comentarios[i].dislikes.length}} 
                    </p>
                    
                    <comentario :item=item :index=i>                    
                    </comentario>                 
                </li>
            </ul>
            </div>
            <div class="novo-comentario">
                <textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova conversa"></textarea>
                <div class="bloco-entradas">                
                    <span class="area-buttons"><select class="bloco-entradas" name="tag" id="tag">
                        <option value disabled selected value="undefined">selecione um assunto</option> 
                        <option value="Implantacao">implantação</option>
                        <option value="Localização">localização</option>
                        <option value="Uso">uso</option>
                        <option value="Custo">custo</option>
                    </select>
                    <button class="button-submit" @click="comentar" >Enviar</button></span>
                </div>
                
            </div>


            <link rel="stylesheet" href="src/style/plataforma/forum.css">
        </div>
    `,
    data(){
        return {
            cols : 20,
            rows : 3,            
            comentarios : [],
            comentario : '',
            filterInterest: [],
            likes : [],
            dislikes : [],
            tag: '',
            quantidadeLikes : []
        }
    },
    //computed: {
    //    reactLikeCount() {
    //        return this.item.like.length
    //    },
    //    reactDislikeCount() {
    //        return this.item.like.length
    //    }
    //},

    methods: {
        
        like : function(i){
            console.log('like no comentario : '+i);
            const idUsuario = sessionStorage.getItem('id');            
            const checkLike = this.comentarios[i].likes.includes(idUsuario);
            const checkDislike = this.comentarios[i].dislikes.includes(idUsuario);
            // console.log(checkLike, checkDislike);
            // console.log(this.comentarios[i].likes);

            if(checkDislike == true){

                this.comentarios[i].dislikes = this.comentarios[i].dislikes.filter(function(value,index,arr){
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
            }


            const likes = this.comentarios[i].likes;
            const dislikes = this.comentarios[i].dislikes; 
            console.log(idUsuario);
            const objLikes = {
                idComentario : i,
                likes: likes,
                dislikes : dislikes
            }
            console.log(objLikes);
            socket.emit('reacoes',objLikes);
        },

        dislike : function(i){
            console.log('dislike no comentario : '+i);
            const idUsuario = sessionStorage.getItem('id');
            const checkLike = this.comentarios[i].likes.includes(idUsuario);
            const checkDislike = this.comentarios[i].dislikes.includes(idUsuario);
            var dislike = "";

            if(checkLike == true){

                this.comentarios[i].likes = this.comentarios[i].likes.filter(function(value,index,arr){
                    return value != idUsuario;
                })
            }
            if(checkDislike == true){
                //  dislikes trocar nome
                this.comentarios[i].dislikes = this.comentarios[i].dislikes.filter(function(value,index,arr){
                    return value != idUsuario;
                })
            }else{
                this.comentarios[i].dislikes.push(idUsuario);
            } 
            const likes = this.comentarios[i].likes;
            const dislikes = this.comentarios[i].dislikes; 
            console.log(idUsuario);
            const objLikes = {
                idComentario : i,
                likes: likes,
                dislikes : dislikes
            }
            console.log(objLikes);
            socket.emit('reacoes',objLikes);
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