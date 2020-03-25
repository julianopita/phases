  // Limpa campos
  function limpacampos() {
    $('input:text').val('');
  }

  // Exibe / esconde respostas
  function hideresposta(id) {
    $('#respostas' + id).toggle('slow');
  };

  $(document).ready(function () {
    $('.filtros').toggle();

      // Exibe / esconde Filtros
    $('.hidefiltros').click(function () {
      $('.filtros').toggle('slow');
    })

      // Exibe / esconde comentários
      $('.hidecoment').click(function () {
        $('#exibe_comentarios').toggle('slow');
      })

  });

  // Verificar Qual Filtro de Comentario Esta Selecionado
  function VerificaFiltro(data){
    var id = $("input:checked").attr('id');
      //reordenar comentarios
        
      if(id === "MR"){
        data.sort(function (a, b) {
          if (a.date_time < b.date_time) {
            return 1;
          }
          if (a.date_time > b.date_time) {
            return -1;
          }
              return 0;
        });
      }

      if(id === "MC"){
        data.sort(function (a, b) {
          if (a.subcomment < b.subcomment) {
            return 1;
          }
          if (a.subcomment > b.subcomment) {
            return -1;
          }
              return 0;
        });
      }
      if(id === "ML"){
        data.sort(function (a, b) {
          if (a.likes < b.likes) {
            return 1;
          }
          if (a.likes > b.likes) {
            return -1;
          }
              return 0;
        });
      }
      if(id === "MD"){
        data.sort(function (a, b) {
          if (a.dislikes < b.dislikes ) {
            return 1;
          }
          if (a.dislikes > b.dislikes ) {
            return -1;
          }
              return 0;
        });
      }
  }

  // Seleciona Filtro dos comentarios
  $('input[type="checkbox"]').change(function () {
    var n = $("input:checked").length;
    if (n === 0) {
      $('#MR').prop('checked', true);
    }
    if (this.checked) {
      var id = this.id;

      switch (id) {
      /*
        MR- Mais Recente
        MC- Mais Comentado
        ML- Mais Curtido
        MD- Menos Curtido
      */
        case 'MR':
          $('#MC').prop('checked', false);
          $('#ML').prop('checked', false);
          $('#MD').prop('checked', false);
          break;
        case 'MC':
          $('#MR').prop('checked', false);
          $('#ML').prop('checked', false);
          $('#MD').prop('checked', false);
          break;
        case 'ML':
          $('#MC').prop('checked', false);
          $('#MR').prop('checked', false);
          $('#MD').prop('checked', false);
          break;
        case 'MD':
          $('#MC').prop('checked', false);
          $('#ML').prop('checked', false);
          $('#MR').prop('checked', false);
          break;
      }
      Mostra_Comentarios();
    }
  });
    //esconder forum
  $('div.resize_right, input:hidden').on('click', () => {
    $('div.content').toggle();
  });