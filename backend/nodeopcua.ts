// declarationer til node OPC UA
import {
    OPCUAClient,
    MessageSecurityMode,
    SecurityPolicy,
    AttributeIds,
    DataType,
    ClientSession
} from "node-opcua";


//Setting up constants that are used globally. 
const stopProductionCommand = 3;
const resetProductionCommand = 1;
const startProductionCommand = 2;


// Setting up the connection strategy 
const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
};

// Creates the OPC UA client that will be used when starting up new sessions to the machine. 
const clientOPCUA = OPCUAClient.create({
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: MessageSecurityMode.None,
    securityPolicy: SecurityPolicy.None,
    endpoint_must_exist: false
});

/**
 * The function takes an open session to the machine, writes a value to the state node. 
 *
 * @param session The current open seesion
 * @param command The state that the machine should be changed to
 */
async function changeToState(session: ClientSession, command) {
    const stateNodeID = "ns=6;s=::Program:Cube.Command.CntrlCmd"; //Takes an int32

    //Setting up the payload to send to the machine
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

    //writes the payload to the machine 
    await session.write(stateToWrite);

};
/**
 * Changes the node that has the change command value to true
 * @param session The open client session object
 */
async function changeStateToTrue(session: ClientSession) {
    //Send request to change state
    const requestChangeCommandNodeID = "ns=6;s=::Program:Cube.Command.CmdChangeRequest"; //Takes a boolean
    let changeStateRequest = true;

    // Setting up the payload to send to the machine
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

    // sending the write command to the machine together with the payload
    await session.write(changeStateRequestToWrite);

};
/**
 * Tries to open op a session with the machine, and then returns the client session object to the caller
 */
async function startSession() {
    //The URL for the simulation machine
    const simulationEndpointURL = "opc.tcp://127.0.0.1:4840"

    //The URL for the Physical Machine
    const physicalEndpointURL = "opc.tcp://192.168.0.122:4840"

    let session = null
    /*First we try to connect to the simulation and if that fails, 
    it should get caugt by the try catch and the it should try to connect to the physcial machine instead. It will return null if it couldnt connect to either of them. **/
    try {
        await clientOPCUA.connect(simulationEndpointURL);
    }catch(err){
        try {
            await clientOPCUA.connect(physicalEndpointURL);
        } catch (error) {
            session = null;
        }
    }finally{
        session = await clientOPCUA.createSession();
        return session;
    };
}
/**
 * Function takes the open session and then tries to close it. 
 * @param session The current open client session
 */
async function stopSession(session: ClientSession) {
    try {
        //Close the sesssion sheesh
        await session.close();

        // Do not forget to also close down the connection 
        await clientOPCUA.disconnect();

        return 'done';
    }catch(err){
        return null;
    };
}

/**
 * Function takes the session, and reads the node on the machine that holds the value of the current state of the machine. 
 * It then returns that value to the function that made the call.
 * @param session The current open client session
 */
async function getCurrentState(session: ClientSession) {
    const currentStateNodeID = "ns=6;s=::Program:Cube.Status.StateCurrent";

    //Reads the current state of the machine, by accessing the node adress and getting the value
    const nodeToRead = {
        nodeId: currentStateNodeID,
        attributeId: AttributeIds.Value,
    };

    const stateStatus = await (await session.read(nodeToRead)).value.value;

    return stateStatus;
};
/**
 * The function starts up a session with the machine, writes the values needed to start a production of beers on the machine
 * It recives the values from the api call, and those values gets written to the machine. 
 */
export async function startProduction(beers, productionSpeed, batchnumber, beerType) {

    //Saving the adresses of the nodes to be used in this function.
    const beerTypeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1].Value";
    const productionSpeedNodeID = "ns=6;s=::Program:Cube.Command.MachSpeed";
    const batchSizeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[2].Value";
    const batchNumberNodeID = "ns=6;s=::Program:Cube.Command.Parameter[0].Value";
    let session = null;

    try {
        //Trying to start up a connection to the machine
        session = await startSession();

        //Checking to make sure there is an active connection, otherwise throw an error.
        if(session == null){
            throw new Error("No session");
        }

        let state = await getCurrentState(session);

        if(state != 4) throw new Error("Machine not ready for production, please reset the machine to state 4")

        // setting the amount of beers to produce
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

        // Seting the production speed
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

        // Setting the batchnumber

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

        // Setting the type of beer to produce
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

        //Send the command to put the machine in the start production state
        await changeToState(session, startProductionCommand);

        //Send command to change the state
        await changeStateToTrue(session);

        // The return value in JSON gets passed to the API controller that sends it back to the frontend
        return {"statusCode": 201,
                "message":"Starting production"};
    }
    catch (err) {
        console.log("Connection to the server failed", err);
        return {"statusCode": 400,
                "message":"Starting production failed",
                "error": err};
    }finally{
        // Make sure to close down the session so its possible to connect to it again through another function
        if(session != null){
            await stopSession(session);
        };
    };
};
/**
 * The function starts up a session with the machine, reads the value of the state it is in, and then resets the machine if in a correct state. 
 */
