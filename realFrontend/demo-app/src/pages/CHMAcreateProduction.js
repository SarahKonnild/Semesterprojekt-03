import { Component } from 'react'
import SimulationGraph from '../components/SimulationGraph';
import NumericInput from 'react-numeric-input';
import '../css/App.css';


class CHMAcreateProduction extends Component {
    constructor(props) {
        super();
        this.state = {
            beerType: 'Pilsner',
            productionSpeed: 0,
            batchSize: 0,
            errorMargin: 0,
            timeframe: 0
        }
        this.beerTypeHandler = this.beerTypeHandler.bind(this);
        this.speedHandler = this.speedHandler.bind(this);
        this.batchSizeHandler = this.batchSizeHandler.bind(this);
        this.errorMarginHandler = this.errorMarginHandler.bind(this);
        this.timeframeHandler = this.timeframeHandler.bind(this);
    }

    beerTypeHandler = (event) => {
        this.setState({
            beerType: event.target.value
        })
    }

    speedHandler = (event) => {
        this.setState({
            productionSpeed: document.getElementById('speed').value
        })
    }

    batchSizeHandler = (event) => {
        this.setState({
            batchSize: document.getElementById('batchSize').value
        })
    }

    errorMarginHandler = (event) => {
        this.setState({
            errorMargin: document.getElementById('margin').value
        })
        
    }

    timeframeHandler = (event) => {
        this.setState({
            timeframe: document.getElementById('timeframe').value
        })
    }

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
                        <NumericInput id="speed" step={10} precision={0} value={this.state.productionSpeed} min={0} max={1000}
                            onChange={this.speedHandler}></NumericInput>
                    </label>
                    <label>Batch size:
                        <NumericInput id="batchSize" step={100} precision={0} value={this.state.batchSize} min={0} onChange={this.batchSizeHandler}></NumericInput>
                    </label>
                    <label>Error margin:
                        <NumericInput id="margin" step={1} precision={0} value={this.state.errorMargin} min={0} max={100} onChange={this.errorMarginHandler}></NumericInput>
                    </label>
                    <label>Time:
                        <NumericInput id="timeframe" step={1} precision={0} value={this.state.timeframe} min={0} max={1000} onChange={this.timeframeHandler}></NumericInput>
                    </label>
                </form>
                <SimulationGraph
                    beerType={this.state.beerType}
                    productionSpeed={this.state.productionSpeed}
                    batchSize={this.state.batchSize}
                    timeframe={this.state.timeframe}
                    errorMargin={this.state.errorMargin} />
                <input type="submit" value="Simulate" /> <br />
                <input type="submit" value="Start Production" />
            </div>
        )
    }
}

export default CHMAcreateProduction