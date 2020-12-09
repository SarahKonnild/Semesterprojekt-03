import React, {Component} from 'react'
import * as Database from '../components/DatabaseControls'

class BatchDetails extends Component {
  constructor(props){
    super(props);
    this.state = {

    }

    this.getBatch = this.getBatch.bind(this);
  }

  getBatch = (event) => {
    if(document.getElementById('batchId') !== ""){
      Database.getBatch(document.getElementById('batchId'));
      alert('The system was asked to search for batches in the database. View the console for the result. ');
    } else {
      alert('Please fill in a batch id. ');
    }
  }

  render() {
    return (
      <div>
        <h2>Batch Overview</h2>
        <label>Enter a batch id: </label>
        <input type="text" id="batchId"></input>
        <input type="button" value="Search" onClick={this.getBatch}></input>
      </div>
      )

  }
    
  }

export default BatchDetails