export async function resetProduction() {
    let session = null;
    try {
        //Trying to start up a connection to the machine
        session = await startSession();

        //Checking to make sure there is an active connection, otherwise throw an error.
        if(session == null){
            throw new Error("No session");
        }
        // Getting the state of the machine
        let machineState = await getCurrentState(session);
        let newMachineState = null;

        // If the machine is either in aborted state(2) or is finished with a production(17). 
        if (machineState == 2 || machineState == 17) {
            //Change state on machine
            await changeToState(session, resetProductionCommand);

            //Send request to change state
            await changeStateToTrue(session);

            newMachineState = await getCurrentState(session);

            //Return a json object if it managed to reset
            return {"statusCode": 200,
                    "message":"Beer Machine reset",
                    "oldState": machineState,
                    "newState": newMachineState}
        }else{
            //Return a json object if it isnt in state 2 or 17
            return {"statusCode": 400,
                    "message":"Beer Machine is not in a state it can reset from",
                    "oldState": machineState,
                    "newState": newMachineState}
        }
    }
    catch (err) {
        // Return a JSON object if it failed at some point. 
        return {"statusCode": 400,
                "message":"Failed to reset the beer machine",
                "error": err};
    }finally{
        // Make sure to close down the session so its possible to connect to it again through another function
        if(session != null){
            await stopSession(session);
        };
    };
};

export async function stopProduction() {
    let session = null;
    try {
        // Trying to make a connection to the machine
        session = await startSession();

        //Checking to make sure there is an active connection, otherwise throw an error.
        if(session == null){
            throw new Error("No session");
        }

        // check if a production is going on then kill it
        let machineState = await getCurrentState(session);

        // if the machine is currently in the state of production then execute this, otherwise return bad request
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
                "message":"Failed to stop the production",
                "error": err};
    }finally{
        // Make sure to close down the session so its possible to connect to it again through another function
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

        //Checking to make sure there is an active connection, otherwise throw an error.
        if(session == null){
            throw new Error("No session");
        }
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
                "message":"Could not get the maintenace status",
                "maintenacneStatus": null,
                "error": err};
    }finally{
        // Make sure to close down the session so its possible to connect to it again through another function
        if(session != null){
            await stopSession(session);
        };
    };
};


/**
 * The function takes no parameters, but will connect to the machine, check if the machine is in state 17. 
 * If the machine is in state 17 that means that a production is done and it can then get the amounts of defective and valid products. 
 * It gets those numbers by connection to the nodes on the machine that holds those values. 
 * 
 * Finally the function will return a JSON object with the information. 
 */
export async function getProducedAmount() {
    const defectiveProductsNodeId = "ns=6;s=::Program:Maintenance.State"
    const acceptableProductsNodeId = "ns=6;s=::Program:Maintenance.State"
    let defectiveCount = null; 
    let acceptableCount = null; 

    let session = null;
    try {
        //Starts the connection to the machine
        session = await startSession();

        //Checking to make sure there is an active connection, otherwise throw an error.
        if(session == null){
            throw new Error("No session");
        }

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
            // Returns the statuscode that means bad request and a message
            return {"statusCode": 400,
                    "message":"Production has not finished"};
        }
    }
    catch (err) {
        console.log("Ohh no something went wrong when opening connection ", err);
        return {"statusCode": 400,
                "message":"Failed to get the produced amounts",
                "error": err};
    }finally{
        // Make sure to close down the session so its possible to connect to it again through another function 
        if(session != null){
            await stopSession(session);
        };
    };

}