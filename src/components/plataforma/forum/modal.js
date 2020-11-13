
 
    const modal = {
        name : 'novo-comentario',
        template :`<div class="modal-backdrop">
        <div class="modal">
          <header class="modal-header">
            <slot name="header">
              This is the default tile!
    
              <button
                type="button"
                class="btn-close"
                @click="close"
              >
                x
              </button>
            </slot>
          </header>
          <section class="modal-body">
            <slot name="body">
            <div class="novo-comentario" id="novoComentario">
            <textarea v-model="comentario" :cols=cols :rows=rows placeholder="nova conversa">
            </textarea>
            <button @click="comentar" >Submit</button>                    
        </div>
            </slot>
           </section>
           <footer class="modal-footer">
              <slot name="footer">
                I'm the default footer!
    
                <button
                  type="button"
                  class="btn-green"
                  @click="close"
                >
                  Close me!
              </button>
            </slot>
          </footer>
        </div>
        <link rel="stylesheet" href="../../../src/style/plataforma/forum.css">
      </div>
      `,

    props : ['cols','rows','comentar'],
      data(){
          return{
              comentario : ''            
          }
      },

    methods: {
      close() {
        this.$emit('close');
      },
    },
  };

export default modal;
