import React, {Component} from 'react'


import CanvasJSReact from '../canvasjs.react'
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class IngredientStatus extends Component {	
    render() {
      const options = {
        title: {
          text: "Ingredients Status"
        },
        data: [{				
                  type: "column",
                  dataPoints: [
                      { label: "Barley",  y: 90  },
                      { label: "Hops", y: 80  },
                      { label: "Malt", y: 70  },
                      { label: "Wheat",  y: 60  },
                      { label: "Yeast",  y: 50  }
                  ]
         }]
     }
          
     return (
        <div>
          <CanvasJSChart options = {options}
              onRef = {ref => this.chart = ref}
          />
        </div>
      );
    }
  }

  export default IngredientStatus