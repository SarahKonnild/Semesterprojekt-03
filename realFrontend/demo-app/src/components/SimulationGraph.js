import React, {Component} from 'react'

import SetBeerType from '../components/SetBeerType';


import CanvasJSReact from '../canvasjs.react'
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SimulationGraph extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title:{
				text: <div>herllo</div>
			},
			axisX: {
        
        xValueFormatInt: 0,
        title: 'Something',
        minimum: -30,
        maximum: 1000
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