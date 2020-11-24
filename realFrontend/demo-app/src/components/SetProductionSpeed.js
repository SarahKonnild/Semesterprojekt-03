import NumericInput from 'react-numeric-input';
import React, {Component} from 'react'

class SetProductionSpeed extends Component {
    
    render() {

        return (
            <div>
                Production speed:

                <NumericInput step={10} precision={0} value={0} min={0} max={200} snap/>
                Optimal speed for Pilsner is 150 unit

            </div>
        
        )
        
    }
}

export default SetProductionSpeed