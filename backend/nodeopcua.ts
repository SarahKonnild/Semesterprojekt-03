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
    DataValue
  } from "node-opcua";

// Globale constants for use to OPCUA connections
//"opc.tcp://127.0.0.1:4840"
const endpointURL = "opc.tcp://192.168.0.122:4840"
const stateNodeID = "ns=6;s=::Program:Cube.Command.CntrlCmd"; //Takes an int32
const requestChangeCommandNodeID = "ns=6;s=::Program:Cube.Command.CmdChangeRequest"; //Takes a boolean
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
        console.log("Connected ");

        let session = await clientOPCUA.createSession();
        console.log("Session created");
        return session;
    }
    catch (err) {
        console.log("Ohh no something went wrong when opening connection ", err);
    }
}

async function closeOPCUAConnection(session) {
    try {
        //Close the sesssion sheesh
        await session.close();

        // Do not forget to also close down the connection 
        await clientOPCUA.disconnect();
        console.log("Disssssconnected");
    }
    catch (err) {
        console.log("Ohh no something went wrong when opening connection ", err);
    }
}

export async function startProduction(beers, productionSpeed, batchnumber, beerType) {
    const beerTypeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1]";
    const productionSpeedNodeID = "ns=6;s=::Program:Cube.Command.MarchSpeed";
    const batchSizeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[2]";
    const batchNumberNodeID = "ns=6;s=::Program:Cube.Command.Parameter[0]";
    console.log('We are in the endgame now');
    try {
        console.log("We did done do it");
        await clientOPCUA.connect(endpointURL);
        console.log("Connected ");

        let session = await clientOPCUA.createSession();
        console.log("Session created");

        // figure out something about produtionID and timestamp

        const stateToWrite2 = [{
            nodeId: stateNodeID,
            attributeId: AttributeIds.Value,
            indexRange: null,
            Value: {
                    dataType: DataType.Int32,
                    value: 1
            }
        }];

        session.write(stateToWrite2);

        //Send request to change state

        const changeStateRequestToWrite2 = [{
            nodeId: requestChangeCommandNodeID,
            attributeId: AttributeIds.Value,
            indexRange: null,
            Value: {
                    dataType: DataType.Boolean,
                    value: true
                }
        }];

        session.write(changeStateRequestToWrite2);
    }
    catch (err) {
        console.log("Ohh no something went wrong when opening connection ", err);
    }
};

export async function stopProduction() {
    const currentStateNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1]"

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
        const stateStatus = await session.read(nodeToRead, 0);
        
        if (Number(stateStatus.toString) === 2) {
            //Change state on machine
            const stateToWrite = [{
                nodeId: stateNodeID,
                attributeId: AttributeIds.Value,
                indexRange: null,
                value: {
                    value: {
                        dataType: DataType.Int32,
                        value: stopProductionCommand
                    }
                }
            }];

            session.write(stateToWrite);

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