import React, { Component } from 'react'
import NumericInput from 'react-numeric-input';

class Speedbox extends Component {
    constructor(props){
        super(props);
        this.setState({
            
        })
    }
    render() {
        return (
            <label>Production speed:
                <NumericInput step={10} precision={0} value={this.state.productionSpeed} min={0} max={200}
                    onChange={this.speedHandler}></NumericInput>
            </label>
        )
    }
}

export default Speedbox;