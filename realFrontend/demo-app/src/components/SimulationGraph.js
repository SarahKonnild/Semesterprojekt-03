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
		var numberOfDataPoints = 6
		var interval = 100

		for (x; x < numberOfDataPoints * interval; x = x + interval) {
			//console.log("x is: " + x + " y is: " + this.equations(x))
			this.state.updatedDataPoints.push({x: x, y: this.equations(x)})
			
		}
		
	}
	//We could put all the update functions into a component to reduce clutter

	//TODO implement all beer types
	//Maybe extract equations as variables outside the function
	equations(x) {
		var beerType = this.props.beerTypeFromCreateProductionForm;

		if (beerType === "Pilsner") {
			return x * 1/10
		} else if (beerType === "Ale") {
			return x * 1/20
		} else if (beerType === "Stout") {
			return x * 1/30
		} else if (beerType === "Non Alcoholic") {
			return x * 1/40
		} else if (beerType === "Wheat") {
			//x is productions speed, result is y.
			return (0.00312*(Math.pow(x, 2)) + (0.0658*x) - 3.54)
		} else if (beerType === "IPA") {
			return x * 1/60
		} else {
			console.log("Error in equations under SimulationGraph. Can't find beerType")
		}
	}

	//A production speed must be found for a certain percentage of failed products.
	//I am guessing we need to isolate for x in our formula but i couldn't figure it out. See wheat in equations().
	calculateErrorMargin(batchSize) {
		var beerType = this.props.beerTypeFromCreateProductionForm;
		var errorMargin = parseInt(this.props.errorMarginFromCreateProductionForm, 10);

		if (beerType === "Pilsner") {
			return 100
		} else if (beerType === "Ale") {
			return 100
		} else if (beerType === "Stout") {
			return 100
		} else if (beerType === "Non Alcoholic") {
			return 100
		} else if (beerType === "Wheat") {
			return 100
		} else if (beerType === "IPA") {
			return 100
		} else {
			console.log("Error in calculateErrorMargin under SimulationGraph. Can't find beerType")
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
			},
			{
				startValue: this.calculateErrorMargin(parseInt(this.props.batchSizeFromCreateProductionForm, 10)),
				endValue: this.calculateErrorMargin(parseInt(this.props.batchSizeFromCreateProductionForm, 10)) + 5,                
				color:"#d8d8d8",
				label : "Error Margin: " + this.props.errorMarginFromCreateProductionForm + "%",
				labelFontColor: "purple"
			}
			]
			
		
		
			},
			axisY: {
				title: "Defective",
        //prefix: "$"
        maximum: 1000 //Should the amount of defective be dynamic or do we do it percentage wise and make errorMargin horisontal?
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