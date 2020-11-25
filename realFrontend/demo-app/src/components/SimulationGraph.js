import React, {Component} from 'react'


import CanvasJSReact from '../canvasjs.react'
import CreateProductionForm from './CreateProductionForm';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SimulationGraph extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title:{
				text: <div>{}</div>
			},
			axisX: {
        
        xValueFormatInt: 0,
        title: 'Speed',
        minimum: -30,
		maximum: 1000,
		stripLines:[
            {
                
                startValue:550,
                endValue:555,                
                color:"#d8d8d8",
                label : "Optimal production speed",
                labelFontColor: "red"
			},
			{
                
                startValue:100,
                endValue:105,                
                color:"#d8d8d8",
                label : "Optimal production speed",
                labelFontColor: "blue"
			},
			{
                
                startValue:300,
                endValue:305,                
                color:"#d8d8d8",
                label : "Optimal production speed",
                labelFontColor: "green"
			}
			]
			
		
		
			},
			axisY: {
				title: "Defective",
        //prefix: "$"
        maximum: 100
			},
			data: [{
				//yValueFormatInt: 0,
				//xValueFormatInt: 0,
				type: "spline",
				dataPoints: [
					{ x: 0, y: 5 },
					{ x: 600, y: 80 },
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default SimulationGraph; 