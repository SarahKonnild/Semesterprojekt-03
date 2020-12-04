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
;
;
function changeToState(session) {
    return __awaiter(this, void 0, void 0, function () {
        var stateToWrite;
        return __generator(this, function (_a) {
            stateToWrite = [{
                    nodeId: stateNodeID,
                    attributeId: node_opcua_1.AttributeIds.Value,
                    indexRange: null,
                    value: {
                        value: {
                            dataType: node_opcua_1.DataType.Int32,
                            value: startProductionCommand
                        }
                    }
                }];
            session.write(stateToWrite);
            return [2 /*return*/];
        });
    });
}
;
function changeStateToTrue(session) {
    return __awaiter(this, void 0, void 0, function () {
        var changeStateRequest, changeStateRequestToWrite;
        return __generator(this, function (_a) {
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
            session.write(changeStateRequestToWrite);
            return [2 /*return*/];
        });
    });
}
;
function startProduction(beers, productionSpeed, batchnumber, beerType) {
    return __awaiter(this, void 0, void 0, function () {
        var beerTypeNodeID, productionSpeedNodeID, batchSizeNodeID, batchNumberNodeID, session, beerAmountToWrite, productionSpeedToWrite, batchnumberToWrite, beerTypeToWrite, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    beerTypeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1].Value";
                    productionSpeedNodeID = "ns=6;s=::Program:Cube.Command.MachSpeed";
                    batchSizeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[2].Value";
                    batchNumberNodeID = "ns=6;s=::Program:Cube.Command.Parameter[0].Value";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, clientOPCUA.connect(endpointURL)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, clientOPCUA.createSession()];
                case 3:
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
                    session.write(beerAmountToWrite);
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
                    session.write(productionSpeedToWrite);
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
                    session.write(batchnumberToWrite);
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
                    session.write(beerTypeToWrite);
                    //send command to start production
                    return [4 /*yield*/, changeToState(session)];
                case 4:
                    //send command to start production
                    _a.sent();
                    //Send request to change state
                    return [4 /*yield*/, changeStateToTrue(session)];
                case 5:
                    //Send request to change state
                    _a.sent();
                    //Close the sesssion sheesh
                    return [4 /*yield*/, session.close()];
                case 6:
                    //Close the sesssion sheesh
                    _a.sent();
                    // Do not forget to also close down the connection 
                    return [4 /*yield*/, clientOPCUA.disconnect()];
                case 7:
                    // Do not forget to also close down the connection 
                    _a.sent();
                    // The return value gets passed to the API controller that sends it back to the frontend
                    return [2 /*return*/, 'Production started'];
                case 8:
                    err_1 = _a.sent();
                    console.log("Connection to the server failed", err_1);
                    return [2 /*return*/, 'Production failed'];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.startProduction = startProduction;
;
function resetProduction() {
    return __awaiter(this, void 0, void 0, function () {
        var session, nodeToRead, stateStatus, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, clientOPCUA.connect(endpointURL)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, clientOPCUA.createSession()];
                case 2:
                    session = _a.sent();
                    nodeToRead = {
                        nodeId: currentStateNodeID,
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    return [4 /*yield*/, session.read(nodeToRead)];
                case 3:
                    stateStatus = _a.sent();
                    if (!(stateStatus.value.value == 2)) return [3 /*break*/, 5];
                    //Change state on machine
                    return [4 /*yield*/, changeToState(session)];
                case 4:
                    //Change state on machine
                    _a.sent();
                    //Send request to change state
                    changeStateToTrue(session);
                    _a.label = 5;
                case 5: 
                //Close the sesssion sheesh
                return [4 /*yield*/, session.close()];
                case 6:
                    //Close the sesssion sheesh
                    _a.sent();
                    // Do not forget to also close down the connection 
                    return [4 /*yield*/, clientOPCUA.disconnect()];
                case 7:
                    // Do not forget to also close down the connection 
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    err_2 = _a.sent();
                    console.log("Connection to the server failed", err_2);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.resetProduction = resetProduction;
;
function stopProduction() {
    return __awaiter(this, void 0, void 0, function () {
        var session, nodeToRead, stateStatus, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, clientOPCUA.connect(endpointURL)];
                case 1:
                    _a.sent();
                    console.log("Connected ");
                    return [4 /*yield*/, clientOPCUA.createSession()];
                case 2:
                    session = _a.sent();
                    console.log("Session created");
                    nodeToRead = {
                        nodeId: currentStateNodeID,
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    return [4 /*yield*/, session.read(nodeToRead)];
                case 3:
                    stateStatus = _a.sent();
                    if (!(stateStatus.value.value == 6)) return [3 /*break*/, 6];
                    //Change state on machine
                    return [4 /*yield*/, changeToState(session)];
                case 4:
                    //Change state on machine
                    _a.sent();
                    //Send request to change state
                    return [4 /*yield*/, changeStateToTrue(session)];
                case 5:
                    //Send request to change state
                    _a.sent();
                    _a.label = 6;
                case 6: 
                //Close the sesssion sheesh
                return [4 /*yield*/, session.close()];
                case 7:
                    //Close the sesssion sheesh
                    _a.sent();
                    // Do not forget to also close down the connection 
                    return [4 /*yield*/, clientOPCUA.disconnect()];
                case 8:
                    // Do not forget to also close down the connection 
                    _a.sent();
                    console.log("Disssssconnected");
                    return [3 /*break*/, 10];
                case 9:
                    err_3 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_3);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.stopProduction = stopProduction;
;
function getMaintenanceStatus() {
    return __awaiter(this, void 0, void 0, function () {
        var maintenanceStatusNodeID, session, stateStatus, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    maintenanceStatusNodeID = "ns=6;s=::Program:Maintenance.State";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, clientOPCUA.connect(endpointURL)];
                case 2:
                    _a.sent();
                    console.log("Connected ");
                    return [4 /*yield*/, clientOPCUA.createSession()];
                case 3:
                    session = _a.sent();
                    console.log("Session created");
                    return [4 /*yield*/, session.read({
                            nodeId: maintenanceStatusNodeID,
                            attributeId: node_opcua_1.AttributeIds.Value,
                        })];
                case 4:
                    stateStatus = _a.sent();
                    //Close the sesssion sheesh
                    return [4 /*yield*/, session.close()];
                case 5:
                    //Close the sesssion sheesh
                    _a.sent();
                    // Do not forget to also close down the connection 
                    return [4 /*yield*/, clientOPCUA.disconnect()];
                case 6:
                    // Do not forget to also close down the connection 
                    _a.sent();
                    console.log("Disssssconnected");
                    return [2 /*return*/, stateStatus];
                case 7:
                    err_4 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_4);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getMaintenanceStatus = getMaintenanceStatus;
;
function getProducedAmount() {
    return __awaiter(this, void 0, void 0, function () {
        var defectiveProductsNodeId, acceptableProductsNodeId, defectiveCount, acceptableCount, session, nodeToRead, stateStatus, defectiveNodeRead, acceptableNodeRead, returnResult, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defectiveProductsNodeId = "ns=6;s=::Program:Maintenance.State";
                    acceptableProductsNodeId = "ns=6;s=::Program:Maintenance.State";
                    defectiveCount = null;
                    acceptableCount = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    //Starts the connection to the machine
                    return [4 /*yield*/, clientOPCUA.connect(endpointURL)];
                case 2:
                    //Starts the connection to the machine
                    _a.sent();
                    return [4 /*yield*/, clientOPCUA.createSession()];
                case 3:
                    session = _a.sent();
                    nodeToRead = {
                        nodeId: currentStateNodeID,
                        attributeId: node_opcua_1.AttributeIds.Value,
                    };
                    return [4 /*yield*/, session.read(nodeToRead)];
                case 4:
                    stateStatus = _a.sent();
                    //Checking to see if the machine is done with the production
                    if (stateStatus.value.value == 17) {
                        defectiveNodeRead = {
                            nodeId: defectiveProductsNodeId,
                            attributeId: node_opcua_1.AttributeIds.Value,
                        };
                        acceptableNodeRead = {
                            nodeId: acceptableProductsNodeId,
                            attributeId: node_opcua_1.AttributeIds.Value,
                        };
                        defectiveCount = session.read(defectiveNodeRead);
                        acceptableCount = session.read(acceptableNodeRead);
                    }
                    // Closing down the connection to the machine
                    return [4 /*yield*/, session.close()];
                case 5:
                    // Closing down the connection to the machine
                    _a.sent();
                    return [4 /*yield*/, clientOPCUA.disconnect()];
                case 6:
                    _a.sent();
                    returnResult = { "defective": defectiveCount,
                        "acceptable": acceptableCount };
                    return [2 /*return*/, returnResult];
                case 7:
                    err_5 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_5);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getProducedAmount = getProducedAmount;
