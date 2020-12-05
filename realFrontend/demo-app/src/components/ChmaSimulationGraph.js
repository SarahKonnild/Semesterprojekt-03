import React, { Component } from 'react';

class SimulationGraph extends Component{
    render(){
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
                startValue: 250,
                endValue: 255,                
                color: "#d8d8d8",
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
        return(
            <div className="container">
            <div>
			<CanvasJSChart options = {options}
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		    </div>
        </div>
        )
    }
}