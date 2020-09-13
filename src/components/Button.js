var Button = {
    name : "button-index",
    template : `
        <div id="buttonZ">

            <div v-for="(item,i) in item" :key="i" class="button-item">
                <a @click="functions[i]" >{{item}} </a>
            </div>



            <link rel="stylesheet" href="../styles/button.css">
        </div>
    `,
    data(){
        return{
            item : ['PROJETO 1','PROJETO 2','PROJETO 3'],
            functions : [this.projeto_um,this.projeto_dois,this.projeto_tres],

        }
    },
    methods : {
        canvas : function(){
            return document.getElementById('canvaComponent');
        },
        button : function(){
            return document.getElementsByClassName('button-item');
        },
        projeto_um : function(){

            document.getElementById("c1").style.zIndex = 10;
            document.getElementById("c2").style.zIndex = 5;
            document.getElementById("c3").style.zIndex = 1;
            
        },
        projeto_dois : function(){

            document.getElementById("c1").style.zIndex = 1;
            document.getElementById("c2").style.zIndex = 10;
            document.getElementById("c3").style.zIndex = 5;
        },
        projeto_tres : function(){


            document.getElementById("c1").style.zIndex = 1;
            document.getElementById("c2").style.zIndex = 5;
            document.getElementById("c3").style.zIndex = 10;
        }
    },
    mounted(){


    }
}

export default Button;