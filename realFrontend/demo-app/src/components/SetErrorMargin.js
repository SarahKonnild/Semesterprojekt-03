import NumericInput from 'react-numeric-input';
import React, {Component} from 'react'

class SetErrorMargin extends Component {

    
    render() {

        function myFormat(num) {
            return num + '%';
        }

        return (
            <div>
                Error margin:

                <NumericInput step={1} precision={0} value={0} min={0} max={100} format={myFormat} snap/>
                

            </div>
        
        )
        
    }
}

export default SetErrorMargin