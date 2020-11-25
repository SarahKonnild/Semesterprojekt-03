import React, {Component} from 'react'
import SetErrorMargin from './SetErrorMargin';
import SetProductionSpeed from './SetProductionSpeed';


const { default: SetBatchSize } = require("./SetBatchSize");
const { default: SetBeerType } = require("./SetBeerType");

class CreateProductionForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        beerType: 'Pilsner',
        productionSpeed: 0,
        batchSize: 0,
        errorMargin: 0
      };
  
      
    }

    /*setState is async so if we don't wait for it 
    we risk it's not saving in time*/

    handleBeerType = async (childData) =>{
      await this.setState({beerType: childData})
      //communicates with CreateProduction.js 
      this.props.handleBeerTypeAtCreateProductionPage(this.state.beerType);
      console.log(this.state.beerType)
    }

    handleProductionSpeed = async (childData) =>{
      await this.setState({productionSpeed: childData})
      console.log(this.state.productionSpeed)
    }

    handleBatchSize = async (childData) =>{
      await this.setState({batchSize: childData})
      console.log(this.state.batchSize)
    }

    handleErrorMargin = async (childData) =>{
      await this.setState({errorMargin: childData})
      console.log(this.state.errorMargin)
    }


    render() {
        return (

          <form>
            <label>
                <SetBeerType handleBeerType = {this.handleBeerType} />
                <SetProductionSpeed handleProductionSpeed = {this.handleProductionSpeed} />
                <SetBatchSize handleBatchSize = {this.handleBatchSize}/>
                <SetErrorMargin handleErrorMargin = {this.handleErrorMargin} />
            </label>
            <input type="submit" value="Simulate" /> <br />
            <input type="submit" value="Start Production" />
          </form>
        );
      }
    }

export default CreateProductionForm