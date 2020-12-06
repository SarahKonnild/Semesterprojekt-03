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

async function getCurrentState(session: ClientSession) {
    const nodeToRead = {
        nodeId: currentStateNodeID,
        attributeId: AttributeIds.Value,
    };

    const stateStatus = await (await session.read(nodeToRead)).value.value;

    return stateStatus;
};

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

        await session.write(beerAmountToWrite);

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

        await session.write(productionSpeedToWrite);

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

        await session.write(batchnumberToWrite);

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
        await session.write(beerTypeToWrite);

        //send command to start production
        await changeToState(session, startProductionCommand);

        //Send request to change state
        await changeStateToTrue(session);

        // The return value gets passed to the API controller that sends it back to the frontend
        return {"statusCode": 201,
                "message":"Starting production"};
    }
    catch (err) {
        console.log("Connection to the server failed", err);
        return {"statusCode": 400,
                "message":"Starting production failed"};
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
        let machineState = await getCurrentState(session);
        let newMachineState = null;
        if (machineState == 2 || machineState == 17) {
            //Change state on machine
            await changeToState(session, resetProductionCommand);

            //Send request to change state
            await changeStateToTrue(session);

            newMachineState = await getCurrentState(session);

            return {"statusCode": 200,
                    "message":"Beer Machine reset",
                    "oldState": machineState,
                    "newState": newMachineState}
        }else{
            return {"statusCode": 400,
                    "message":"Beer Machine could not reset",
                    "oldState": machineState,
                    "newState": newMachineState}
        }
    }
    catch (err) {
        console.log("Connection to the server failed", err);
        return {"statusCode": 400,
                "message":"Failed to reset the beer machine"};
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
        let machineState = await getCurrentState(session);

        if (machineState == 6) {
            //Change state on machine
            await changeToState(session, stopProductionCommand);

            //Send request to change state
            await changeStateToTrue(session);
            
            return {"statusCode": 200,
                    "message":"Production stopped"};
        }else{
            return {"statusCode": 400,
                    "message":"No production to be stopped"};
        }

    }
    catch (err) {
        console.log('Error happened', err);
        return {"statusCode": 400,
                "message":"Failed to stop the production"};
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
        
        return {"statusCode": 200,
                "message": "Got the status",
                "maintenacneStatus": maintenanceStatus};
    }
    catch (err) {
        console.log("Ohh no something went wrong when opening connection ", err);
        return {"statusCode": 400,
                "message":"Could not get the maintenace status"};
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
        let machineState = await getCurrentState(session);
        
        //Checking to see if the machine is done with the production
        if (machineState== 17) {

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
            let returnResult = {"statusCode": 200,
                                "message": "Got the values", 
                                "defective": defectiveCount, 
                                "acceptable": acceptableCount};
            return returnResult;
        }else{
            return {"statusCode": 400,
                    "message":"Production has not finished"};
        }
    }
    catch (err) {
        console.log("Ohh no something went wrong when opening connection ", err);
        return {"statusCode": 400,
                "message":"Failed to get the produced amounts"};
    }finally{
        if(session != null){
            await stopSession(session);
        };
    };

}