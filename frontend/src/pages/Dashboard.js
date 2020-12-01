import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise._id}</td>
    <td>{props.exercise.startTime}</td>
    <td>{props.exercise.endTime}</td>
    <td>{props.exercise.beerType}</td>
    <td>{props.exercise.batchSize}</td>
    <td>{props.exercise.defects}</td>
    <td>{props.exercise.productionSpeed}</td>
    <td>{props.exercise.temp}</td>
    <td>{props.exercise.humidity}</td>
    <td>{props.exercise.vibration}</td>
    <td>
        {/*eslint-disable-next-line*/ }
      <Link to={"/edit/"+props.exercise._id}>Edit</Link>  | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/batches/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/batches/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Batches</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Beer Type</th>
              <th>Batch Size</th>
              <th>Defects</th>
              <th>Production Speed</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Vibration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}