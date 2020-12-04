// declarationer til node OPC UA
import {
    OPCUAClient,
    MessageSecurityMode,
    SecurityPolicy,
    AttributeIds,
    DataType,
    ClientSession
} from "node-opcua";

// Globale constants for use to OPCUA connections

//Test Simulation
const endpointURL = "opc.tcp://127.0.0.1:4840"

//Test the Physical Machine
// const endpointURL = "opc.tcp://192.168.0.122:4840"

const stateNodeID = "ns=6;s=::Program:Cube.Command.CntrlCmd"; //Takes an int32
const requestChangeCommandNodeID = "ns=6;s=::Program:Cube.Command.CmdChangeRequest"; //Takes a boolean
const currentStateNodeID = "ns=6;s=::Program:Cube.Status.StateCurrent";
const stopProductionCommand = 3;
const resetProductionCommand = 1;
const startProductionCommand = 2;


// connect to the OPCUA server 
const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
};

const clientOPCUA = OPCUAClient.create({
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: MessageSecurityMode.None,
    securityPolicy: SecurityPolicy.None,
    endpoint_must_exist: false
});

async function changeToState(session: ClientSession, command) {
    const stateToWrite = [{
        nodeId: stateNodeID,
        attributeId: AttributeIds.Value,
        indexRange: null,
        value: {
            value: {
                dataType: DataType.Int32,
                value: command
            }
        }
    }];

    await session.write(stateToWrite);

};
async function changeStateToTrue(session: ClientSession) {
    //Send request to change state
    let changeStateRequest = true;

    const changeStateRequestToWrite = [{
        nodeId: requestChangeCommandNodeID,
        attributeId: AttributeIds.Value,
        indexRange: null,
        value: {
            value: {
                dataType: DataType.Boolean,
                value: changeStateRequest
            }
        }
    }];

    await session.write(changeStateRequestToWrite);

};

async function startSession() {
    try {
        await clientOPCUA.connect(endpointURL);

        let session = await clientOPCUA.createSession();

        return session;
    }catch(err){

    }; 
}

async function stopSession(session: ClientSession) {
    try {
        //Close the sesssion sheesh
        await session.close();

        // Do not forget to also close down the connection 
        await clientOPCUA.disconnect();
    }catch(err){

    }; 
}

export async function startProduction(beers, productionSpeed, batchnumber, beerType) {
    const beerTypeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1].Value";
    const productionSpeedNodeID = "ns=6;s=::Program:Cube.Command.MachSpeed";
    const batchSizeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[2].Value";
    const batchNumberNodeID = "ns=6;s=::Program:Cube.Command.Parameter[0].Value";
    let session = null;

    try {
        session = await startSession();

        // figure out something about produtionID and timestamp

        // Set amount of beer to produce

        const beerAmountToWrite = [{
            nodeId: batchSizeNodeID,
            attributeId: AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: DataType.Float,
                    value: beers
                }
            }
        }];

        session.write(beerAmountToWrite);

        // Set production speed
        const productionSpeedToWrite = [{
            nodeId: productionSpeedNodeID,
            attributeId: AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: DataType.Float,
                    value: productionSpeed
                }
            }
        }];

        session.write(productionSpeedToWrite);

        // Set batchnumber

        const batchnumberToWrite = [{
            nodeId: batchNumberNodeID,
            attributeId: AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: DataType.Float,
                    value: batchnumber
                }
            }
        }];

        session.write(batchnumberToWrite);

        const beerTypeToWrite = [{
            nodeId: beerTypeNodeID,
            attributeId: AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: DataType.Float,
                    value: beerType
                }
            }
        }];
        session.write(beerTypeToWrite);

        //send command to start production
        await changeToState(session, startProductionCommand);

        //Send request to change state
        await changeStateToTrue(session);

        // The return value gets passed to the API controller that sends it back to the frontend
        return 'Production started';
    }
    catch (err) {
        console.log("Connection to the server failed", err);
        return 'Production failed';
    }finally{
        if(session != null){
            await stopSession(session);
        };
    };
};

