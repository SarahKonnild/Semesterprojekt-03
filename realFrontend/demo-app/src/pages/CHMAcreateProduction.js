import { Component } from 'react'
import SimulationGraph from '../components/ChmaSimulationGraph';
import NumericInput from 'react-numeric-input';
import './CHMAcreateProduction.css';


class CHMAcreateProduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beerType: 'Pilsner',
            speed: 0,
            batch: 0,
            margin: 0,
            time: 0
        }
        
        // this is believed to necessary in order for the methods to be usable from within the render method. 
        this.beerTypeHandler = this.beerTypeHandler.bind(this);
        this.speedHandler = this.speedHandler.bind(this);
        this.batchHandler = this.batchHandler.bind(this);
        this.marginHandler = this.marginHandler.bind(this);
        this.timeHandler = this.timeHandler.bind(this);
        
    }

    // methods below are event handlers that changes the values of this.state when theyre changed by the user. 

    beerTypeHandler(event){
        this.setState({
            beerType: event.target.value
        })
    }

    speedHandler(event){
        this.setState({
            speed: document.getElementById('speed').value
        })
    }

    batchHandler = (event) => {
        this.setState({
            batch: document.getElementById('batch').value
        })
    }

    marginHandler = (event) => {
        this.setState({
            margin: document.getElementById('margin').value
        })
        
    }

    timeHandler(event){
        this.setState({
            time: document.getElementById('time').value
        })
    }

    // this was used to try and fix the error where the app crashes when fetch methods is called in ChmaSimulationGraph.
    // Look there fore more comments on this.
    /*
    componentWillMount(){
        this.beerTypeHandler();
        this.speedHandler();
        this.batchHandler();
        this.errorMarginHandler();
        this.timeHandler();
    }
    */

    render() {
        return (
            <div className="container">
                <form>
                    <label>Beertype:
                    <select onChange={this.beerTypeHandler} value={this.state.beerType}>
                            <option value="Pilsner">Pilsner</option>
                            <option value="Ale">Ale</option>
                            <option value="Stout">Stout</option>
                            <option value="Non Alcoholic">Non Alcoholic</option>
                            <option value="Wheat">Wheat</option>
                            <option value="IPA">IPA</option>
                        </select>
                    </label>
                    <label>Production speed:
                        <NumericInput id="speed" step={10} precision={0} value={this.state.speed} min={0} max={1000}
                            onChange={this.speedHandler}></NumericInput>
                    </label>
                    <label>Batch size:
                        <NumericInput id="batch" step={100} precision={0} value={this.state.batch} min={0} onChange={this.batchHandler}></NumericInput>
                    </label>
                    <label>Error margin:
                        <NumericInput id="margin" step={1} precision={0} value={this.state.margin} min={0} max={100} onChange={this.marginHandler}></NumericInput>
                    </label>
                    <label>Time:
                        <NumericInput id="time" step={1} precision={0} value={this.state.time} min={0} max={1000} onChange={this.timeHandler}></NumericInput>
                    </label>
                </form>
                <SimulationGraph
                    beerType={this.state.beerType}
                    speed={this.state.speed}
                    batch={this.state.batch}
                    time={this.state.time}
                    margin={this.state.margin}
                    maxSpeed={300} />
                <input type="submit" value="Simulate" /> <br />
                <input type="submit" value="Start Production" />
            </div>
        )
    }
}

export default CHMAcreateProduction