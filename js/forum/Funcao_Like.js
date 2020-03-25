//mudar formataçao respostas

//React
function CheckReact(tipo, id) {

  if(tipo == "likes"){
    $('#like'+id).toggleClass("show");

    // Desativando o Dislike Caso Clique no Like
    if($('#dislike'+id).hasClass("show")){
      $('#dislike'+id).toggleClass("show");

      //remover dislike
      var dados = `&id=` + id + `&react=dislikes&tipo=2`;
      $.ajax({
        url: './php_forum/envia_react.php',
        data: dados,
        type: "POST",
        success: function (msg) {
          //Atualiza caso a requisição seja concluida com exito
          Mostra_Comentarios();
          limpacampos();
        }
      });
    }
    // Verifico se a Pessoa deu Like ou ficou Neutra
    if($('#like'+id).hasClass("show")){
      var dados = `&id=` + id + `&react=` + tipo + `&tipo=1`;
      $.ajax({
        url: './php_forum/envia_react.php',
        data: dados,
        type: "POST",
        success: function (msg) {
          //Atualiza caso a requisição seja concluida com exito
          Mostra_Comentarios();
          limpacampos();
        }
      });
      event.preventDefault();
      console.log("voce aprovou este comentario");
      // se neutra :
    } else { 
      var dados = `&id=` + id + `&react=` + tipo + `&tipo=2`;
      $.ajax({
        url: './php_forum/envia_react.php',
        data: dados,
        type: "POST",
        success: function (msg) {
            //Atualiza caso a requisição seja concluida com exito
            Mostra_Comentarios();
          limpacampos();
        }
      });
      event.preventDefault();
      console.log("voce ficou neutro");
    }
    }
    // Verifica se foi Dislike
  if(tipo === "dislikes"){
    $('#dislike'+id).toggleClass("show");

    // Desativando o Like Caso Clique no Dislike
    if($('#like'+id).hasClass("show")){
      $('#like'+id).toggleClass("show");
    
      //remover like
      var dados = `&id=` + id + `&react=likes&tipo=2`;
      $.ajax({
        url: './php_forum/envia_react.php',
        data: dados,
        type: "POST",
        success: function (msg) {
          //Atualiza caso a requisição seja concluida com exito
          Mostra_Comentarios();
          limpacampos();
        }
      });
    }
    // Verifico se a Pessoa deu Dislike ou ficou Neutra
    if($('#dislike'+id).hasClass("show")){
      console.log("voce desaprovou este comentario");
      var dados = `&id=` + id + `&react=` + tipo + `&tipo=1`;
      $.ajax({
        url: './php_forum/envia_react.php',
        data: dados,
        type: "POST",
        success: function (msg) {
          //Atualiza caso a requisição seja concluida com exito
          Mostra_Comentarios();
          limpacampos();
        }
      });
      // se neutra, remove dislike
    } else { 
      var dados = `&id=` + id + `&react=` + tipo + `&tipo=2`;
      $.ajax({
        url: './php_forum/envia_react.php',
        data: dados,
        type: "POST",
        success: function (msg) {
          //Atualiza caso a requisição seja concluida com exito
          Mostra_Comentarios();
          limpacampos();
        }
      });
      event.preventDefault();
      console.log("voce ficou neutro");
    }
  }
  

} 

  
//chama os comentarios ao iniciar