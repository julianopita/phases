    //------------------------------------------------------------------------------------------------------------------
    // Import the modules we need for this example
    //------------------------------------------------------------------------------------------------------------------

    import {Viewer} from "./../xeokit/src/viewer/Viewer.js";
    import BimServerClient from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverclient.js";
    import {BIMServerLoaderPlugin} from "../xeokit/src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
    import {NavCubePlugin} from "../xeokit/src/plugins/NavCubePlugin/NavCubePlugin.js";
    import {TreeViewPlugin} from "../xeokit/src/plugins/TreeViewPlugin/TreeViewPlugin.js";

    //------------------------------------------------------------------------------------------------------------------
    // BIMServer parameters for this example
    //------------------------------------------------------------------------------------------------------------------

    const bimServerAddress = "http://www.nomads.usp.br:8080/bimserver/";

    const username = "platnomads@gmail.com";
    const password = "@bimserver";

    const poid = 196609;

    //------------------------------------------------------------------------------------------------------------------
    // Create a Viewer,
    // position the camera and
    // tweak the default xraying and highlighting materials
    //------------------------------------------------------------------------------------------------------------------

    const viewer = new Viewer({
        canvasId: "canvas_aux1",
        transparent: true
    });

    viewer.camera.eye = [-3.06, 8.19, 11.253];
    viewer.camera.look = [6.22, 5.84, -2.10];
    viewer.camera.up = [0.08, 0.98, -0.11];

    viewer.scene.xrayMaterial.fillAlpha = 0.1;
    viewer.scene.xrayMaterial.fillColor = [0, 0, 0];
    viewer.scene.xrayMaterial.edgeAlpha = 0.4;
    viewer.scene.xrayMaterial.edgeColor = [0, 0, 0];

    viewer.scene.highlightMaterial.fillAlpha = 0.3;
    viewer.scene.highlightMaterial.edgeColor = [1, 1, 0];

    //------------------------------------------------------------------------------------------------------------------
    // Create an IFC structure tree view
    //------------------------------------------------------------------------------------------------------------------

    const treeView = new TreeViewPlugin(viewer, {
        containerElement: document.getElementById("treeViewContainer"),
        autoExpandDepth: 3 // Initially expand three nodes deep
    });

    //------------------------------------------------------------------------------------------------------------------
    // Create a NavCube
    //------------------------------------------------------------------------------------------------------------------

    new NavCubePlugin(viewer, {
        canvasId: "myNavCubeCanvas",
        visible: true, // Default
        size: 250, // NavCube canvas size in pixels (default is 200)
        alignment: "bottomRight", // "bottomLeft" (default) | "topLeft" | "topRight" | "bottomRight"
        bottomMargin: 100,
        rightMargin: 10
    });

    //------------------------------------------------------------------------------------------------------------------
    // Mouse over objects to highlight them
    //------------------------------------------------------------------------------------------------------------------

    var lastEntity = null;

    viewer.scene.input.on("mousemove", function (coords) {
        var hit = viewer.scene.pick({
            canvasPos: coords
        });
        if (hit) {
            if (!lastEntity || hit.entity.id !== lastEntity.id) {
                if (lastEntity) {
                    lastEntity.highlighted = false;
                }
                lastEntity = hit.entity;
                hit.entity.highlighted = true;
            }
        } else {
            if (lastEntity) {
                lastEntity.highlighted = false;
                lastEntity = null;
            }
        }
    });

    //------------------------------------------------------------------------------------------------------------------
    // Click objects to get their IFC info in the JS console
    //------------------------------------------------------------------------------------------------------------------

    viewer.scene.input.on("mouseclicked", function (coords) {

        var hit = viewer.scene.pick({
            canvasPos: coords
        });

        if (hit) {
            var entity = hit.entity;
            var metaObject = viewer.metaScene.metaObjects[entity.id];
            if (metaObject) {
                console.log(JSON.stringify(metaObject.getJSON(), null, "\t"));
            } else {
                const parent = entity.parent;
                if (parent) {
                    metaObject = viewer.metaScene.metaObjects[parent.id];
                    if (metaObject) {
                        console.log(JSON.stringify(metaObject.getJSON(), null, "\t"));
                    }
                }
            }
        }
    });

    //------------------------------------------------------------------------------------------------------------------
    // Create a BIMServerClient
    //------------------------------------------------------------------------------------------------------------------

    const bimServerClient = new BimServerClient(bimServerAddress);

    //------------------------------------------------------------------------------------------------------------------
    // Add a BIMServerLoaderPlugin to the Viewer
    //------------------------------------------------------------------------------------------------------------------

    const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
        bimServerClient: bimServerClient
    });

    //------------------------------------------------------------------------------------------------------------------
    // Initialize the BIMServerClient
    //------------------------------------------------------------------------------------------------------------------

    bimServerClient.init(() => {

        //--------------------------------------------------------------------------------------------------------------
        // Login to BIMServer
        //--------------------------------------------------------------------------------------------------------------

        bimServerClient.login(username, password, () => {

            //----------------------------------------------------------------------------------------------------------
            // Get project info via the BIMServer RPC ServiceInterface
            //----------------------------------------------------------------------------------------------------------

            bimServerClient.call("ServiceInterface", "getProjectByPoid", {
                poid: poid
            }, (project) => {

                //------------------------------------------------------------------------------------------------------
                // Load the latest revision of the project using the BIMServerLoaderPlugin
                // The BIMServerLoaderPlugin used the BIMServerClient to load the model and IFC metadata
                //------------------------------------------------------------------------------------------------------

                // Load the latest revision of the project
                // Use whatever IFC schema that's for

                const roid = project.lastRevisionId;
                const schema = project.schema;

                const model = bimServerLoader.load({ // Returns a Node representing the model

                    id: "myModel",                  // Assigned to Node#id, and Node#isModel will also be set true

                    poid: poid,
                    roid: roid,
                    schema: schema,

                    scale: [0.001, 0.001, 0.001],   // Assigned to Node#scale, since model boundary exceeds view volume
                    rotation: [-90, 0, 0],          // Assigned to Node#rotation, since model "up" is +Z
                    edges: true                    // Assigned to Node#edges, to emphasis edges
                });

            }, function (response) {
                console.log("BIMServer getProjectByPoid failed: " + response.message);
            });

        }, function (response) {
            console.log("BIMServer login failed: " + response.message);
        });
    });