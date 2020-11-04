//Annotations 
import {DistanceMeasurementsPlugin} from '../../../node_modules/@xeokit/xeokit-sdk/src/plugins/DistanceMeasurementsPlugin/DistanceMeasurementsPlugin.js';





export default function Measurement(viewer, control){    
       
    const distanceMeasurements = new DistanceMeasurementsPlugin(viewer,{labelMinAxisLength:10000, axisVisible: "false"});
    if (control == "true") {
        console.log("on");        
        distanceMeasurements.control.activate(); 
    } else if (control == "false") { 
        console.log("off");
        distanceMeasurements.control.deactivate();
        distanceMeasurements.clear(); 
    }  
   
};