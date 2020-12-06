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
exports.getProducedAmount = exports.getMaintenanceStatus = exports.stopProduction = exports.resetProduction = exports.startProduction = void 0;
// declarationer til node OPC UA
var node_opcua_1 = require("node-opcua");
// Globale constants for use to OPCUA connections
//Test Simulation
var endpointURL = "opc.tcp://127.0.0.1:4840";
//Test the Physical Machine
// const endpointURL = "opc.tcp://192.168.0.122:4840"
var stateNodeID = "ns=6;s=::Program:Cube.Command.CntrlCmd"; //Takes an int32
var requestChangeCommandNodeID = "ns=6;s=::Program:Cube.Command.CmdChangeRequest"; //Takes a boolean
var currentStateNodeID = "ns=6;s=::Program:Cube.Status.StateCurrent";
var stopProductionCommand = 3;
var resetProductionCommand = 1;
var startProductionCommand = 2;
// connect to the OPCUA server 
var connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
};
var clientOPCUA = node_opcua_1.OPCUAClient.create({
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: node_opcua_1.MessageSecurityMode.None,
    securityPolicy: node_opcua_1.SecurityPolicy.None,
    endpoint_must_exist: false
});
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
                    return [4 /*yield*/, session.write(stateToWrite)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
;
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
                    return [4 /*yield*/, session.write(changeStateRequestToWrite)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
;
function startSession() {
    return __awaiter(this, void 0, void 0, function () {
        var session, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, clientOPCUA.connect(endpointURL)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, clientOPCUA.createSession()];
                case 2:
                    session = _a.sent();
                    return [2 /*return*/, session];
                case 3:
                    err_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
function stopSession(session) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
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
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    return [3 /*break*/, 4];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
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
function startProduction(beers, productionSpeed, batchnumber, beerType) {
    return __awaiter(this, void 0, void 0, function () {
        var beerTypeNodeID, productionSpeedNodeID, batchSizeNodeID, batchNumberNodeID, session, beerAmountToWrite, productionSpeedToWrite, batchnumberToWrite, beerTypeToWrite, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    beerTypeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1].Value";
                    productionSpeedNodeID = "ns=6;s=::Program:Cube.Command.MachSpeed";
                    batchSizeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[2].Value";
                    batchNumberNodeID = "ns=6;s=::Program:Cube.Command.Parameter[0].Value";
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, 10, 13]);
                    return [4 /*yield*/, startSession()];
                case 2:
                    session = _a.sent();
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
                case 3:
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
                case 4:
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
                case 5:
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
                case 6:
                    _a.sent();
                    //send command to start production
                    return [4 /*yield*/, changeToState(session, startProductionCommand)];
                case 7:
                    //send command to start production
                    _a.sent();
                    //Send request to change state
                    return [4 /*yield*/, changeStateToTrue(session)];
                case 8:
                    //Send request to change state
                    _a.sent();
                    // The return value gets passed to the API controller that sends it back to the frontend
                    return [2 /*return*/, 'Production started'];
                case 9:
                    err_3 = _a.sent();
                    console.log("Connection to the server failed", err_3);
                    return [2 /*return*/, 'Production failed'];
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
exports.startProduction = startProduction;
;
function resetProduction() {
    return __awaiter(this, void 0, void 0, function () {
        var session, machineState, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 12]);
                    return [4 /*yield*/, startSession()];
                case 2:
                    session = _a.sent();
                    return [4 /*yield*/, getCurrentState(session)];
                case 3:
                    machineState = _a.sent();
                    if (!(machineState == 2 || machineState == 17)) return [3 /*break*/, 6];
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
                    return [2 /*return*/, 'Beer Machine was in state ' + machineState + ' and is now reset to state 4'];
                case 6: return [2 /*return*/, 'Beer machine is in state ' + machineState + ' and cannot reset from that state'];
                case 7: return [3 /*break*/, 12];
                case 8:
                    err_4 = _a.sent();
                    console.log("Connection to the server failed", err_4);
                    return [2 /*return*/, 'Beer Machine failed to reset'];
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
exports.resetProduction = resetProduction;
;
function stopProduction() {
    return __awaiter(this, void 0, void 0, function () {
        var session, machineState, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 12]);
                    return [4 /*yield*/, startSession()];
                case 2:
                    session = _a.sent();
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
                    return [2 /*return*/, 'Production stopped'];
                case 6: return [2 /*return*/, 'No production to stop'];
                case 7: return [3 /*break*/, 12];
                case 8:
                    err_5 = _a.sent();
                    console.log('Error happened', err_5);
                    return [2 /*return*/, 'Failed to stop the production, and error happened'];
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
        var maintenanceStatusNodeID, session, maintenanceStatus, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    maintenanceStatusNodeID = "ns=6;s=::Program:Maintenance.Counter";
                    session = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 9]);
                    return [4 /*yield*/, startSession()];
                case 2:
                    session = _a.sent();
                    return [4 /*yield*/, session.read({
                            nodeId: maintenanceStatusNodeID,
                            attributeId: node_opcua_1.AttributeIds.Value,
                        })];
                case 3:
                    maintenanceStatus = _a.sent();
                    return [4 /*yield*/, stopSession(session)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, maintenanceStatus];
                case 5:
                    err_6 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_6);
                    return [2 /*return*/, 'Could not get the status of the machine, an error happened'];
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
function getProducedAmount() {
    return __awaiter(this, void 0, void 0, function () {
        var defectiveProductsNodeId, acceptableProductsNodeId, defectiveCount, acceptableCount, session, machineState, defectiveNodeRead, acceptableNodeRead, returnResult, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defectiveProductsNodeId = "ns=6;s=::Program:Maintenance.State";
                    acceptableProductsNodeId = "ns=6;s=::Program:Maintenance.State";
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
                    returnResult = { "defective": defectiveCount, "acceptable": acceptableCount };
                    return [2 /*return*/, returnResult];
                case 6: return [2 /*return*/, 'Production has not finished'];
                case 7: return [3 /*break*/, 12];
                case 8:
                    err_7 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_7);
                    return [2 /*return*/, 'An error happened and it wasnt possible to read the values'];
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
