  // Adicionar um comentário
  $('#meuForm').submit(function () {
    var dados = $(this).serialize();
    $.ajax({
      url: './php_forum/envia_msg.php',
      cache: false,
      data: dados,
      type: "POST",
      success: function (msg, stts, obj) {
          //Caso o envio do formulario de sucesso, ele atualiza e limpa campos digitados; 
          Mostra_Comentarios();
        limpacampos();
      }
    })
    event.preventDefault();
  });

  // Adicionar uma resposta
function enviarsposta(rsposta, id) {
  rsposta = rsposta.replace(/ /g, "%20");
    var dados = `&id_mensagem=` + id + `&resposta=` + rsposta;
    $.ajax({
      url: './php_forum/envia_rspt.php',
      data: dados,
      type: "POST",
      success: function (msg) {
          //Caso o envio do formulario de sucesso, ele atualiza e limpa campos digitados; 
          Mostra_Comentarios();
        limpacampos();
      }
    })
    event.preventDefault();
};