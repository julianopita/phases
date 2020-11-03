import {Viewer} from '../../node_modules/@xeokit/xeokit-sdk/src/viewer/Viewer.js';
import Login from "./login.js";

const viewer = new Viewer({
    canvasId: canvasId
});

export default viewer;