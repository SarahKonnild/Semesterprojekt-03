import NumericInput from 'react-numeric-input';
import React, {Component} from 'react'

class SetBatchSize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            batchSize: 0
          };
    
        this.handleChange = this.handleChange.bind(this);
        
      }
    
      async handleChange(event) {
        await this.setState({batchSize: document.getElementById("batchSizeID").value});
        this.props.handleBatchSize(this.state.batchSize.slice(0,this.state.batchSize.length - 6))
      }
    
      render() {

        function myFormat(num) {
            return num + ' beers';
        }
        return (
            <div>
            Batch size:

            <NumericInput id="batchSizeID" step={100} precision={0} value={this.state.batchSize} min={100} max={2_160_000} format={myFormat} onChange={this.handleChange} snap/>
            </div>
  
          
        );
      }
    }
    


export default SetBatchSize


