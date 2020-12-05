import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SimulationGraph extends Component{
	constructor({beerType, productionSpeed, batchSize, timeframe, errorMargin, maxSpeed}){
		super();
		this.setState({
			beerType: beerType,
			productionSpeed: productionSpeed,
			batchSize: batchSize,
			timeframe: timeframe,
			errorMargin: errorMargin,
			maxSpeed: maxSpeed
		})
		this.getDatapoints = this.getDatapoints.bind(this)
		this.getStats = this.getStats.bind(this)
		this.getOptimalSpeed = this.getOptimalSpeed.bind(this)
	}

	getDatapoints(maxSpeed) {
		var speed = parseInt(maxSpeed)
		var array = [];
		for (var i = 0; i <= speed; i++) {
			array.push({x: i, y: (0.00312*Math.pow(i, 2)+0.0658*i-3.54)});
		}
		return array;
	}

	getStats(batchSize, timeframe) {
		var errors = (0.00312*Math.pow(batchSize/timeframe, 2)+0.0658*batchSize/timeframe-3.54);
		var totalOutput = parseInt(batchSize) + parseInt(errors);
		var speed = (batchSize + errors)/timeframe;
		return {
			total: totalOutput,
			valid: batchSize,
			defects: errors,
			time: timeframe,
			optimalSpeed: speed
		}
	}

	getOptimalSpeed(batchSize, timeframe){
		var errors = 0.00312*Math.pow(batchSize, 2)+0.0658*batchSize-3.54;
		return (batchSize + errors)/timeframe;
	}

    render(){
		var stats = this.getStats(this.props.batchSize, this.props.timeframe);
		var datapoints1 = this.getDatapoints(300);
		console.log(stats.optimalSpeed)
        const options = {
			animationEnabled: true,
			title:{
				text: "Optimal speed for " + this.props.beerType
			},
			axisX: {
        
        xValueFormatInt: 0,
        title: 'Speed: beers / minute',
        minimum: -30,
		maximum: this.props.maxSpeed + 50,
		stripLines:[
            {
                value: parseInt(Math.floor(stats.optimalSpeed)),            
                color: "red",
                label : "Optimal production speed",
                labelFontColor: "red"
			},
			{
                //parseInt because they at some point the integer turned into an object... Maybe
                value: parseInt(this.props.productionSpeed),                
                color:"green",
                label : "Current production speed",
                labelFontColor: "green"
			},
			{
				startValue: this.props.errorMargin,               
				color:"purple",
				label : "Error Margin: " + this.props.errorMargin + "%",
				labelFontColor: "purple"
			}
			]},
			axisY: {
				title: "Defective / minute",
        //prefix: "$"
        maximum: datapoints1[datapoints1.length-1].y +50
			},
			data: [{
				//yValueFormatInt: 0,
				//xValueFormatInt: 0,
				type: "spline",
				dataPoints: datapoints1
			}]
		}
        return(
            <div className="container">
            <div>
			<CanvasJSChart options = {options}
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		    </div>
		<label>Optimal speed: {Math.floor(stats.optimalSpeed)} {"\t"}</label>
		<label>Total produced: {Math.floor(stats.total)} {"\t"}</label>
		<label>Defects produced: {Math.floor(stats.defects)} {"\t"}</label>
		<label>Valid produced: {Math.floor(stats.valid)} {"\t"}</label>
		<label>Time spent: {Math.floor(stats.time)} {"\t"}</label>
        </div>
        )
    }
}

export default SimulationGraph