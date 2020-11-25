import React, {Component} from 'react'
import NumericInput from 'react-numeric-input';

class SetProductionSpeed extends Component {
    constructor(props) {
      super(props);
      this.state = {
          productionSpeed: 0
        };
  
      this.handleChange = this.handleChange.bind(this);
      
    }
  
    async handleChange(event) {
      await this.setState({productionSpeed: document.getElementById("productionSpeedID").value});
      this.props.handleProductionSpeed(this.state.productionSpeed)
    }
  
    render() {
      return (
        <div>
        Production speed:

        <NumericInput id="productionSpeedID" step={10} precision={0} value={this.state.productionSpeed} min={0} max={200} onChange={this.handleChange}
         snap/>
        

    </div>

        
      );
    }
  }

export default SetProductionSpeed