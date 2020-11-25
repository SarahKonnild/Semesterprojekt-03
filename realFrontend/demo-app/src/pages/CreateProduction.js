
import CreateProductionForm from '../components/CreateProductionForm'
import { Component } from 'react'
import SimulationGraph from '../components/SimulationGraph';


class CreateProduction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beerType: "Pilsner",
    };

  }

  handleBeerTypeAtCreateProductionPage = async (childData) =>{
    await this.setState({beerType: childData})
    console.log(this.state.beerType)
  }


  render() {
    return (
      <div>
        <CreateProductionForm handleBeerTypeAtCreateProductionPage ={this.handleBeerTypeAtCreateProductionPage}/>
        <SimulationGraph beerTypeFromCreateProductionForm = {this.state.beerType}/>
      </div>
    );
  }
}

export default CreateProduction