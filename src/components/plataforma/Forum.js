import Comentario from './forum/Comentario.js';
import NovoComentario from './forum/NovoComentario.js';
import socket from '../../connection/socket.js';
import axiosInstance from '../../connection/index.js';

let comments = [];

const Forum = {
    name: 'forum',
    template: `
        <div id="forum">

            <!--<div id="v-model-multiple-checkboxes">
                <input type="checkbox" id="ju" value=true @change="" v-model="filterInterest"/>
                <label for="ju">Ju</label>
                <input type="checkbox" id="noju" value="NoJu" v-model="filterInterest"/>
                <label for="noju">No Ju</label>
                <span> Filtro ativo: {{filterInterest}}</span>
            </div>-->
            
            <div>

                <label> Filtros </label>
                <button type="button" @click="Mudarestado('filtros')">Mostrar / Esconder</button>

            </div>
            <div class="filtros" id="filtros" style="display: none">

                <div>
                    <input @click="filtrar('MR')" type="radio" id="MR" name="filter" value="MR">
                    <label for="MR">Mais Recente</label>
                    
                    <input @click="filtrar('MC')" type="radio" id="MC"  name="filter"value="MC">
                    <label for="MC">Mais Comentado</label>
                    
                    <input @click="filtrar('ML')" type="radio" id="ML" name="filter" value="ML">
                    <label for="ML">Mais Curtido</label>

                    <input @click="filtrar('MD')" type="radio" id="MD" name="filter" value="MD">
                    <label for="MD">Menos Curtido</label>
                </div>

                <div>
                    <input @click="filtrar('estudante')" type="radio" id="estudante" name="filter2" value="estudante">
                    <label for="estudante">Estudante</label>
                    
                    <input @click="filtrar('professor')" type="radio" id="professor"  name="filter2"value="professor">
                    <label for="professor">Professor</label>
                    
                    <input @click="filtrar('tecnico')" type="radio" id="tecnico" name="filter2" value="tecnico">
                    <label for="tecnico">Técnico</label>

                    <input @click="filtrar('educador')" type="radio" id="educador" name="filter2" value="educador">
                    <label for="educador">Educador</label>

                    <input @click="filtrar('gestorpublico')" type="radio" id="gestorpublico" name="filter2" value="gestorpublico">
                    <label for="gestorpublico">Gestor Público</label>
                </div>

                <div>
                    <input @click="filtrar('Implantacao')" type="radio" id="Implantacao" name="filter3" value="Implantacao">
                    <label for="Implantacao">Implantação</label>
                    
                    <input @click="filtrar('localizacao')" type="radio" id="localizacao"  name="filter3"value="localizacao">
                    <label for="localizacao">Localização</label>
                    
                    <input @click="filtrar('uso')" type="radio" id="uso" name="filter3" value="uso">
                    <label for="uso">Uso</label>

                    <input @click="filtrar('custo')" type="radio" id="custo" name="filter3" value="custo">
                    <label for="custo">Custo</label>


                </div>

            </div>

            

            <div class="filtros3" id="filtros3" style="display: none">

            <input @click="filtrar('MR')" type="radio" id="MR" name="filter" value="MR" checked>
            <label for="MR">Mais Recente</label>
            
            <input @click="filtrar('MC')" type="radio" id="MC"  name="filter"value="MC">
            <label for="MC">Mais Comentado</label>
            
            <input @click="filtrar('ML')" type="radio" id="ML" name="filter" value="ML">
            <label for="ML">Mais Curtido</label>

            <input @click="filtrar('MD')" type="radio" id="MD" name="filter" value="MD">
            <label for="MD">Menos Curtido</label>
        
        </div>

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
            quantidadeLikes: []
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

        like: function (i) {
            console.log('like no comentario : ' + i);
            const idUsuario = sessionStorage.getItem('id');
            const checkLike = this.comentarios[i].likes.includes(idUsuario);
            const checkDislike = this.comentarios[i].dislikes.includes(idUsuario);
            // console.log(checkLike, checkDislike);
            // console.log(this.comentarios[i].likes);

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
            console.log(idUsuario);
            const objLikes = {
                idComentario: i,
                likes: likes,
                dislikes: dislikes
            }
            console.log(objLikes);
            socket.emit('reacoes', objLikes);
        },

        dislike: function (i) {
            console.log('dislike no comentario : ' + i);
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
                //  dislikes trocar nome
                this.comentarios[i].dislikes = this.comentarios[i].dislikes.filter(function (value, index, arr) {
                    return value != idUsuario;
                })
            } else {
                this.comentarios[i].dislikes.push(idUsuario);
            }
            const likes = this.comentarios[i].likes;
            const dislikes = this.comentarios[i].dislikes;
            console.log(idUsuario);
            const objLikes = {
                idComentario: i,
                likes: likes,
                dislikes: dislikes
            }
            console.log(objLikes);
            socket.emit('reacoes', objLikes);
        },


        comentar: async function () {
            const interesse = sessionStorage.getItem('interesse');
            const userName = sessionStorage.getItem('userName');
            const idUsuario = sessionStorage.getItem('id');
            console.log(userName, idUsuario, tag.value);

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
            const dados = comments;

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
                case "estudante":
                    dados.sort(function (a, b) {
                        if (a.interesse.includes(tipo) < b.interesse.includes(tipo)) {
                            return 1;
                        }
                        if (a.interesse.includes(tipo) > b.interesse.includes(tipo)) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "professor":
                    dados.sort(function (a, b) {
                        if (a.interesse.includes(tipo) < b.interesse.includes(tipo)) {
                            return 1;
                        }
                        if (a.interesse.includes(tipo) > b.interesse.includes(tipo)) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "tecnico":
                    dados.sort(function (a, b) {
                        if (a.interesse.includes(tipo) < b.interesse.includes(tipo)) {
                            return 1;
                        }
                        if (a.interesse.includes(tipo) > b.interesse.includes(tipo)) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "educador":
                    dados.sort(function (a, b) {
                        if (a.interesse.includes(tipo) < b.interesse.includes(tipo)) {
                            return 1;
                        }
                        if (a.interesse.includes(tipo) > b.interesse.includes(tipo)) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "gestorpublico":
                    dados.sort(function (a, b) {
                        if (a.interesse.includes(tipo) < b.interesse.includes(tipo)) {
                            return 1;
                        }
                        if (a.interesse.includes(tipo) > b.interesse.includes(tipo)) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "Implantacao":
                    dados.sort(function (a, b) {
                        if (a.tag.includes(tipo) < b.tag.includes(tipo)) {
                            return 1;
                        }
                        if (a.tag.includes(tipo) > b.tag.includes(tipo)) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "localizacao":
                    dados.sort(function (a, b) {
                        if (a.tag.includes(tipo) < b.tag.includes(tipo)) {
                            return 1;
                        }
                        if (a.tag.includes(tipo) > b.tag.includes(tipo)) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "uso":
                    dados.sort(function (a, b) {
                        if (a.tag.includes(tipo) < b.tag.includes(tipo)) {
                            return 1;
                        }
                        if (a.tag.includes(tipo) > b.tag.includes(tipo)) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case "custo":
                    dados.sort(function (a, b) {
                        if (a.tag.includes(tipo) < b.tag.includes(tipo)) {
                            return 1;
                        }
                        if (a.tag.includes(tipo) > b.tag.includes(tipo)) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
            }

            console.log(dados);

            /*
            Tipo 1
            estudante
            professor
            tecnico
            educador
            gestorpublico
- - - - - - - - - - - - - - - - -
            Tipo 2
            Implantacao
            localizacao
            uso
            custo
*/
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

    },
    components: {
        Comentario,
        NovoComentario
    }


}



export default Forum;