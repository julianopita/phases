//Annotations 
import {StoreyViewsPlugin} from "../../../node_modules/@xeokit/xeokit-sdk/src/plugins/StoreyViewsPlugin/StoreyViewsPlugin.js";
import {math} from "../../../node_modules/@xeokit/xeokit-sdk/src/viewer/scene/math/math.js";

export default function StoreyViews(viewer){

    const storeyviews = new StoreyViewsPlugin(viewer);
    const storey = storeyviews.storeys["3cY3xbxgn6VhJE$xgHgubj"];
    const modelId = storeyviews.modelId;
    const storeyId = storeyviews.storeyId;
    const aabb = storeyviews.aabb;
    const storeyGuid = "3cY3xbxgn6VhJE$xgHgubj"

    // Make all doors transparent

    
    
    storeyviews.gotoStoreyCamera(storeyGuid, {
        projection: "perspective",
        duration: 2.5,
        done: () => {
            viewer.cameraControl.planView = false;
        }
    });

    const storeyMap = storeyviews.createStoreyMap(storeyGuid, {
        width:300,
        format: "png",
        useObjectStates: true
    });

    const img = document.createElement("img");
        img.src = storeyMap.imageData;
        img.style.width = storeyMap.width + "px";
        img.style.height = storeyMap.height + "px";
        img.style.padding = "0";
        img.style.margin = "0";
        

        const storeyMapDiv = document.getElementById("storeyMap");
        storeyMapDiv.appendChild(img);

        const pointer = document.createElement("div");
        pointer.id = "planPointer";
        pointer.style.width = "60px";
        pointer.style.height = "60px";
        pointer.style.position = "absolute";
        pointer.style["z-index"] = 100000;
        pointer.style.left = "0px";
        pointer.style.top = "0px";
        pointer.style.cursor = "none";
        pointer.style["pointer-events"] = "none";
        pointer.style.transform = "rotate(0deg)";
        pointer.style.visibility = "hidden";
        document.body.appendChild(pointer);

        const canStandOnTypes = {
            IfcSlab: true,
            IfcStair: true,
            IfcFloor: true,
            IfcFooting: true
        };

        img.onmouseenter = (e) => {
            img.style.cursor = "default";
        };

        img.onmousemove = (e) => {

            img.style.cursor = "default";

            const imagePos = [e.offsetX, e.offsetY];

            const pickResult = storeyviews.pickStoreyMap(storeyMap, imagePos, {});

            if (pickResult) {

                const entity = pickResult.entity;
                const metaObject = viewer.metaScene.metaObjects[entity.id];

                if (metaObject) {
                    if (canStandOnTypes[metaObject.type]) {
                        img.style.cursor = "pointer";
                    }
                }
            }
        };

        img.onmouseleave = (e) => {
            img.style.cursor = "default";
        };

        const worldPos = math.vec3();

        img.onclick = (e) => {
            const imagePos = [e.offsetX, e.offsetY];
            const pickResult = storeyviews.pickStoreyMap(storeyMap, imagePos, {
                pickSurface: true
            });
            if (pickResult) {

                worldPos.set(pickResult.worldPos);

                // Set camera vertical position at the mid point of the storey's vertical
                // extents - note how this is adapts to whichever of the X, Y or Z axis is
                // designated the World's "up" axis

                const camera = viewer.scene.camera;
                const idx = camera.xUp ? 0 : (camera.yUp ? 1 : 2); // Find the right axis for "up"
                const storey = storeyviews.storeys[storeyMap.storeyId];
                worldPos[idx] = (storey.aabb[idx] + storey.aabb[3 + idx]) / 4;

                viewer.cameraFlight.flyTo({
                    eye: worldPos,
                    up: viewer.camera.worldUp,
                    look: math.addVec3(worldPos, viewer.camera.worldForward, []),
                    projection: "perspective",
                    duration: 1.5
                }, () => {
                    viewer.cameraControl.navMode = "firstPerson";
                    camera.perspective.fov = 85;
                    viewer.scene.setObjectsOpacity(viewer.metaScene.getObjectIDsByType("IfcDoor"), 0.3);
                    console.log("in");
                });
                
            } else {
                storeyviews.gotoStoreyCamera(storeyGuid, {                    
                    projection: "perspective",
                    duration: 1.5,
                    done: () => {
                        viewer.cameraControl.navMode = "orbit";                        
                        console.log("out");
                        viewer.scene.setObjectsOpacity(viewer.metaScene.getObjectIDsByType("IfcDoor"), 1);
                    }
                    
                });                
            }
        };

        const imagePos = math.vec2();
        const worldDir = math.vec3();
        const imageDir = math.vec2();

        const updatePointer = () => {
            const eye = viewer.camera.eye;
            const storeyId = storeyviews.getStoreyContainingWorldPos(eye);
            if (!storeyId) {
                hidePointer();
                return;
            }
            const inBounds = storeyviews.worldPosToStoreyMap(storeyMap, eye, imagePos);
            if (!inBounds) {
                hidePointer();
                return;
            }
            var offset = getPosition(img);
            imagePos[0] += offset.x;
            imagePos[1] += offset.y;

            storeyviews.worldDirToStoreyMap(storeyMap, worldDir, imageDir);

            showPointer(imagePos, imageDir);
        };

        viewer.camera.on("viewMatrix", updatePointer);
        viewer.scene.canvas.on("boundary", updatePointer);

        function getPosition(el) {
            var xPos = 0;
            var yPos = 0;
            while (el) {
                if (el.tagName === "BODY") {      // deal with browser quirks with body/window/document and page scroll
                    var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                    var yScroll = el.scrollTop || document.documentElement.scrollTop;
                    xPos += (el.offsetLeft - xScroll + el.clientLeft);
                    yPos += (el.offsetTop - yScroll + el.clientTop);
                } else {
                    // for all other non-BODY elements
                    xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                    yPos += (el.offsetTop - el.scrollTop + el.clientTop);
                }
                el = el.offsetParent;
            }
            return {x: xPos, y: yPos};
        }

        function hidePointer() {
            pointer.style.visibility = "hidden";
        }

        function showPointer(imagePos, imageDir) {

            const angleRad = Math.atan2(imageDir[0], imageDir[1]);
            const angleDeg = Math.floor(180 * angleRad / Math.PI);

            pointer.style.left = (imagePos[0] - 30) + "px";
            pointer.style.top = (imagePos[1] - 30) + "px";
            pointer.style.transform = "rotate(" + -(angleDeg - 45) + "deg)";
            pointer.style.visibility = "visible";
        }      
}