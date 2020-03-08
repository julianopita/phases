import {Map} from "../../../utils/Map.js";
import {stats} from "../../../stats.js"
import {Program} from "../../../webgl/Program.js";
import {BatchingEdgesShaderSource} from "./batchingEdgesShaderSource.js";
import {RENDER_PASSES} from '../renderPasses.js';

const ids = new Map({});

/**
 * @private
 * @constructor
 */
const BatchingEdgesRenderer = function (hash, layer) {
    this.id = ids.addItem({});
    this._hash = hash;
    this._scene = layer.model.scene;
    this._useCount = 0;
    this._shaderSource = new BatchingEdgesShaderSource(layer);
    this._allocate(layer);
};

const renderers = {};
const defaultColorize = new Float32Array([1.0, 1.0, 1.0, 1.0]);

BatchingEdgesRenderer.get = function (layer) {
    const scene = layer.model.scene;
    const hash = getHash(scene);
    let renderer = renderers[hash];
    if (!renderer) {
        renderer = new BatchingEdgesRenderer(hash, layer);
        if (renderer.errors) {
            console.log(renderer.errors.join("\n"));
            return null;
        }
        renderers[hash] = renderer;
        stats.memory.programs++;
    }
    renderer._useCount++;
    return renderer;
};

function getHash(scene) {
    return [scene.canvas.canvas.id, "", scene._sectionPlanesState.getHash()].join(";")
}

BatchingEdgesRenderer.prototype.getValid = function () {
    return this._hash === getHash(this._scene);
};

BatchingEdgesRenderer.prototype.put = function () {
    if (--this._useCount === 0) {
        ids.removeItem(this.id);
        if (this._program) {
            this._program.destroy();
        }
        delete renderers[this._hash];
        stats.memory.programs--;
    }
};

BatchingEdgesRenderer.prototype.webglContextRestored = function () {
    this._program = null;
};

BatchingEdgesRenderer.prototype.drawLayer = function (frameCtx, layer, renderPass) {
    const model = layer.model;
    const scene = model.scene;
    const gl = scene.canvas.gl;
    const state = layer._state;
    if (!this._program) {
        this._allocate(layer);
        if (this.errors) {
            return;
        }
    }
    if (frameCtx.lastProgramId !== this._program.id) {
        frameCtx.lastProgramId = this._program.id;
        this._bindProgram(frameCtx, layer);
    }
    if (renderPass === RENDER_PASSES.XRAYED) {
        const material = scene.xrayMaterial._state;
        const edgeColor = material.edgeColor;
        const edgeAlpha = material.edgeAlpha;
        gl.uniform4f(this._uColor, edgeColor[0], edgeColor[1], edgeColor[2], edgeAlpha);
    } else if (renderPass === RENDER_PASSES.HIGHLIGHTED) {
        const material = scene.highlightMaterial._state;
        const edgeColor = material.edgeColor;
        const edgeAlpha = material.edgeAlpha;
        gl.uniform4f(this._uColor, edgeColor[0], edgeColor[1], edgeColor[2], edgeAlpha);
    } else if (renderPass === RENDER_PASSES.SELECTED) {
        const material = scene.selectedMaterial._state;
        const edgeColor = material.edgeColor;
        const edgeAlpha = material.edgeAlpha;
        gl.uniform4f(this._uColor, edgeColor[0], edgeColor[1], edgeColor[2], edgeAlpha);
    } else {
        const material = scene.edgeMaterial._state;
        const edgeColor = material.edgeColor;
        const edgeAlpha = material.edgeAlpha;
        gl.uniform4f(this._uColor, edgeColor[0], edgeColor[1], edgeColor[2], edgeAlpha);
    }

    gl.uniformMatrix4fv(this._uPositionsDecodeMatrix, false, layer._state.positionsDecodeMatrix);
    gl.uniformMatrix4fv(this._uViewMatrix, false, model.viewMatrix);
    gl.uniformMatrix4fv(this._uViewNormalMatrix, false, model.viewNormalMatrix);
    gl.uniform1i(this._uRenderPass, renderPass);
    this._aPosition.bindArrayBuffer(state.positionsBuf);
    frameCtx.bindArray++;
    if (this._aFlags) {
        this._aFlags.bindArrayBuffer(state.flagsBuf);
        frameCtx.bindArray++;
    }
    if (this._aFlags2) {
        this._aFlags2.bindArrayBuffer(state.flags2Buf);
        frameCtx.bindArray++;
    }
    state.edgeIndicesBuf.bind();
    frameCtx.bindArray++;
    gl.drawElements(gl.LINES, state.edgeIndicesBuf.numItems, state.edgeIndicesBuf.itemType, 0);
    frameCtx.drawElements++;
};

BatchingEdgesRenderer.prototype._allocate = function (layer) {
    var scene = layer.model.scene;
    const gl = scene.canvas.gl;
    const sectionPlanesState = scene._sectionPlanesState;
    this._program = new Program(gl, this._shaderSource);
    if (this._program.errors) {
        this.errors = this._program.errors;
        return;
    }
    const program = this._program;
    this._uColor = program.getLocation("color");
    this._uRenderPass = program.getLocation("renderPass");
    this._uPositionsDecodeMatrix = program.getLocation("positionsDecodeMatrix");
    this._uViewMatrix = program.getLocation("viewMatrix");
    this._uProjMatrix = program.getLocation("projMatrix");
    this._uSectionPlanes = [];
    const sectionPlanes = sectionPlanesState.sectionPlanes;
    for (var i = 0, len = sectionPlanes.length; i < len; i++) {
        this._uSectionPlanes.push({
            active: program.getLocation("sectionPlaneActive" + i),
            pos: program.getLocation("sectionPlanePos" + i),
            dir: program.getLocation("sectionPlaneDir" + i)
        });
    }
    this._aPosition = program.getAttribute("position");
    this._aFlags = program.getAttribute("flags");
    this._aFlags2 = program.getAttribute("flags2");
};

BatchingEdgesRenderer.prototype._bindProgram = function (frameCtx, layer) {
    const scene = this._scene;
    const gl = scene.canvas.gl;
    const program = this._program;
    const sectionPlanesState = scene._sectionPlanesState;
    program.bind();
    frameCtx.useProgram++;
    const camera = scene.camera;
    gl.uniformMatrix4fv(this._uProjMatrix, false, camera._project._state.matrix);
    if (sectionPlanesState.sectionPlanes.length > 0) {
        const sectionPlanes = scene._sectionPlanesState.sectionPlanes;
        let sectionPlaneUniforms;
        let uSectionPlaneActive;
        let sectionPlane;
        let uSectionPlanePos;
        let uSectionPlaneDir;
        for (var i = 0, len = this._uSectionPlanes.length; i < len; i++) {
            sectionPlaneUniforms = this._uSectionPlanes[i];
            uSectionPlaneActive = sectionPlaneUniforms.active;
            sectionPlane = sectionPlanes[i];
            if (uSectionPlaneActive) {
                gl.uniform1i(uSectionPlaneActive, sectionPlane.active);
            }
            uSectionPlanePos = sectionPlaneUniforms.pos;
            if (uSectionPlanePos) {
                gl.uniform3fv(sectionPlaneUniforms.pos, sectionPlane.pos);
            }
            uSectionPlaneDir = sectionPlaneUniforms.dir;
            if (uSectionPlaneDir) {
                gl.uniform3fv(sectionPlaneUniforms.dir, sectionPlane.dir);
            }
        }
    }
};

export {BatchingEdgesRenderer};
