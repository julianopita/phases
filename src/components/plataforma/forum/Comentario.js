import socket from '../../../connection/socket.js';

const Comentario = {
    name : "comentario",
    template : `
        <div class="comentario">

            <div class="divComentario">                
                <p class="dados">{{item.userName}} | 15 out 2020 | 4 Comentários |</p>
                <p class="texto">{{item.comentario}} frase mais comprida para ver se o que ele faz</p>
                <p><a class="interesse">Morador</a><a class="tag">Implantação</a></p>
            </div>
            
            <div class="respostas">
            <button class="hide" @click="showDiscussion">Mostrar discussão</button>  
            <ul class="respostas">            
                <li class="target" v-for="(resposta,i) in item.resposta">   
                               
                    <p class="dados">{{resposta.userName}} | 15 out 2020</p>
                    <p>{{resposta.comentario}} também comprida será que ele vai quebrar?</p>
                    
                    <p><a class="interesse">Morador</a></p>
                </li>
            </ul>
            </div>
            <div class="nova-resposta">
                <textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova conversa">
                </textarea>
                <button @click="responder(index)" >Submit</button>
            </div>
            <link rel="stylesheet" href="../../../src/style/plataforma/forum.css">
        </div>
    `,
    props: ['item','index'],
    data(){
        return{
            cols : 50,
            rows : 6,
            comentario : ''
        }
    },
    methods : {
        responder : function (index) {
            socket.emit('resposta',{
                idComentario : index+1,
                idUsuario : "4",
                comentario : this.comentario,
                userName : "Nome",
                interesse : "interesse"
            });
            this.comentario = '';
        },
        
        showDiscussion : function() {
            document.addEventListener("click",function(e) {
            if (e.target.className.match(/\bhide\b/)) {
                e.preventDefault();
                // find the related target span
                console.log(e);
                var target = e.target.parentNode.querySelector("respostas");
                console.log(target);
                // update its visibility
                target.style.display = target.style.display === "none" ? "block" : "none";
                }    
            })
        }
    },
    components : {
    }
}


export default Comentario;