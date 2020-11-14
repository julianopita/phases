import Comentario from './forum/Comentario.js';
import NovoComentario from './forum/NovoComentario.js';
import socket from '../../connection/socket.js';
import axiosInstance from '../../connection/index.js';

let comments = [];


const Forum = {
    name: 'forum',
    template: `
        <div id="forum">
            <div class="comentario">      
                <ul>
                    <li v-for="(item,i) in comentarios" :key="i" v-if="matchCriteria == 'all' | matchCriteria == item.interesse && matchTag == 'all' | matchTag == item.tag">                    

                        <p class="linhasuperior">{{item.userName}} | {{item.data}} | {{item.tag}} | {{item.interesse}} |
                        <button v-if="logged == 'true'" style="color:blue;" class="button-react" @click="like(i)">apoio</button> <span v-else title="Você deve estar logado para reagir">apoio</span> {{comentarios[i].likes.length}} |
                        <button v-if="logged == 'true'" style="color:blue;" class="button-react" @click="dislike(i)">não apoio</button> <span v-else title="Você deve estar logado para reagir">não apoio</span> {{comentarios[i].dislikes.length}} 
                        </p>
                        <comentario :item=item :index=i>                    
                        </comentario>
                    </li>
                
                </ul>
            </div>
                <button id="open-novo-comentario-modal" v-on:click="modal">Novo Comentário</button>
                    <div id="novo-comentario-modal" class="modal">
                        <div class="novo-comentario modal-content">
                            <textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova conversa"></textarea>
                            <div class="bloco-entradas">                
                                <span class="area-buttons">
                                    <select class="bloco-entradas" name="tag" id="tag">
                                        <option value disabled selected value="undefined">selecione um assunto</option> 
                                        <option value="Implantacao">implantação</option>
                                        <option value="Localizacao">localização</option>
                                        <option value="Uso">uso</option>
                                        <option value="Custo">custo</option>
                                    </select>                                    
                                    <button id="button-submit" class="button-submit" @click="comentar" >Enviar</button>                        
                                    <span class="modal-close"></span>
                                &times;</span>
                            </div>
                        </div>
                    </div>
                    <div class= "wrapper-filter">          
                    <div>                
                        <button type="button" @click="showFilters = !showFilters" v-bind:class = "[showFilters ? 'dropbtn clicked' : 'dropbtn']">Filtros
                            <i v-bind:class = "[showFilters ? 'fa fa-chevron-down fa-rotate-180' : 'fa fa-chevron-down']"></i>
                        </button>
                    </div>            
                    <div class="dropdown" id="filtros" v-show = "showFilters" v-bind:class = "[showFilters ? 'dropdown-open-filter' : 'dropdown-closed']">
                        <div class="radio">
                            <span> Ordenar por tempo e popularidade: </br></span>
                            <input @click="filtrar('MR')" type="radio" id="MR" name="filter" value="MR">
                            <label for="MR">Mais Recente</label>
                            
                            <input @click="filtrar('MC')" type="radio" id="MC"  name="filter"value="MC">
                            <label for="MC">Mais Comentado</label>
                            
                            <input @click="filtrar('ML')" type="radio" id="ML" name="filter" value="ML">
                            <label for="ML">Mais Curtido</label>
    
                            <input @click="filtrar('MD')" type="radio" id="MD" name="filter" value="MD">
                            <label for="MD">Menos Curtido</label>
                        </div>
                        <div class="radio">
                            <span> Filtrar por usuário: </br></span>
    
                            <input @click="matchCriteria = 'gestor'" type="radio" id="gestorpublico" name="filter2" value="gestorpublico">
                            <label for="gestorpublico">Gestor público</label>
                            
                            <input @click="matchCriteria = 'estudante'" type="radio" id="estudante" name="filter2" value="estudante">
                            <label for="estudante">Estudante</label>
                                                
                            <input @click="matchCriteria = 'professor'" type="radio" id="professor"  name="filter2" value="professor">
                            <label for="professor">Professor</label>
                            
                            <input @click="matchCriteria = 'tecnico'" type="radio" id="tecnico" name="filter2" value="tecnico">
                            <label for="tecnico">Técnico</label>
    
                            <input @click="matchCriteria = 'educador'" type="radio" id="educador" name="filter2" value="educador">
                            <label for="educador">Educador</label>                        
                        </div>
                        <div class="radio">
                            <span> Filtrar por assunto: </br></span>
                            <input @click="matchTag = 'Implantacao'" type="radio" id="implantacao" name="filter3" value="implantacao">
                            <label for="implantacao">Implantação</label>
                            
                            <input @click="matchTag = 'Localização'" type="radio" id="localizacao"  name="filter3" value="localizacao">
                            <label for="localizacao">Localização</label>
                            
                            <input @click="matchTag = 'Uso'" type="radio" id="uso" name="filter3" value="uso">
                            <label for="uso">Uso</label>
    
                            <input @click="matchTag = 'Custo'" type="radio" id="custo" name="filter3" value="custo">
                            <label for="custo">Custo</label>
                        </div>
                        <div class="radio">
                            <span></br></span>
                            <input @click="matchCriteria = 'all'; matchTag = 'all'; reset()" type="button" id="reset" name="filter4" value="Redefinir filtros" class="reset">
                        </div>
                    </div>
                </div>    
            <link rel="stylesheet" href="src/style/plataforma/forum.css">
            <link rel="stylesheet" href="src/style/plataforma/modal.css">
        </div>
    `,
    data() {
        return {
            cols: 20,
            rows: 3,
            comentarios: [],
            comentario: '',
            filterInterest: [],
            likes: [],
            dislikes: [],
            tag: '',
            quantidadeLikes: [],
            showFilters: false,
            matchCriteria: 'all',
            matchTag: 'all',
            logged: sessionStorage.getItem('logged'),            
        }
    },
    
    created() {        
            const idUsuario = sessionStorage.getItem('id');            
            if (idUsuario === null) {
                sessionStorage.setItem('logged',false);              
            } else {
                sessionStorage.setItem('logged',true);
            }
                   
    },

    methods: {   
                   
        modal(){            
            const modal = document.getElementById("novo-comentario-modal");
            const btnModal = document.getElementById("open-novo-comentario-modal");
            const btnSubmit = document.getElementById("button-submit");
            const span = document.getElementsByClassName("modal-close");
                
                btnModal.onclick = function() {                    
                    if (sessionStorage.getItem('logged') == 'true') {
                        modal.style.display = "block";
                    } else {
                        alert("Você precisa estar logado para comentar");
                    }
                }
                btnSubmit.onclick = function() {
                    modal.style.display = "none";
                    console.log("clicked");
                }
                span.onclick = function() {
                    modal.style.display = "none";                
                }
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            },
        reset: function() {
            var ele = document.querySelectorAll('[name="filter2"],[name="filter3"]');
                for(var i=0;i<ele.length;i++)
                    ele[i].checked = false;
        },

        like: function (i) {
            console.log('like no comentario : ' + i);
            const idUsuario = sessionStorage.getItem('id');
            const checkLike = this.comentarios[i].likes.includes(idUsuario);
            const checkDislike = this.comentarios[i].dislikes.includes(idUsuario);
            
            if (checkDislike == true) {

                this.comentarios[i].dislikes = this.comentarios[i].dislikes.filter(function (value, index, arr) {
                    return value != idUsuario;
                })
                console.log(this.comentarios[i].dislikes);
            }
            if (checkLike == true) {
                this.comentarios[i].likes = this.comentarios[i].likes.filter(function (value, index, arr) {
                    return value != idUsuario;
                })
                console.log(this.comentarios[i].likes);

            } else {
                this.comentarios[i].likes.push(idUsuario);
            }


            const likes = this.comentarios[i].likes;
            const dislikes = this.comentarios[i].dislikes;            
            const objLikes = {
                idComentario: i,
                likes: likes,
                dislikes: dislikes
            }            
            socket.emit('reacoes', objLikes);
        },

        dislike: function (i) {            
            const idUsuario = sessionStorage.getItem('id');
            const checkLike = this.comentarios[i].likes.includes(idUsuario);
            const checkDislike = this.comentarios[i].dislikes.includes(idUsuario);
            var dislike = "";

            if (checkLike == true) {
                this.comentarios[i].likes = this.comentarios[i].likes.filter(function (value, index, arr) {
                    return value != idUsuario;
                })
            }
            if (checkDislike == true) {                
                this.comentarios[i].dislikes = this.comentarios[i].dislikes.filter(function (value, index, arr) {
                    return value != idUsuario;
                })
            } else {
                this.comentarios[i].dislikes.push(idUsuario);
            }
            const likes = this.comentarios[i].likes;
            const dislikes = this.comentarios[i].dislikes;            
            const objLikes = {
                idComentario: i,
                likes: likes,
                dislikes: dislikes
            }            
            socket.emit('reacoes', objLikes);
        },


        comentar: async function () {
            const interesse = sessionStorage.getItem('interesse');
            const userName = sessionStorage.getItem('userName');
            const idUsuario = sessionStorage.getItem('id');            

            const data = Date(Date.now()).split(' ');
            const dataBr = data[2] + '-' + data[1] + '-' + data[3];
            const hora = data[4];
            const like = 0;

            await socket.emit('comentar', {
                interesse: interesse,
                likes: [],
                dislikes: [],
                data: dataBr,
                hora: hora,
                userName: userName,
                comentario: this.comentario,
                idUsuario: idUsuario,
                tag: tag.value,
                respostas: []
            });
            this.comentario = '';
        },

        filtrar: async (tipo) => {
            var dados = comments;

            console.log(tipo);            

            /*
          MR- Mais Recente | MC- Mais Comentado | ML- Mais Curtido | MD- Menos Curtido
        */

            //reordenar comentarios
            switch (tipo) {
                case "MR":
                    dados.sort(function (a, b) {
                        if (a.idComentario < b.idComentario) {
                            return 1;
                        }
                        if (a.idComentario > b.idComentario) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "MC":
                    dados.sort(function (a, b) {
                        if (a.resposta < b.resposta) {
                            return 1;
                        }
                        if (a.resposta > b.resposta) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "ML":
                    dados.sort(function (a, b) {
                        if (a.likes < b.likes) {
                            return 1;
                        }
                        if (a.likes > b.likes) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "MD":
                    dados.sort(function (a, b) {
                        if (a.dislikes < b.dislikes) {
                            return 1;
                        }
                        if (a.dislikes > b.dislikes) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                }
        },

        Mudarestado: (el) => {
            var display = document.getElementById(el).style.display;
            if (display == "none")
                document.getElementById(el).style.display = 'block';
            else
                document.getElementById(el).style.display = 'none';
        }
    },
    mounted: async function () {

        await axiosInstance.get('/comentario/list')
            .then((response) => {
                this.comentarios = response.data;
            })

        await socket.on('listComentariosInicial', (data) => {
            this.comentarios = data;
            comments = this.comentarios;
        });
        this.modal()
    },   

    components: {
        Comentario,
        NovoComentario
    }


}



export default Forum;