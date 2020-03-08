Vue.component('nav-bar',{
    template : '#nave'
})

var app = new Vue({
    el :'#app',
    data : {
        comprimento : 80,
        //right
        len_dir : 30,
        len_height_dir : 85,
        //left
        len_esq : 70,
        len_height_esq : 85,
        //down
        len_height_down : 15,
        len_weight : 99.1,
        //flag
        flag_min_right : 0,
        flag_min_left : 0,
        flag_min_down : 0,
        //flags de animacao de janelas internas
        main_flag : 1,
        aux1_flag : 0,
        aux2_flag : 0,
    },
    methods: {
        forceRerender_main : function(){
            this.main_flag = 1;
            this.aux1_flag = 0;
            this.aux2_flag = 0;
        },
        forceRerender_aux1 : function(){
            this.main_flag = 0;
            this.aux1_flag = 1;
            this.aux2_flag = 0;
            delete require.cache[require.resolve('../xeokit.js')];
        },
        forceRerender_aux2 : function(){
            this.main_flag = 0;
            this.aux1_flag = 0;
            this.aux2_flag = 1;
            delete require.cache[require.resolve('../xeokit.js')];
        },

        //raise Left box
        raiseLeft : function(){
            if(this.flag_min_left == 0){
                this.len_esq = 100;
                this.len_dir = 5;
                this.flag_min_left = 1;
                this.flag_min_right = -1;
                console.log(require.resolve('../xeokit.js')+'aqui');
            }else{
                this.len_esq = 70;
                this.len_dir = 30;
                this.flag_min_left = 0;
                this.flag_min_right = 0;
            }
        },
        raiseRight : function(){
            if(this.flag_min_right == 0){
                this.len_dir = 100;
                this.len_esq = 5;
                this.flag_min_right = 1;
                this.flag_min_left = -1;
            }else{
                this.len_esq = 70;
                this.len_dir = 30;
                this.flag_min_left = 0
                this.flag_min_right = 0;
            }
        },
        raiseDown : function(){
            if(this.flag_min_down == 0){
                this.len_height_dir = 10;
                this.len_height_esq = 10;
                this.len_height_down = 90;
                this.flag_min_down = 1;
            }else{
                this.len_height_down = 15;
                this.len_height_esq = 85;
                this.len_height_dir = 85;
                this.flag_min_down = 0;
            }
        },
        minLeft : function(){
            this.raiseRight();
        },
        minRight : function(){
            this.raiseLeft();
        },
        minDown : function(){
            if(this.flag_min_down == 0){
                this.len_height_dir = 95;
                this.len_height_esq = 95;
                this.len_height_down = 5;
                this.flag_min_down = -1;
            }else{
                this.len_height_dir = 85;
                this.len_height_esq = 85;
                this.len_height_down = 15;
                this.flag_min_down = 0;
            }
        },
    }
})