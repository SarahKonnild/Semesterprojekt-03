import { Component } from "react";
import MachineStatus from "../components/MachineStatus";
// import MachineStatus from "../components/MachineStatus";


const { default: IngredientStatus } = require("../components/IngredientStatus");

class Dashboard extends Component {
  render() {

    return (
      <div>
        <h2>Dashboard</h2>
        <IngredientStatus />
      </div>
    )
  }
}

export default Dashboard