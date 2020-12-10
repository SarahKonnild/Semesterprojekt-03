"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducedAmount = exports.getMaintenanceStatus = exports.stopProduction = exports.resetProduction = exports.startProduction = exports.getCurrentStatePublic = exports.getSubValues = void 0;
// declarationer til node OPC UA
var node_opcua_1 = require("node-opcua");
//Setting up constants that are used globally. 
var stopProductionCommand = 3;
var resetProductionCommand = 1;
var startProductionCommand = 2;
// set up some global values
var producedAmounts = null;
var batchID = null;
var marchineSpeed = null;
var toProduce = null;
//node ids 
var stateNodeID = "ns=6;s=::Program:Cube.Command.CntrlCmd";
var producedNodeID = "ns=6;s=::Program:Cube.Status.StateCurrent";
var producedProcessedNodeID = "ns=6;s=::Program:Cube.Admin.ProdProcessedCount";
var maintenanceStatusNodeID = "ns=6;s=::Program:Maintenance.Counter";
var currentStateNodeID = "ns=6;s=::Program:Cube.Status.StateCurrent";
var requestChangeCommandNodeID = "ns=6;s=::Program:Cube.Command.CmdChangeRequest";
var beerTypeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1].Value";
var productionSpeedNodeID = "ns=6;s=::Program:Cube.Command.MachSpeed";
var batchSizeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[2].Value";
var batchNumberNodeID = "ns=6;s=::Program:Cube.Command.Parameter[0].Value";
var defectiveProductsNodeId = "ns=6;s=::Program:Maintenance.State";
var acceptableProductsNodeId = "ns=6;s=::Program:Maintenance.State";
var getBatchNumberNodeID = "ns=6;s=::Program:Cube.Status.Parameter[0].Value";
var getCurrentProductionSpeedNodeID = "ns=6;s=::Program:Cube.Status.MachSpeed";
var getBeerTypeNodeID = "ns=6;s=::Program:Cube.Admin.Parameter[0].Value";
var getBatchSizeNodeID = "ns=6;s=::Program:Cube.Status.Parameter[1].Value";
// Setting up the connection strategy 
var connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
};
// Creates the OPC UA client that will be used when starting up new sessions to the machine. 
var clientOPCUA = node_opcua_1.OPCUAClient.create({
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: node_opcua_1.MessageSecurityMode.None,
    securityPolicy: node_opcua_1.SecurityPolicy.None,
    endpoint_must_exist: false
});
function getSubValues() {
    return __awaiter(this, void 0, void 0, function () {
        var nodeIDArray, session, resultArray, nodeToRead0, _a, _b, nodeToRead1, _c, _d, nodeToRead2, _e, _f, nodeToRead3, _g, _h, nodeToRead4, _j, _k, nodeToRead5, _l, _m, nodeToRead6, _o, _p, nodeToRead7, _q, _r, nodeToRead8, _s, _t, err_1;
        return __generator(this, function (_u) {
            switch (_u.label) {
                case 0:
                    nodeIDArray = [producedProcessedNodeID, currentStateNodeID, getBatchNumberNodeID, getBatchSizeNodeID, getBeerTypeNodeID, maintenanceStatusNodeID, getCurrentProductionSpeedNodeID, defectiveProductsNodeId, acceptableProductsNodeId];
                    session = null;
                    _u.label = 1;
                case 1:
                    _u.trys.push([1, 12, 13, 16]);
                    return [4 /*yield*/, startSession()];
                case 2:
                    session = _u.sent();
                    //Checking to make sure there is an active connection, otherwise throw an error.
                    if (session == null) {
                        throw new Error("No session");
                    }
                    resultArray = [];
                    nodeToRead0 = {
                        nodeId: nodeIDArray[0],
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    _b = (_a = resultArray).push;
                    return [4 /*yield*/, session.read(nodeToRead0)];
                case 3:
                    _b.apply(_a, [(_u.sent()).value.value]);
                    nodeToRead1 = {
                        nodeId: nodeIDArray[1],
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    _d = (_c = resultArray).push;
                    return [4 /*yield*/, session.read(nodeToRead1)];
                case 4:
                    _d.apply(_c, [(_u.sent()).value.value]);
                    nodeToRead2 = {
                        nodeId: nodeIDArray[2],
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    _f = (_e = resultArray).push;
                    return [4 /*yield*/, session.read(nodeToRead2)];
                case 5:
                    _f.apply(_e, [(_u.sent()).value.value]);
                    nodeToRead3 = {
                        nodeId: nodeIDArray[3],
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    _h = (_g = resultArray).push;
                    return [4 /*yield*/, session.read(nodeToRead3)];
                case 6:
                    _h.apply(_g, [(_u.sent()).value.value]);
                    nodeToRead4 = {
                        nodeId: nodeIDArray[4],
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    _k = (_j = resultArray).push;
                    return [4 /*yield*/, session.read(nodeToRead4)];
                case 7:
                    _k.apply(_j, [(_u.sent()).value.value]);
                    nodeToRead5 = {
                        nodeId: nodeIDArray[5],
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    _m = (_l = resultArray).push;
                    return [4 /*yield*/, session.read(nodeToRead5)];
                case 8:
                    _m.apply(_l, [(_u.sent()).value.value]);
                    nodeToRead6 = {
                        nodeId: nodeIDArray[6],
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    _p = (_o = resultArray).push;
                    return [4 /*yield*/, session.read(nodeToRead6)];
                case 9:
                    _p.apply(_o, [(_u.sent()).value.value]);
                    nodeToRead7 = {
                        nodeId: nodeIDArray[7],
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    _r = (_q = resultArray).push;
                    return [4 /*yield*/, session.read(nodeToRead7)];
                case 10:
                    _r.apply(_q, [(_u.sent()).value.value]);
                    nodeToRead8 = {
                        nodeId: nodeIDArray[8],
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    _t = (_s = resultArray).push;
                    return [4 /*yield*/, session.read(nodeToRead8)];
                case 11:
                    _t.apply(_s, [(_u.sent()).value.value]);
                    return [2 /*return*/, { "statusCode": 200,
                            "message": "Got the status",
                            "producedNodeID": resultArray[0],
                            "currentStateNodeID": resultArray[1],
                            "batchNumberNodeID": resultArray[2],
                            "batchSizeNodeID": resultArray[3],
                            "beerTypeNodeID": resultArray[4],
                            "maintenanceStatusNodeID": resultArray[5],
                            "getCurrentProductionSpeedNodeID": resultArray[6],
                            "defectiveProductsNodeId": resultArray[7],
                            "acceptableProductsNodeId": resultArray[8] }];
                case 12:
                    err_1 = _u.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_1);
                    return [2 /*return*/, { "statusCode": 400,
                            "message": "Could not get the maintenace status",
                            "maintenacneStatus": null,
                            "error": err_1 }];
                case 13:
                    if (!(session != null)) return [3 /*break*/, 15];
                    return [4 /*yield*/, stopSession(session)];
                case 14:
                    _u.sent();
                    _u.label = 15;
                case 15:
                    ;
                    return [7 /*endfinally*/];
                case 16:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.getSubValues = getSubValues;
/**
 * The function takes an open session to the machine, writes a value to the state node.
 *
 * @param session The current open seesion
 * @param command The state that the machine should be changed to
 */
function changeToState(session, command) {
    return __awaiter(this, void 0, void 0, function () {
        var stateToWrite;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stateToWrite = [{
                            nodeId: stateNodeID,
                            attributeId: node_opcua_1.AttributeIds.Value,
                            indexRange: null,
                            value: {
                                value: {
                                    dataType: node_opcua_1.DataType.Int32,
                                    value: command
                                }
                            }
                        }];
                    //writes the payload to the machine 
                    return [4 /*yield*/, session.write(stateToWrite)];
                case 1:
                    //writes the payload to the machine 
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
;
/**
 * Changes the node that has the change command value to true
 * @param session The open client session object
 */
function changeStateToTrue(session) {
    return __awaiter(this, void 0, void 0, function () {
        var changeStateRequest, changeStateRequestToWrite;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    changeStateRequest = true;
                    changeStateRequestToWrite = [{
                            nodeId: requestChangeCommandNodeID,
                            attributeId: node_opcua_1.AttributeIds.Value,
                            indexRange: null,
                            value: {
                                value: {
                                    dataType: node_opcua_1.DataType.Boolean,
                                    value: changeStateRequest
                                }
                            }
                        }];
                    // sending the write command to the machine together with the payload
                    return [4 /*yield*/, session.write(changeStateRequestToWrite)];
                case 1:
                    // sending the write command to the machine together with the payload
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
;
/**
 * Tries to open op a session with the machine, and then returns the client session object to the caller
 */
function startSession() {
    return __awaiter(this, void 0, void 0, function () {
        var simulationEndpointURL, physicalEndpointURL, session, err_2, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    simulationEndpointURL = "opc.tcp://127.0.0.1:4840";
                    physicalEndpointURL = "opc.tcp://192.168.0.122:4840";
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 8, 10]);
                    return [4 /*yield*/, clientOPCUA.connect(simulationEndpointURL)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 3:
                    err_2 = _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, clientOPCUA.connect(physicalEndpointURL)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    session = null;
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, clientOPCUA.createSession()];
                case 9:
                    session = _a.sent();
                    return [2 /*return*/, session];
                case 10:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Function takes the open session and then tries to close it.
 * @param session The current open client session
 */
function stopSession(session) {
    return __awaiter(this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    //Close the sesssion sheesh
                    return [4 /*yield*/, session.close()];
                case 1:
                    //Close the sesssion sheesh
                    _a.sent();
                    // Do not forget to also close down the connection 
                    return [4 /*yield*/, clientOPCUA.disconnect()];
                case 2:
                    // Do not forget to also close down the connection 
                    _a.sent();
                    return [2 /*return*/, 'done'];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, null];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Function takes the session, and reads the node on the machine that holds the value of the current state of the machine.
 * It then returns that value to the function that made the call.
 * @param session The current open client session
 */
function getCurrentState(session) {
    return __awaiter(this, void 0, void 0, function () {
        var nodeToRead, stateStatus;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nodeToRead = {
                        nodeId: currentStateNodeID,
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    return [4 /*yield*/, session.read(nodeToRead)];
                case 1: return [4 /*yield*/, (_a.sent()).value.value];
                case 2:
                    stateStatus = _a.sent();
                    return [2 /*return*/, stateStatus];
            }
        });
    });
}
;
function getCurrentStatePublic() {
    return __awaiter(this, void 0, void 0, function () {
        var session, nodeToRead, stateStatus, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 9]);
                    return [4 /*yield*/, startSession()];
                case 2:
                    session = _a.sent();
                    //Checking to make sure there is an active connection, otherwise throw an error.
                    if (session == null) {
                        throw new Error("No session");
                    }
                    nodeToRead = {
                        nodeId: currentStateNodeID,
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    return [4 /*yield*/, session.read(nodeToRead)];
                case 3: return [4 /*yield*/, (_a.sent()).value.value];
                case 4:
                    stateStatus = _a.sent();
                    return [2 /*return*/, { "statusCode": 200,
                            "message": "Got the status",
                            "state": stateStatus }];
                case 5:
                    err_4 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_4);
                    return [2 /*return*/, { "statusCode": 400,
                            "message": "Could not get the maintenace status",
                            "state": null,
                            "error": err_4 }];
                case 6:
                    if (!(session != null)) return [3 /*break*/, 8];
                    return [4 /*yield*/, stopSession(session)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    ;
                    return [7 /*endfinally*/];
                case 9:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.getCurrentStatePublic = getCurrentStatePublic;
;
/**
 * The function starts up a session with the machine, writes the values needed to start a production of beers on the machine
 * It recives the values from the api call, and those values gets written to the machine.
 */
function startProduction(beers, productionSpeed, batchnumber, beerType) {
    return __awaiter(this, void 0, void 0, function () {
        var session, state, beerAmountToWrite, productionSpeedToWrite, batchnumberToWrite, beerTypeToWrite, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 10, 11, 14]);
                    return [4 /*yield*/, startSession()];
                case 2:
                    //Trying to start up a connection to the machine
                    session = _a.sent();
                    //Checking to make sure there is an active connection, otherwise throw an error.
                    if (session == null) {
                        throw new Error("No session");
                    }
                    return [4 /*yield*/, getCurrentState(session)];
                case 3:
                    state = _a.sent();
                    if (state != 4)
                        throw new Error("Machine not ready for production, please reset the machine to state 4");
                    beerAmountToWrite = [{
                            nodeId: batchSizeNodeID,
                            attributeId: node_opcua_1.AttributeIds.Value,
                            indexRange: null,
                            value: {
                                value: {
                                    dataType: node_opcua_1.DataType.Float,
                                    value: beers
                                }
                            }
                        }];
                    return [4 /*yield*/, session.write(beerAmountToWrite)];
                case 4:
                    _a.sent();
                    productionSpeedToWrite = [{
                            nodeId: productionSpeedNodeID,
                            attributeId: node_opcua_1.AttributeIds.Value,
                            indexRange: null,
                            value: {
                                value: {
                                    dataType: node_opcua_1.DataType.Float,
                                    value: productionSpeed
                                }
                            }
                        }];
                    return [4 /*yield*/, session.write(productionSpeedToWrite)];
                case 5:
                    _a.sent();
                    batchnumberToWrite = [{
                            nodeId: batchNumberNodeID,
                            attributeId: node_opcua_1.AttributeIds.Value,
                            indexRange: null,
                            value: {
                                value: {
                                    dataType: node_opcua_1.DataType.Float,
                                    value: batchnumber
                                }
                            }
                        }];
                    return [4 /*yield*/, session.write(batchnumberToWrite)];
                case 6:
                    _a.sent();
                    beerTypeToWrite = [{
                            nodeId: beerTypeNodeID,
                            attributeId: node_opcua_1.AttributeIds.Value,
                            indexRange: null,
                            value: {
                                value: {
                                    dataType: node_opcua_1.DataType.Float,
                                    value: beerType
                                }
                            }
                        }];
                    return [4 /*yield*/, session.write(beerTypeToWrite)];
                case 7:
                    _a.sent();
                    //Send the command to put the machine in the start production state
                    return [4 /*yield*/, changeToState(session, startProductionCommand)];
                case 8:
                    //Send the command to put the machine in the start production state
                    _a.sent();
                    //Send command to change the state
                    return [4 /*yield*/, changeStateToTrue(session)];
                case 9:
                    //Send command to change the state
                    _a.sent();
                    // The return value in JSON gets passed to the API controller that sends it back to the frontend
                    return [2 /*return*/, { "statusCode": 201,
                            "message": "Starting production" }];
                case 10:
                    err_5 = _a.sent();
                    console.log("Connection to the server failed", err_5);
                    return [2 /*return*/, { "statusCode": 400,
                            "message": "Starting production failed",
                            "error": err_5 }];
                case 11:
                    if (!(session != null)) return [3 /*break*/, 13];
                    return [4 /*yield*/, stopSession(session)];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13:
                    ;
                    return [7 /*endfinally*/];
                case 14:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.startProduction = startProduction;
;
/**
 * The function starts up a session with the machine, reads the value of the state it is in, and then resets the machine if in a correct state.
 */
function resetProduction() {
    return __awaiter(this, void 0, void 0, function () {
        var session, machineState, newMachineState, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, 10, 13]);
                    return [4 /*yield*/, startSession()];
                case 2:
                    //Trying to start up a connection to the machine
                    session = _a.sent();
                    //Checking to make sure there is an active connection, otherwise throw an error.
                    if (session == null) {
                        throw new Error("No session");
                    }
                    return [4 /*yield*/, getCurrentState(session)];
                case 3:
                    machineState = _a.sent();
                    newMachineState = null;
                    if (!(machineState == 2 || machineState == 17)) return [3 /*break*/, 7];
                    //Change state on machine
                    return [4 /*yield*/, changeToState(session, resetProductionCommand)];
                case 4:
                    //Change state on machine
                    _a.sent();
                    //Send request to change state
                    return [4 /*yield*/, changeStateToTrue(session)];
                case 5:
                    //Send request to change state
                    _a.sent();
                    return [4 /*yield*/, getCurrentState(session)];
                case 6:
                    newMachineState = _a.sent();
                    //Return a json object if it managed to reset
                    return [2 /*return*/, { "statusCode": 200,
                            "message": "Beer Machine reset",
                            "oldState": machineState,
                            "newState": newMachineState }];
                case 7: 
                //Return a json object if it isnt in state 2 or 17
                return [2 /*return*/, { "statusCode": 400,
                        "message": "Beer Machine is not in a state it can reset from",
                        "oldState": machineState,
                        "newState": newMachineState }];
                case 8: return [3 /*break*/, 13];
                case 9:
                    err_6 = _a.sent();
                    // Return a JSON object if it failed at some point. 
                    return [2 /*return*/, { "statusCode": 400,
                            "message": "Failed to reset the beer machine",
                            "error": err_6 }];
                case 10:
                    if (!(session != null)) return [3 /*break*/, 12];
                    return [4 /*yield*/, stopSession(session)];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    ;
                    return [7 /*endfinally*/];
                case 13:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.resetProduction = resetProduction;
;
function stopProduction() {
    return __awaiter(this, void 0, void 0, function () {
        var session, machineState, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 12]);
                    return [4 /*yield*/, startSession()];
                case 2:
                    // Trying to make a connection to the machine
                    session = _a.sent();
                    //Checking to make sure there is an active connection, otherwise throw an error.
                    if (session == null) {
                        throw new Error("No session");
                    }
                    return [4 /*yield*/, getCurrentState(session)];
                case 3:
                    machineState = _a.sent();
                    if (!(machineState == 6)) return [3 /*break*/, 6];
                    //Change state on machine
                    return [4 /*yield*/, changeToState(session, stopProductionCommand)];
                case 4:
                    //Change state on machine
                    _a.sent();
                    //Send request to change state
                    return [4 /*yield*/, changeStateToTrue(session)];
                case 5:
                    //Send request to change state
                    _a.sent();
                    return [2 /*return*/, { "statusCode": 200,
                            "message": "Production stopped" }];
                case 6: return [2 /*return*/, { "statusCode": 400,
                        "message": "No production to be stopped" }];
                case 7: return [3 /*break*/, 12];
                case 8:
                    err_7 = _a.sent();
                    console.log('Error happened', err_7);
                    return [2 /*return*/, { "statusCode": 400,
                            "message": "Failed to stop the production",
                            "error": err_7 }];
                case 9:
                    if (!(session != null)) return [3 /*break*/, 11];
                    return [4 /*yield*/, stopSession(session)];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    ;
                    return [7 /*endfinally*/];
                case 12:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.stopProduction = stopProduction;
;
function getMaintenanceStatus() {
    return __awaiter(this, void 0, void 0, function () {
        var session, maintenanceStatus, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 9]);
                    return [4 /*yield*/, startSession()];
                case 2:
                    session = _a.sent();
                    //Checking to make sure there is an active connection, otherwise throw an error.
                    if (session == null) {
                        throw new Error("No session");
                    }
                    return [4 /*yield*/, session.read({
                            nodeId: maintenanceStatusNodeID,
                            attributeId: node_opcua_1.AttributeIds.Value,
                        })];
                case 3:
                    maintenanceStatus = _a.sent();
                    return [4 /*yield*/, stopSession(session)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, { "statusCode": 200,
                            "message": "Got the status",
                            "maintenacneStatus": maintenanceStatus }];
                case 5:
                    err_8 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_8);
                    return [2 /*return*/, { "statusCode": 400,
                            "message": "Could not get the maintenace status",
                            "maintenacneStatus": null,
                            "error": err_8 }];
                case 6:
                    if (!(session != null)) return [3 /*break*/, 8];
                    return [4 /*yield*/, stopSession(session)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    ;
                    return [7 /*endfinally*/];
                case 9:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.getMaintenanceStatus = getMaintenanceStatus;
;
/**
 * The function takes no parameters, but will connect to the machine, check if the machine is in state 17.
 * If the machine is in state 17 that means that a production is done and it can then get the amounts of defective and valid products.
 * It gets those numbers by connection to the nodes on the machine that holds those values.
 *
 * Finally the function will return a JSON object with the information.
 */
function getProducedAmount() {
    return __awaiter(this, void 0, void 0, function () {
        var defectiveCount, acceptableCount, session, machineState, defectiveNodeRead, acceptableNodeRead, returnResult, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defectiveCount = null;
                    acceptableCount = null;
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 12]);
                    return [4 /*yield*/, startSession()];
                case 2:
                    //Starts the connection to the machine
                    session = _a.sent();
                    //Checking to make sure there is an active connection, otherwise throw an error.
                    if (session == null) {
                        throw new Error("No session");
                    }
                    return [4 /*yield*/, getCurrentState(session)];
                case 3:
                    machineState = _a.sent();
                    if (!(machineState == 17)) return [3 /*break*/, 6];
                    defectiveNodeRead = {
                        nodeId: defectiveProductsNodeId,
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    acceptableNodeRead = {
                        nodeId: acceptableProductsNodeId,
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    return [4 /*yield*/, session.read(defectiveNodeRead)];
                case 4:
                    defectiveCount = _a.sent();
                    return [4 /*yield*/, session.read(acceptableNodeRead)];
                case 5:
                    acceptableCount = _a.sent();
                    returnResult = { "statusCode": 200,
                        "message": "Got the values",
                        "defective": defectiveCount,
                        "acceptable": acceptableCount };
                    return [2 /*return*/, returnResult];
                case 6: 
                // Returns the statuscode that means bad request and a message
                return [2 /*return*/, { "statusCode": 400,
                        "message": "Production has not finished" }];
                case 7: return [3 /*break*/, 12];
                case 8:
                    err_9 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_9);
                    return [2 /*return*/, { "statusCode": 400,
                            "message": "Failed to get the produced amounts",
                            "error": err_9 }];
                case 9:
                    if (!(session != null)) return [3 /*break*/, 11];
                    return [4 /*yield*/, stopSession(session)];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    ;
                    return [7 /*endfinally*/];
                case 12:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.getProducedAmount = getProducedAmount;
