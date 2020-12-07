import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react'
import * as Api from './ChmaAPIcall'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SimulationGraph extends Component{
	constructor(props){
		super(props);
		this.state = {
			beerType: props.beerType,
			speed: props.speed,
			batch: props.batch,
			time: props. time,
			margin: props.margin,
			maxSpeed: props.maxSpeed,
			fetchOptimalSpeed: 0,
			fetchEstimatedTime: 0,
			fetchErrorAmount: 0,
			fetchMargin: 0,
			fetchErrorSpeed: 0

		}
	}

	// allows the component to be updated when the state of CHMAcreateProductio is changed, which is the parent Component.
	componentWillReceiveProps(nextProps) {
		this.setState({ 
			beerType: nextProps.beerType,
			speed: nextProps.speed,
			batch: nextProps.batch,
			time: nextProps. time,
			margin: nextProps.margin,
			maxSpeed: nextProps.maxSpeed
		 });  
	  }

	// tried to use this for solving issue where these specific values that follows below, are being used as values of labels
	// in the render(){return();} method. Whenever the fetch is called, it crashes the app. The request is send, and response is 
	// received, but the app crashes. Not been able to solve this issue.
	componentDidUpdate(prevProps, prevState, snapShot){
		if(prevState.batch !== this.state.batch && prevState.time !== this.state.time && prevState.margin !== this.state.margin){
			this.setState({
				fetchOptimalSpeed: Api.fetchOptimalSpeed(this.state.batch, this.state.time, this.state.margin)
			})
		} else if(prevState.batch !== this.state.batch && prevState.speed !== this.state.speed){
			this.setState({
				fetchEstimatedTime: Api.fetchEstimatedTime(this.state.batch, this.state.speed)
			})
		} else if(prevState.batch !== this.state.batch && prevState.margin !== this.state.margin){
			this.setState({
				fetchErrorAmount: Api.fetchErrorAmount(this.state.batch, this.state.margin)
			})
		} else if(prevState.speed !== this.state.speed){
			this.setState({
				fetchMargin: Api.fetchErrorMargin(this.state.speed)
			})
		} else if(prevState.margin !== this.state.margin){
			this.setState({
				fetchErrorSpeed: Api.fetchErrorSpeed(this.state.margin)
			})
		} else if(prevState.batch !== this.state.batch){
			this.setState({
				fetchOptimalSpeed: this.state.batch
			})
		}
	}
	  

	// creates the datapoints for the graph based on the errorfunction calculated. Can be changed to display another graph. 
	// The graph from canvas takes the datapoints in the form of: [{x,y}, {x,y}, [x,y]...]
	// Max speed is to end the curve at the relevant point. 
	getDatapoints(maxSpeed) {
		let array = [];
		for (let i = 0; i <= maxSpeed; i++) {
			array.push({x: i, y: (0.00312*Math.pow(i, 2)+0.0658*i-3.54)});
		}
		return array;
	}

	// renders the page. See the return method further down that returns the html form component, that is returned to the parent component
	// The parent component is CHMAcreateProduction
    render(){
		let datapoints1 = this.getDatapoints(300, this.state.batch, this.state.time);
		// options that the graph need to display the coordinate system and the graph.
        const options = {
			animationEnabled: true,
			title:{
				text: "Optimal speed for " + this.props.beerType
			},
			// settings for the x-axis
			axisX: {
        xValueFormatInt: 0,
        title: 'Speed: beers / minute',
        minimum: -30,
		maximum: this.props.maxSpeed + 50,
		// markers defining different points of interest on the graph. 
		stripLines:[
            {
                value: 149.71,            
                color: "red",
                label : "Optimal production speed: " + 10,
                labelFontColor: "red"
			},
			{
                value: this.state.speed,                
                color:"green",
                label : "Selected production speed: " + this.state.speed,
                labelFontColor: "green"
			},
			{
				value: this.state.margin,               
				color:"purple",
				label : "Selected Error Margin: " + this.state.margin + "%",
				labelFontColor: "purple"
			}
			]},
			// settings for the y-axis
			axisY: {
				title: "Defective / minute: ",
				// making the y-axis dynamic
        		maximum: datapoints1[datapoints1.length-1].y +50
			},
			// datapoints is inserted here
			data: [{
				type: "spline",
				dataPoints: datapoints1
			}]
		}
		// returns the component to be used in the parents render method.
        return(
            <div>
            	<div>
				<CanvasJSChart options = {options}
					onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		    	</div>
				<label>Optimal speed: {this.state.fetchOptimalSpeed} </label><br></br>
				<label>Errormargin: {this.state.fetchMargin} </label><br></br>
				<label>Errorspeed: {this.state.fetchErrorSpeed} </label><br></br>
				<label>Defects total: {this.state.fetchErrorAmount} </label><br></br>
				<label>Estimated time: {this.state.fetchEstimatedTime}</label>
        	</div>
        )
    }
}

export default SimulationGraph