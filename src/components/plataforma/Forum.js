const Forum = {
    name : 'forum',
    template : `
        <div id="forum">
            <button @click="teste"> Ola Axios</button>
        </div>
    `,
    methods: {
        teste : function(){
            axios
            .get('https://projetos.descubra.net.br/bimnomads/busca_msg.php')
            .then(response =>{
                console.log(response);
            })
        }
    }
}


export default Forum;