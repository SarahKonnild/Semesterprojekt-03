// declarationer til node OPC UA
import {
    OPCUAClient,
    MessageSecurityMode,
    SecurityPolicy,
    AttributeIds,
    makeBrowsePath,
    ClientSubscription,
    TimestampsToReturn,
    MonitoringParametersOptions,
    ReadValueIdLike,
    ClientMonitoredItem,
    DataValue
  } from "node-opcua";

// Globale constants for use to OPCUA connections
const opcua = require("node-opcua");
const endpointURL = "opc.tcp://127.0.0.1:4840"
const stateNodeID = "ns=6;s=::Program:Cube.Command.CntrlCmd"; //Takes an int32
const requestChangeCommandNodeID = "ns=6;s=::Program:Cube.Command.CmdChangeRequest"; //Takes a boolean


// connect to the OPCUA server 
const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1 
};

const clientOPCUA = OPCUAClient.create({
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: MessageSecurityMode.None,
    SecurityPolicy: SecurityPolicy.None,
    endpoint_must_exist: false
});

async function openOPCUAConnection(){
    try{
        await clientOPCUA.connect(endpointURL);
        console.log("Connected ");

        const session = await clientOPCUA.createSession();
        console.log("Session created");
        return session
    }
    catch(err){
        console.log("Ohh no something went wrong when opening connection ", err);
    }
}

async function closeOPCUAConnection(session){
    try{
        //Close the sesssion sheesh
        await session.close();

        // Do not forget to also close down the connection 
        await clientOPCUA.disconnect();
        console.log("Disssssconnected");
    }
    catch(err){
        console.log("Ohh no something went wrong when opening connection ", err);
    }
}


async function StartProduction(){
    const beerTypeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1]";
    const productionSpeedNodeID = "ns=6;s=::Program:Cube.Command.MarchSpeed";
    const batchSizeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[2]" ;
    const batchNumberNodeID = "ns=6;s=::Program:Cube.Command.Parameter[0]";

    session = openOPCUAConnection;

    // figure out something about produtionID and timestamp
    
    // Set amount of beer to produce
    let beers = 1500.0;
    
    const beerAmountToWrite = [{
        nodeID: batchSizeNodeID,
        attributeId: opcua.AttributeIds.Value,
        indexRange: null,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: beers
            }
        }
    }];

    session.write(beerAmountToWrite);

    // Set production speed
    let productionSpeed = 300.0;

    const productionSpeedToWrite = [{
        nodeID: productionSpeedNodeID,
        attributeId: opcua.AttributeIds.Value,
        indexRange: null,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: productionSpeed
            }
        }
    }];

    session.write(productionSpeedToWrite);

    // Set batchnumber
    let batchnumber = 300.0;

    const batchnumberToWrite = [{
        nodeID: batchNumberNodeID,
        attributeId: opcua.AttributeIds.Value,
        indexRange: null,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: batchnumber
            }
        }
    }];

    session.write(batchnumberToWrite);

    // Set beertype
    let beerType = 1;

    const beerTypeToWrite = [{
        nodeID: beerTypeNodeID,
        attributeId: opcua.AttributeIds.Value,
        indexRange: null,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: beerType
            }
        }
    }];

    session.write(beerTypeToWrite);

    //Change state on machine
    let state = 2;

    const stateToWrite = [{
        nodeID: stateNodeID,
        attributeId: opcua.AttributeIds.Value,
        indexRange: null,
        value: {
            value: {
                dataType: opcua.DataType.Int,
                value: state
            }
        }
    }];

    session.write(stateToWrite);

    //Send request to change state
    let changeStateRequest = true;

    const changeStateRequestToWrite = [{
        nodeID: requestChangeCommandNodeID,
        attributeId: opcua.AttributeIds.Value,
        indexRange: null,
        value: {
            value: {
                dataType: opcua.DataType.Boolean,
                value: changeStateRequest
            }
        }
    }];

    session.write(changeStateRequestToWrite);


    closeOPCUAConnection(session);
};