//Annotations 
import {DistanceMeasurementsPlugin} from '../../../node_modules/@xeokit/xeokit-sdk/src/plugins/DistanceMeasurementsPlugin/DistanceMeasurementsPlugin.js';


export default function Measurement(viewer){
    const distanceMeasurements = new DistanceMeasurementsPlugin(viewer,{labelMinAxisLength:10000, axisVisible: "false"});
        let measureControl = 0
        viewer.scene.input.on("keydown", (keyCode) => {
            if (measureControl == 1 && keyCode == 76) {
                measureControl = 0;
                
                distanceMeasurements.control.activate();
                distanceMeasurements.control.axisVisible=false;
                //axisVisible:false;
            } else if (measureControl == 0 && keyCode == 76) {
                distanceMeasurements.control.deactivate();
                distanceMeasurements.clear();
                measureControl = 1;
            } else {
                console.log("no")
            }
        });
};