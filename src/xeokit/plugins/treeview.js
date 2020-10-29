//Annotations 
import {TreeViewPlugin} from '../../../node_modules/@xeokit/xeokit-sdk/src/plugins/TreeViewPlugin/TreeViewPlugin.js';

export default function TreeView(viewer){
    const treeView = new TreeViewPlugin(viewer, {
        containerElement: document.getElementById("treeViewContainer"),
        autoExpandDepth: 1, // Initially expand tree one level deep
        hierarchy: "storeys",
        sortNodes: true,

        // With hierarchy:"storeys" and sortNodes:true we can optionally specify which element types
        // we derive the center of each storey from, which we use to spatially sort the storeys on the
        // vertical axis. By default, this is all types, but sometimes some types of element will
        // span multiple storeys, so we have the ability to refine which types contribute to those center points.
        // sortableStoreysTypes: ["IfcWall", "IfcWallStandardCase", "IfcSlab", "IfcFurniture", "IfcFurnishingElement", "IfcDoor", "IfcRoof"]
    });
};