const { Component } = require("react");
const { default: MachineStatusData } = require("./MachineStatusData");


class MachineStatus extends Component {
  constructor(props){
    super();
    this.state = {
      data: {}
    }
  }

    render() {
        return(
         <div>
           {1}         
          </div>
        )
      }
    }

export default MachineStatus