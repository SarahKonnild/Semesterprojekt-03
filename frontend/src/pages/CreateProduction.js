
import CreateProductionForm from '../components/CreateProductionForm'
import { Component } from 'react'
import SimulationGraph from '../components/SimulationGraph';


class CreateProduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beerType: "Pilsner",
      productionSpeed: 0,
      batchSize: 0,
      errorMargin: 0
    };

  }

  handleBeerTypeAtCreateProductionPage = async (childData) =>{
    await this.setState({beerType: childData})
    //console.log(this.state.beerType)
  }

  handleProductionSpeedAtCreateProductionPage = async (childData) =>{
    await this.setState({productionSpeed: childData})
    //console.log(this.state.productionSpeed)
  }

  handleBatchSizeAtCreateProductionPage = async (childData) =>{
    await this.setState({batchSize: childData})
    //console.log(this.state.batchSize)
  }

  handleErrorMarginAtCreateProductionPage = async (childData) =>{
    await this.setState({errorMargin: childData})
    //console.log(this.state.errorMargin)
  }


  render() {
    return (
      <div>
        <CreateProductionForm 
          handleBeerTypeAtCreateProductionPage ={this.handleBeerTypeAtCreateProductionPage}
          handleProductionSpeedAtCreateProductionPage = {this.handleProductionSpeedAtCreateProductionPage}
          handleBatchSizeAtCreateProductionPage = {this.handleBatchSizeAtCreateProductionPage}
          handleErrorMarginAtCreateProductionPage = {this.handleErrorMarginAtCreateProductionPage}/>
        <SimulationGraph 
          beerTypeFromCreateProductionForm = {this.state.beerType}
          productionSpeedFromCreateProductionForm = {this.state.productionSpeed}
          batchSizeFromCreateProductionForm = {this.state.batchSize}
          errorMarginFromCreateProductionForm = {this.state.errorMargin}/>
      </div>
    );
  }
}

export default CreateProduction