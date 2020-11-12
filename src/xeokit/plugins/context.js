import {ContextMenu} from "../../../node_modules/@xeokit/xeokit-sdk/src/extras/ContextMenu/ContextMenu.js";


export default function contextMenu(viewer){
    const canvasContextMenu = new ContextMenu({
        enabled: true,
        context: {
            viewer: viewer
        },
        items: [
            [
                {
                    title: "Ocultar tudo",
                    getEnabled: function (context) {
                        return (context.viewer.scene.numVisibleObjects > 0);
                    },
                    doAction: function (context) {
                        context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
                    }
                },
                {
                    title: "Mostrar tudo",
                    getEnabled: function (context) {
                        const scene = context.viewer.scene;
                        return (scene.numVisibleObjects < scene.numObjects);
                    },
                    doAction: function (context) {
                        const scene = context.viewer.scene;
                        scene.setObjectsVisible(scene.objectIds, true);
                        scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                        scene.setObjectsSelected(scene.selectedObjectIds, false);
                    }
                }
            ],
            [
                {
                    title: "Visualizar tudo",
                    doAction: function (context) {
                        context.viewer.cameraFlight.flyTo({
                            aabb: context.viewer.scene.getAABB()
                        });
                    }
                }
            ]
        ]
    });

    const objectContextMenu = new ContextMenu({
        items: [
            [
                {
                    title: "Visualizar objeto",
                    doAction: function (context) {
                        const viewer = context.viewer;
                        const scene = viewer.scene;
                        const entity = context.entity;
                        viewer.cameraFlight.flyTo({
                            aabb: entity.aabb,
                            duration: 0.5
                        }, () => {
                            setTimeout(function () {
                                scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                            }, 500);
                        });
                    }
                },
                {
                    title: "Visualizar modelo",
                    doAction: function (context) {
                        const scene = context.viewer.scene;
                        context.viewer.cameraFlight.flyTo({
                            projection: "perspective",
                            aabb: scene.getAABB(),
                            duration: 0.5
                        });
                    }
                },            
            ],
            [
                {
                    title: "Ocultar",
                    getEnabled: function (context) {
                        return context.entity.visible;
                    },
                    doAction: function (context) {
                        context.entity.visible = false;
                    }
                },
                {
                    title: "Ocultar os outros",
                    doAction: function (context) {
                        const viewer = context.viewer;
                        const scene = viewer.scene;
                        const entity = context.entity;
                        const metaObject = viewer.metaScene.metaObjects[entity.id];
                        if (!metaObject) {
                            return;
                        }
                        scene.setObjectsVisible(scene.visibleObjectIds, false);
                        scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                        scene.setObjectsSelected(scene.selectedObjectIds, false);
                        scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                        metaObject.withMetaObjectsInSubtree((metaObject) => {
                            const entity = scene.objects[metaObject.id];
                            if (entity) {
                                entity.visible = true;
                            }
                        });
                    }
                },
                {
                    title: "Ocultar tudo",
                    getEnabled: function (context) {
                        return (context.viewer.scene.numVisibleObjects > 0);
                    },
                    doAction: function (context) {
                        context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
                    }
                },
                {
                    title: "Mostrar tudo",
                    getEnabled: function (context) {
                        const scene = context.viewer.scene;
                        return (scene.numVisibleObjects < scene.numObjects);
                    },
                    doAction: function (context) {
                        const scene = context.viewer.scene;
                        scene.setObjectsVisible(scene.objectIds, true);
                    }
                }
            ],
            [
                {
                    title: "Transparente",
                    getEnabled: function (context) {
                        return (!context.entity.xrayed);
                    },
                    doAction: function (context) {
                        context.entity.xrayed = true;
                    }
                },
                {
                    title: "Desfazer transparência",
                    getEnabled: function (context) {
                        return context.entity.xrayed;
                    },
                    doAction: function (context) {
                        context.entity.xrayed = false;
                    }
                },
                {
                    title: "Transparência nos outros",
                    doAction: function (context) {
                        const viewer = context.viewer;
                        const scene = viewer.scene;
                        const entity = context.entity;
                        const metaObject = viewer.metaScene.metaObjects[entity.id];
                        if (!metaObject) {
                            return;
                        }
                        scene.setObjectsVisible(scene.objectIds, true);
                        scene.setObjectsXRayed(scene.objectIds, true);
                        scene.setObjectsSelected(scene.selectedObjectIds, false);
                        scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                        metaObject.withMetaObjectsInSubtree((metaObject) => {
                            const entity = scene.objects[metaObject.id];
                            if (entity) {
                                entity.xrayed = false;
                            }
                        });
                    }
                },
                {
                    title: "Redefinir transparência",
                    getEnabled: function (context) {
                        return (context.viewer.scene.numXRayedObjects > 0);
                    },
                    doAction: function (context) {
                        context.viewer.scene.setObjectsXRayed(context.viewer.scene.xrayedObjectIds, false);
                    }
                }
            ],       
        ],
        enabled: true
    });

    viewer.cameraControl.on("rightClick", function (e) {

        var hit = viewer.scene.pick({
            canvasPos: e.canvasPos
        });

        if (hit && hit.entity.isObject) {

            objectContextMenu.context = { // Must set context before showing menu
                viewer: viewer,                
                entity: hit.entity
            };

            objectContextMenu.show(e.event.pageX, e.event.pageY);

        } else {

            canvasContextMenu.context = { // Must set context before showing menu
                viewer: viewer
            };

            canvasContextMenu.show(e.event.pageX, e.event.pageY);
        }

        e.event.preventDefault();
    });
}