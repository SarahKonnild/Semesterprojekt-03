import { Component } from 'react'
import SimulationGraph from '../components/ChmaSimulationGraph';
import NumericInput from 'react-numeric-input';
import './CHMAcreateProduction.css';
import * as MachineControls from '../components/MachineControls';
import * as Api from '../components/ChmaAPIcall'

class CHMAcreateProduction extends Component {
    constructor(props) {
        super();
        this.state = {
            beerType: 'Pilsner',
            speed: 0, // this one holds the users production speed input
            batch: 0, // this one holds the users batch size input
            margin: 0, // this one holds the users error margin input
            time: 0, // this one holds the users time input
            optimalSpeed: 0, // this one holds the fetched optimalspeed
            errorMargin: 0, // this one holds the fetched error margin
            maintenanceStatus: 0, // this one holds the fetched maintenance status
            productionCount: 0 // this one holds the fetched production count
        }

        // this is believed to necessary in order for the methods to be usable from within the render method. 
        this.beerTypeHandler = this.beerTypeHandler.bind(this);
        this.speedHandler = this.speedHandler.bind(this);
        this.batchHandler = this.batchHandler.bind(this);
        this.marginHandler = this.marginHandler.bind(this);
        this.timeHandler = this.timeHandler.bind(this);
        this.startProduction = this.startProduction.bind(this);
        this.stopProduction = this.stopProduction.bind(this);
        this.resetProduction = this.resetProduction.bind(this);
        this.detectMaintenanceStatus = this.detectMaintenanceStatus.bind(this);
        this.getProductionCount = this.getProductionCount.bind(this);
    }

    // methods below are event handlers that changes the values of this.state when theyre changed by the user. 

    beerTypeHandler = (event) => {
        this.setState({
            beerType: event.target.value
        })
    }

    speedHandler = (event) => {
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

    timeHandler = (event) => {
        this.setState({
            time: document.getElementById('time').value
        })
    }

    simulateProduction = (event) => {
        if (this.state.speed > 0 && this.state.batch > 0) {
            alert('You did right to attemp to simulate before starting a production, but it is not implemented. ');
        } else {
            alert('Please enter a beertype, a production speed and a batchsize. ');
        }
    }

    startProduction = (event) => {
        if (this.state.speed > 0 && this.state.batch > 0) {
            MachineControls.startProduction(this.state.beerType, this.state.speed, this.state.batch);
            alert('Production has been started. ');
        } else {
            alert('Please fill out a beertype a production speed and a batchsize. ');
        }

    }

    stopProduction = (event) => {
        if (MachineControls.stopProduction().then(result => {
            if(result !== undefined){
                console.log(result);
                return 1;
            } else {
                return -1;
            }
        }) > 0) {
            alert('The machine has been stopped. ')
        } else {
            alert('The machine was not running. ')
        }
    }

    resetProduction = (event) => {
        if (MachineControls.resetProduction().then(result => {
            if(result !== undefined){
                console.log(result);
                return 1;
            } else {
                return -1;
            }
        }) > 0) {
            alert('Machine has been reset.');
        } else {
            alert('Machine was already reset.')
        }

    }

    detectMaintenanceStatus = (event) => {
        alert(MachineControls.detectMaintenanceStatus());
    }

    getProductionCount = (event) => {
        alert(MachineControls.getProductionCount());
    }

    getOptimalSpeed = (event) => {
        if(this.state.batch > 0 && this.state.time > 0 && this.state.margin > 0){
            alert(Api.fetchOptimalSpeed(this.state.batch, this.state.time, this.state.margin));
        } else {
            alert('Please fill out a batchsize, a timeframe and an accepted error margin. ')
        }
    }

    getErrorMargin = (event) => {
        if(this.state.speed > 0){
            alert(Api.fetchErrorMargin(this.state.speed));
        } else {
            alert('Please fill in a production speed');
        }
    }

    getErrorspeed = (event) => {
        if(this.state.margin > 0){
            alert(Api.fetchErrorSpeed());
        } else {
            alert('Please fill in an error margin');
        }
    }

    getDefects = (event) => {
        if(this.state.batch > 0 && this.state.margin > 0){
            alert(Api.fetchErrorAmount(this.state.batch, this.state.margin));
        } else {
            alert('Please fill in a batch size and an error margin');
        }
    }

    getEstimatedTime = (event) => {
        if(this.state.batch > 0 && this.state.speed > 0){
            alert(Api.fetchEstimatedTime(this.state.batch, this.state.speed));
        } else {
            alert('Please fill in a batch size and a production speed');
        }
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
                        <NumericInput id="speed" step={10} precision={0} value={this.state.speed} min={0} max={300}
                            onChange={this.speedHandler}></NumericInput>
                    </label>
                    <label>Batch size:
                        <NumericInput id="batch" step={100} precision={0} value={this.state.batch} min={0} onChange={this.batchHandler}></NumericInput>
                    </label>
                    <label>Error margin:
                        <NumericInput id="margin" step={1} precision={0} value={this.state.margin} min={0} max={100} onChange={this.marginHandler}></NumericInput>
                    </label>
                    <label>Time:
                        <NumericInput id="time" step={1} precision={0} value={this.state.time} min={0}></NumericInput>
                    </label>
                    <label>Batch Id:
                        <input type="text"></input>
                    </label> <br></br>
                    {/*<input type="submit" value="Start production" onSubmit={this.startProduction}></input>*/}
                </form>
                <SimulationGraph
                    beerType={this.state.beerType}
                    speed={this.state.speed}
                    batch={this.state.batch}
                    time={this.state.time}
                    margin={this.state.margin}
                    maxSpeed={300} />
                <h2>Machine controls</h2>
                <input type="button" value="Simulate production" onClick={this.simulateProduction} />
                <input type="button" value="Start Production" onClick={this.startProduction} />
                <input type="button" value="Stop Production" onClick={this.stopProduction} />
                <input type="button" value="reset Production" onClick={this.resetProduction} />
                <input type="button" value="detectMaintenanceStatus" onClick={this.detectMaintenanceStatus} />
                <input type="button" value="getProductionCount" onClick={this.getProductionCount} />
                <h2>Optimization: </h2>
                <input type="button" value="Get optimal speed" onClick={this.getOptimalSpeed} />
                <input type="button" value="Get error margin" onClick={this.getErrorMargin} />
                <input type="button" value="Get error speed" onClick={this.getErrorspeed} />
                <input type="button" value="Get defects amount" onClick={this.getDefects} />
                <input type="button" value="Get estimated time" onClick={this.getEstimatedTime} />
            </div>
        )
    }
}

export default CHMAcreateProduction