import Comentario from './forum/Comentario.js';
import NovoComentario from './forum/NovoComentario.js';
import socket from '../../connection/socket.js';
import axiosInstance from '../../connection/index.js';

let comments = [];

window.onload=function() {
    if (! localStorage.justOnce) {
        localStorage.setItem("justOnce", "true");
        window.location.reload();
        console.log("reloaded");
    }
};

const Forum = {
    name: 'forum',
    template: `
        <div id="forum">     
            <div class="comentario">      
                <ul>                         
                    <li v-for="(item,i) in comentarios" :key="i" v-if="matchCriteria == 'all' | matchCriteria == item.interesse && matchTag == 'all' | matchTag == item.tag">                    
                        <span class="linhasuperior"><a style="color:black;">{{item.userName}}</a>, <a style="color:red;">{{item.interesse}}</a>, iniciou uma conversa em {{item.data}} sobre <a style="color:red;">{{item.tag}}</a></span></br>
                        <span class="texto">{{item.comentario}}</span></br>
                        <span class="dados"> {{item.resposta.length}} respostas</span> 
                        <div style="margin-bottom: 5px;"> <button v-if="logged == 'true'" class="button-react" @click="like(i)"><i class="far fa-thumbs-up"></i> {{comentarios[i].likes.length}}</button> <span v-else class="button-react" style="color:grey;" title="Você deve estar logado para reagir"><i class="far fa-thumbs-up"></i><a class="button-react" style="color:grey;"> {{comentarios[i].likes.length}}</a></span>
                            <button v-if="logged == 'true'" class="button-react" @click="dislike(i)"><i class="far fa-thumbs-down"></i> {{comentarios[i].dislikes.length}}</button> <span v-else class="button-react" style="color: grey;" title="Você deve estar logado para reagir"><i class="far fa-thumbs-down"></i><a class="button-react" style="color:grey;"> {{comentarios[i].dislikes.length}}</a></span>
                            <comentario :item=item :index=i>                                                
                            </comentario>
                        </div> 
                    </li>                                 
                </ul>
            </div>                
                    <div class= "wrapper-filter">
                        <div class="filter-dropdown">
                            <select name="filter1" id="filter1" @change="filtrar">
                                <option selected id="MR" value='MR'>Mais recente</option>
                                <option value='MC'>Mais comentado</option>
                                <option value='ML'>Mais apoiado</option>
                                <option value='MD'>Menos apoiado</option>                                                               
                            </select>
                        </div>
                        <div class="filter-dropdown">                            
                            <select name="filter2" id="filter2" @change="submitUserFilter('filter2')" required>
                                <option selected id="default-filter2" value='all'>Todas atribuições</option>
                                <option value='gestor'>Gestor público</option>
                                <option value='estudante'>Estudante</option>
                                <option value='professor'>Professor</option>
                                <option value='tecnico'>Técnico</option>
                                <option value='educador'>Educador</option>                                
                            </select>                       
                        </div>
                        <div class="filter-dropdown">                            
                            <select name="filter3" id="filter3" @change="submitTagFilter('filter3')" required>
                                <option selected id="default-filter3" value='all'>Todos assuntos</option>
                                <option value='Implantacao'>Implantação</option>
                                <option value='Localizacao'>Localização</option>
                                <option value='Uso'>Uso</option>
                                <option value='Custo'>Custo</option>                                                                
                            </select>                       
                        </div>
                        <div class="filter-dropdown">                         
                            <button class="button" id="open-novo-comentario-modal" v-on:click="modal">Novo Comentário</button>                           
                        </div>
                    </div>                     
                    <div id="novo-comentario-modal" class="modal">
                        <div class="novo-comentario modal-content">
                            <textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova conversa"></textarea>
                            <div class="bloco-entradas">                
                                <span class="area-buttons">
                                    <select class="bloco-entradas" name="tag" id="tag">
                                        <option disabled selected value="undefined">selecione um assunto</option> 
                                        <option value="Implantacao">implantação</option>
                                        <option value="Localizacao">localização</option>
                                        <option value="Uso">uso</option>
                                        <option value="Custo">custo</option>
                                    </select>                                    
                                    <button id="button-submit" class="button" @click="comentar" >Enviar</button>                        
                                </span>    
                            </div>
                        </div>
                    </div>   
            <link rel="stylesheet" href="src/style/plataforma/forum.css">
            <link rel="stylesheet" href="src/style/plataforma/modal.css">
            <!--RESET button (not used)
                <div class="filter-dropdown">                            
                     <input @click="reset()" type="button" id="reset" name="filter4" value="Redefinir filtros" class="reset">
                </div>-->
        </div>
    `,
    data() {
        return {            
            cols: 20,
            rows: 3,
            showRespostas : false,
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
            filter: 'MR',            
            logged: sessionStorage.getItem('logged'),            
        }
    },

    computed: {
        itemsCount() {
            return this.item.resposta.length
        }
    },

        
    created() {        
            const idUsuario = sessionStorage.getItem('id');            
            if (idUsuario === null) {
                sessionStorage.setItem('logged',false);              
            } else {
                sessionStorage.setItem('logged',true);
            };
            
            window.onload=function() {
                if (! localStorage.justOnce) {
                    localStorage.setItem("justOnce", "true");
                    window.location.reload();
                    console.log("reloaded");
                }
            };
            
                   
    },

    methods: {
        submitUserFilter(filter) {
            let s = document.getElementById(filter).value;
            this.matchCriteria = s;
        },
        
        submitTagFilter(filter) {
            let s = document.getElementById(filter).value;
            console.log(this.matchTag);
            this.matchTag = s;
        },
                   
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

        //RESET not used   
        // reset: function() {
        //     this.matchCriteria = "all";
        //     this.matchTag = "all";
        //     document.getElementById("default-filter2").selected = true;            
        //     document.getElementById("default-filter3").selected = true;
        // },

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
                visible: true,
                respostas: []
            });
            this.comentario = '';
        },

        filtrar: async (tipo) => {            
            tipo = filter1.value;
            var dados = comments;                        

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