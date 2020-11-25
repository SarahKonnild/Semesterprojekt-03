import React, {Component} from 'react'

class SetBeerType extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
      this.props.handleBeerType(event.target.value);
      
      event.preventDefault();
      
    }
  
    handleSubmit(event) {
      alert('Beer Type: ' + this.state.value)
      event.preventDefault();
    }
  
    render() {
      return (
        <form>
          <label>
            Beer type:
            <select value={this.state.value} onChange={this.handleChange}>
        
           
              <option value="Pilsner">Pilsner</option>
              <option value="Ale">Ale</option>
              <option value="Stout">Stout</option>
              <option value="Non Alcoholic">Non Alcoholic</option>
              <option value="Wheat">Wheat</option>
              <option value="IPA">IPA</option>
            </select>
          </label>
        </form>
      );
    }
  }

export default SetBeerType