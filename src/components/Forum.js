import Comentario from './Comentario.js';

const Forum = {
    name :'forum',
    template : `
        <div id="forum">
            <Comentario/>
            <link rel="stylesheet" href="./src/styles/forum.css">
        </div>
    `,
    components : {
        Comentario
    }
}


export default Forum;