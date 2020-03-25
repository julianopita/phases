// Carrega os comentarios
    //quantidade de comentarios a serem carregados
  var tamanho = 3;

function Mostra_Comentarios() {
  $.ajax({
    url: './php_forum/busca_msg.php',
    dataType: 'json',
    success: function (dados) {
      //sessionStorage.setItem('data', dados);
      var data = dados;
      VerificaFiltro(data);

      var comentando = '';
      for (var i = 0; tamanho > i; i++) {
        comentando +=`
          <div class="comentarios">
            `+  
            /*  Começo React */ `
            <div class="votes" id="votes` + data[i].id_discussion + `" >
              <h4 style="margin-top:12px">` + data[i].likes + ` Aprovações</h4>
              <label class="img-like" id="like`+data[i].id_discussion+`" onclick="CheckReact('likes', `+data[i].id_discussion+`)"></label>
              
              <h4 style="margin-top:12px; margin-left: 20px">` + data[i].dislikes + ` Desaprovações</h4>
              <label class="img-dislike" id="dislike`+data[i].id_discussion+`" onclick="CheckReact('dislikes',`+data[i].id_discussion+`)"></label>
            </div>
            `+  
            /*  Começo Comentário */  `
            <b id="name">` + data[i].user_name + `<span> ` + data[i].date_time + `</span></b>
            <p>` + data[i].discussion + `</p>
            `+
            /*  Começo respostas aos comentarios */ `
            <span onclick="hideresposta(` + data[i].id_discussion + `)">
            <a href="javascript:void(0)" style="text-decoration: none;">
            Respostas ` + 
            // Verifico a Quantidade de respostas aos comentarios
            `(` +  (data[i].subcomment === "" ? 0 : data[i].subcomment) + `)
            </a></span>
            <div class="rsposta" id="respostas` + data[i].id_discussion + `">
            <div id="` + data[i].id_discussion + `"></div>
            `+
            /*  Campo para poder responder um comentario */`
            <form method="POST" name="formRespostas" id="formRespostas">
            <div class="inputs">
            <input type="hidden" name="id_comentario` + data[i].id_discussion + `" value=` + data[i].id_discussion + ` />
            <input type="text" name="txcomentario_resposta` + data[i].id_discussion + `"
            placeholder="Digite sua resposta" class="campo" required/>
            </div>
            <input type="submit" onclick="enviarsposta
            ($('[name=txcomentario_resposta` + data[i].id_discussion + `]').val(),
            $('[name=id_comentario` + data[i].id_discussion + `]').val())" value="Responder">
            </form>
            
            </div>
          </div>
          `;
        Procura_Resposta(data[i].id_discussion);
      }
      comentando += `
        <a id="MaisComents" onclick="MaisComents()">
          <h3>  Mostrar Mais Comentarios... </h3>
        </a>
      `;
      procura_react();
      $('#exibe_comentarios').empty();
      $('#exibe_comentarios').append(comentando);
    }, error: function(er) {
      console.log(er);
      alert('erro ao carregar os comentarios');

    }
  });
};
// Aumenta a quantidade de comentarios carregados
function MaisComents(){
  tamanho += 3;
  Mostra_Comentarios();
}
// Carrega reacts do usuario nos comentarios
function procura_react() {
  $.ajax({
    url: './php_forum/recupera_react.php',
    dataType: 'json',
    success: function (datas) {
      for (var a = 0; datas.length > a; a++) {
          if(datas[a].likes){
            $('#like'+datas[a].id_discussion).toggleClass("show");
          }
          if(datas[a].dislikes){
            $('#dislike'+datas[a].id_discussion).toggleClass("show");
          }
      }
    }
  });
}
  //  Carrega Resposta a um Comentario
function Procura_Resposta(id) {
  $.ajax({
    url: './php_forum/busca_rspt.php',
    dataType: 'json',
    success: function (datas) {
      var msg = '';
      for (var a = 0; datas.length > a; a++) {
        if (id == datas[a].discussion) {
          msg =
            '<div class="resposta">' +
            '<b>' + datas[a].user_name + '</b> <span> ' + datas[a].date_time + ' </span>' +
            '<p>' + datas[a].commentary + '</p>' +
            '</div>';
            
          $('#' + id).append(msg);
        }
      }
    }
  });
}

//mudar formataçao respostas

//chama os comentarios ao iniciar
Mostra_Comentarios();