import Comentario from './Comentario.js';

const Forum = {
    name :'forum',
    template : `
        <div>
            <Comentario/>
        </div>
    `,
    components : {
        Comentario
    }
}


export default Forum;