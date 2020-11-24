const { Component } = require("react");
const { default: MachineStatusData } = require("./MachineStatusData");



class MachineStatus extends Component {state = {data: 1}



    render() {
        return(
         <div>
           {MachineStatusData().map(item => {
               return (
                  <div>{item[this.state.data]} </div>
               )
           })}           
          </div>
        )
      }
    }

export default MachineStatus