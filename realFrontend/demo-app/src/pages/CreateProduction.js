
import CreateProductionForm from '../components/CreateProductionForm'
import { Component } from 'react'
import SimulationGraph from '../components/SimulationGraph';


class CreateProduction extends Component {
  render() {
    return (
      <div>
        <CreateProductionForm />
        <SimulationGraph />
      </div>
    );
  }
}

export default CreateProduction