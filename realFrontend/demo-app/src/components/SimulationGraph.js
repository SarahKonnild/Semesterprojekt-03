import React, {Component} from 'react'


import CanvasJSReact from '../canvasjs.react'

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

/*
productionSpeed: this.props.productionSpeedFromCreateProductionForm,
batchSize: this.props.batchSizeFromCreateProductionForm,
errorMargin: this.props.errorMarginFromCreateProductionForm */

class SimulationGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			beerType: this.props.beerTypeFromCreateProductionForm,
			updatedDataPoints: []
		}
	}

	updateDataPoints() {
		this.state.updatedDataPoints = []
		var x = 0;
		var numberOfDataPoints = 10
		var interval = 100

		for (x; x < numberOfDataPoints * interval; x = x + interval) {
			console.log("x is: " + x + " y is: " + this.equations(x))
			this.state.updatedDataPoints.push({x: x, y: this.equations(x)})
			
		}
		
	}

	equations(x) {
		if (this.props.beerTypeFromCreateProductionForm === "Pilsner") {
			return x * 1/10
		} else if (this.props.beerTypeFromCreateProductionForm === "Ale") {
			return x * 1/20
		}
	}

	

	render() {
		this.updateDataPoints() //Should only calculate when beerType changes. If statement?
		const options = {
			animationEnabled: true,
			title:{
				text: "Optimal speed for " + this.props.beerTypeFromCreateProductionForm
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
                
                startValue:695,
                endValue:700,                
                color:"#d8d8d8",
                label : "Fastest speed",
                labelFontColor: "blue"
			},
			{
                //parseInt because they at some point the integer turned into an object... Maybe
                startValue: parseInt(this.props.productionSpeedFromCreateProductionForm, 10),
                endValue: parseInt(this.props.productionSpeedFromCreateProductionForm, 10) + 5,                
                color:"#d8d8d8",
                label : "Current production speed",
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
				dataPoints: this.state.updatedDataPoints
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