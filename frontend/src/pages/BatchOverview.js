import React, {Component} from 'react'
import * as Database from '../components/DatabaseControls'

class BatchOverview extends Component {
  constructor(props){
    super();
    this.state = {

    }

    this.getBatches = this.getBatches.bind(this);
  }

  getBatches = (event) => {
    Database.getBatches();
    alert('The system was asked to log all batches in the database. See the console for the results. ')
  }


  render() {
    return (
      <div>
        <h2>Batch Overview</h2>
        <input type="button" value="Get all batches" onClick={this.getBatches}></input>
      </div>
      )

  }
    
  }

export default BatchOverview