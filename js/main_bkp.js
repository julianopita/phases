// Código principal
var app = new Vue({
  el: '#app',
  data:{
    iconBar : 0
  },
  methods: {
    navIcon : function(){
      window.addEventListener('scroll',()=>{
        if(window.scrollY > 60){
          this.iconBar = 1;
        }else{
          this.iconBar = 0;
        }
        console.log(this.iconBar)
      })
    }
  }
})

app.navIcon();