// declarationer til node OPC UA
import {
    OPCUAClient,
    MessageSecurityMode,
    SecurityPolicy,
    AttributeIds,
    DataType,
    StatusCodes,
    makeBrowsePath,
    ClientSubscription,
    TimestampsToReturn,
    MonitoringParametersOptions,
    ReadValueIdLike,
    ClientMonitoredItem,
    DataValue,
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

async function openOPCUAConnection() {
    try {
        await clientOPCUA.connect(endpointURL);

        let session = await clientOPCUA.createSession();
        return session;
    }
    catch (err) {
        console.log("Connection to the server failed", err);
    }
};

async function closeOPCUAConnection(session:ClientSession) {
    try {
        //Close the sesssion sheesh
        await session.close();

        // Do not forget to also close down the connection 
        await clientOPCUA.disconnect();
    }
    catch (err) {
        console.log("Connection to the server failed", err);
    }
};

async function changeToState(session:ClientSession, stateCommand) {

    const stateToWrite = [{
        nodeId: stateNodeID,
        attributeId: AttributeIds.Value,
        indexRange: null,
        value: {
            value: {
                dataType: DataType.Int32,
                value: startProductionCommand
            }
        }
    }];

    session.write(stateToWrite);
    
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

    session.write(changeStateRequestToWrite);

};

export async function startProduction(beers, productionSpeed, batchnumber, beerType) {
    const beerTypeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1].Value";
    const productionSpeedNodeID = "ns=6;s=::Program:Cube.Command.MachSpeed";
    const batchSizeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[2].Value";
    const batchNumberNodeID = "ns=6;s=::Program:Cube.Command.Parameter[0].Value";

    try {
        await clientOPCUA.connect(endpointURL);

        let session = await clientOPCUA.createSession();

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
        await changeToState(session, startProduction);


        //Send request to change state
        await changeStateToTrue(session);

        //Close the sesssion sheesh
        await session.close();

        // Do not forget to also close down the connection 
        await clientOPCUA.disconnect();

        // The return value gets passed to the API controller that sends it back to the frontend
        return 'Production started';
    }
    catch (err) {
        console.log("Connection to the server failed", err);
        return 'Production failed';
    }
};

export async function resetProduction() {
    try {
        await clientOPCUA.connect(endpointURL);

        const session = await clientOPCUA.createSession();

        // check if a production is going on then kill it
        const nodeToRead = {
            nodeId: currentStateNodeID,
            attributeId: AttributeIds.Value,
        };

        const stateStatus = await session.read(nodeToRead);

        if (stateStatus.value.value == 2) {
            //Change state on machine
            await changeToState(session, resetProductionCommand);

            //Send request to change state
            changeStateToTrue(session);
        }
        //Close the sesssion sheesh
        await session.close();

        // Do not forget to also close down the connection 
        await clientOPCUA.disconnect();
    }
    catch (err) {
        console.log("Connection to the server failed", err);
    }
};

export async function stopProduction() {

    try {
        await clientOPCUA.connect(endpointURL);
        console.log("Connected ");

        const session = await clientOPCUA.createSession();
        console.log("Session created");

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
        }


        //Close the sesssion sheesh
        await session.close();

        // Do not forget to also close down the connection 
        await clientOPCUA.disconnect();
        console.log("Disssssconnected");

    }
    catch (err) {
        console.log("Ohh no something went wrong when opening connection ", err);
    }
};

export async function getMaintenanceStatus() {
    const maintenanceStatusNodeID = "ns=6;s=::Program:Maintenance.State"
    try {
        await clientOPCUA.connect(endpointURL);
        console.log("Connected ");

        const session = await clientOPCUA.createSession();
        console.log("Session created");

        // read the state of maintenance and returning it
        const stateStatus = await session.read({
            nodeId: maintenanceStatusNodeID,
            attributeId: AttributeIds.Value,
        });
        //Close the sesssion sheesh
        await session.close();

        // Do not forget to also close down the connection 
        await clientOPCUA.disconnect();

        console.log("Disssssconnected");
        return stateStatus;
    }
    catch (err) {
        console.log("Ohh no something went wrong when opening connection ", err);
    }
};