export async function resetProduction() {
    let session = null;
    try {
        session = await startSession();

        // check if a production is going on then kill it
        const nodeToRead = {
            nodeId: currentStateNodeID,
            attributeId: AttributeIds.Value,
        };

        const stateStatus = await (await session.read(nodeToRead)).value.value;

        if (stateStatus == 2 || stateStatus == 17) {
            //Change state on machine
            await changeToState(session, resetProductionCommand);

            //Send request to change state
            await changeStateToTrue(session);

            return 'Beer Machine was in state ' + stateStatus + ' and is now reset to state 4';
        }else{
            return 'Beer machine is in state ' + stateStatus + ' and cannot reset from that state'
        }
    }
    catch (err) {
        console.log("Connection to the server failed", err);
        return 'Beer Machine failed to reset'
    }finally{
        if(session != null){
            await stopSession(session);
        };
    };
};

export async function stopProduction() {
    let session = null;
    try {
        session = await startSession();

        // check if a production is going on then kill it
        const nodeToRead = {
            nodeId: currentStateNodeID,
            attributeId: AttributeIds.Value,
        };

        const stateStatus = await session.read(nodeToRead);

        if (stateStatus.value.value == 6) {
            //Change state on machine
            await changeToState(session, stopProductionCommand);

            //Send request to change state
            await changeStateToTrue(session);
            
            return 'Production stopped';
        }else{
            return 'No production to stop';
        }

    }
    catch (err) {
        console.log('Error happened', err);
        return 'Failed to stop the production, and error happened';
    }finally{
        if(session != null){
            await stopSession(session);
        };
    };
};

export async function getMaintenanceStatus() {
    const maintenanceStatusNodeID = "ns=6;s=::Program:Maintenance.Counter";
    let session = null;
    try {
        session = await startSession();

        // read the state of maintenance and returning it
        const maintenanceStatus = await session.read({
            nodeId: maintenanceStatusNodeID,
            attributeId: AttributeIds.Value,
        });
        await stopSession(session);
        
        return maintenanceStatus;
    }
    catch (err) {
        console.log("Ohh no something went wrong when opening connection ", err);
        return 'Could not get the status of the machine, an error happened';
    }finally{
        if(session != null){
            await stopSession(session);
        };
    };
};

export async function getProducedAmount() {
    const defectiveProductsNodeId = "ns=6;s=::Program:Maintenance.State"
    const acceptableProductsNodeId = "ns=6;s=::Program:Maintenance.State"
    let defectiveCount = null; 
    let acceptableCount = null; 

    let session = null;
    try {
        //Starts the connection to the machine
        session = await startSession();

        // Read the state status of the machine
        const nodeToRead = {
            nodeId: currentStateNodeID,
            attributeId: AttributeIds.Value,
        };

        const stateStatus = await session.read(nodeToRead);
        
        //Checking to see if the machine is done with the production
        if (stateStatus.value.value == 17) {

            //Reads the 2 values we need to return
            const defectiveNodeRead = {
                nodeId: defectiveProductsNodeId,
                attributeId: AttributeIds.Value,
            };
            const acceptableNodeRead = {
                nodeId: acceptableProductsNodeId,
                attributeId: AttributeIds.Value,
            };

            defectiveCount = await session.read(defectiveNodeRead);
            acceptableCount = await session.read(acceptableNodeRead);
            //Setting up the json return object
            let returnResult = {"defective": defectiveCount, "acceptable": acceptableCount };
            return returnResult;
        }else{
            return 'Production has not finished';
        }
    }
    catch (err) {
        console.log("Ohh no something went wrong when opening connection ", err);
        return 'An error happened and it wasnt possible to read the values'
    }finally{
        if(session != null){
            await stopSession(session);
        };
    };

}