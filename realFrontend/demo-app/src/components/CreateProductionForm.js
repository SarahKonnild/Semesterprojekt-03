import React, {Component} from 'react'
import SetErrorMargin from './SetErrorMargin';
import SetProductionSpeed from './SetProductionSpeed';


const { default: SetBatchSize } = require("./SetBatchSize");
const { default: SetBeerType } = require("./SetBeerType");

class CreateProductionForm extends Component {
    constructor(props) {
      super(props);
      this.state = {value: 'coconut'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  

    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Your production speed is: ' + this.state.value);
      event.preventDefault();
    }


    render() {
        return (

          <form>
            <label>
                <SetBeerType />
                <SetProductionSpeed />
                <SetBatchSize />
                <SetErrorMargin />
            </label>
            <input type="submit" value="Simulate" /> <br />
            <input type="submit" value="Start Production" />
          </form>
        );
      }
    }

export default CreateProductionForm