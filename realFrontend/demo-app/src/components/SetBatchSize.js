import NumericInput from 'react-numeric-input';
import React, {Component} from 'react'

class SetBatchSize extends Component {
    
    render() {

        function myFormat(num) {
            return num + ' beers';
        }

        return (
            <div>
                Batch size:

                <NumericInput step={100} precision={0} value={100} min={100} max={10000} format={myFormat} snap/>
                

            </div>
        
        )
        
    }
}

export default SetBatchSize


