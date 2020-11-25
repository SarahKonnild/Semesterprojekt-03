import NumericInput from 'react-numeric-input';
import React, {Component} from 'react'

class SetErrorMargin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMargin: 0
          };
    
        this.handleChange = this.handleChange.bind(this);
        
      }
    
      async handleChange(event) {
        await this.setState({errorMargin: document.getElementById("errorMarginID").value});
        this.props.handleErrorMargin(this.state.errorMargin.slice(0,this.state.errorMargin.length - 1))
      }
    
      render() {

        function myFormat(num) {
            return num + '%';
        }
        return (
            <div>
                Error margin:

                <NumericInput id="errorMarginID" step={1} precision={0} value={this.state.errorMargin} min={0} max={100} format={myFormat} onChange={this.handleChange} snap/>
                

            </div>
  
          
        );
      }
    }
    


export default SetErrorMargin