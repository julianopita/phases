//Annotations 
import {DistanceMeasurementsPlugin} from '../../../node_modules/@xeokit/xeokit-sdk/src/plugins/DistanceMeasurementsPlugin/DistanceMeasurementsPlugin.js';

export default function Measurement(viewer){    
       
    const distanceMeasurements = new DistanceMeasurementsPlugin(viewer,{
        labelMinAxisLength:10000, axisVisible: "false"
        });
    let control = true;
    const measurementClick = document.getElementById('measurements');
    
    measurementClick.addEventListener('click',()=>{
        if (control == true) {                    
            distanceMeasurements.control.activate();
            control = false; 
        } else{             
            distanceMeasurements.control.deactivate();
            distanceMeasurements.clear();
            control = true; 
        }  
    });
   
};