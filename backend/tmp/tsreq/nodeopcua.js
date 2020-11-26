"use strict";
// declarationer til node OPC UA
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
exports.getMaintenanceStatus = exports.stopProduction = exports.somefunction = exports.startProduction = void 0;
// Globale constants for use to OPCUA connections
var opcua = require("node-opcua");
var endpointURL = "opc.tcp://" + require("os").hostname() + "127.0.0.1:4840";
var stateNodeID = "ns=6;s=::Program:Cube.Command.CntrlCmd"; //Takes an int32
var requestChangeCommandNodeID = "ns=6;s=::Program:Cube.Command.CmdChangeRequest"; //Takes a boolean
var stopProductionCommand = 3;
var resetProductionCommand = 2;
var startProductionCommand = 1;
// connect to the OPCUA server 
var connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
};
var clientOPCUA = opcua.OPCUAClient.create({
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: opcua.MessageSecurityMode.None,
    SecurityPolicy: opcua.SecurityPolicy.None,
    endpoint_must_exist: false
});
function openOPCUAConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var session, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, clientOPCUA.connect(endpointURL)];
                case 1:
                    _a.sent();
                    console.log("Connected ");
                    return [4 /*yield*/, clientOPCUA.createSession()];
                case 2:
                    session = _a.sent();
                    console.log("Session created");
                    return [2 /*return*/, session];
                case 3:
                    err_1 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function closeOPCUAConnection(session) {
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
                    console.log("Disssssconnected");
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function startProduction(beers, productionSpeed, batchnumber, beerType) {
    return __awaiter(this, void 0, void 0, function () {
        var beerTypeNodeID, productionSpeedNodeID, batchSizeNodeID, batchNumberNodeID, session, beerAmountToWrite, productionSpeedToWrite, batchnumberToWrite, beerTypeToWrite, state, stateToWrite, changeStateRequest, changeStateRequestToWrite, thisValue, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    beerTypeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1]";
                    productionSpeedNodeID = "ns=6;s=::Program:Cube.Command.MarchSpeed";
                    batchSizeNodeID = "ns=6;s=::Program:Cube.Command.Parameter[2]";
                    batchNumberNodeID = "ns=6;s=::Program:Cube.Command.Parameter[0]";
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
                    // figure out something about produtionID and timestamp
                    // Set amount of beer to produce
                    beers = 1500.0;
                    beerAmountToWrite = [{
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
                    productionSpeed = 300.0;
                    productionSpeedToWrite = [{
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
                    batchnumber = 300.0;
                    batchnumberToWrite = [{
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
                    beerType = 1;
                    beerTypeToWrite = [{
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
                    state = startProductionCommand;
                    stateToWrite = [{
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
                    changeStateRequest = true;
                    changeStateRequestToWrite = [{
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
                    //Close the sesssion sheesh
                    return [4 /*yield*/, session.close()];
                case 4:
                    //Close the sesssion sheesh
                    _a.sent();
                    // Do not forget to also close down the connection 
                    return [4 /*yield*/, clientOPCUA.disconnect()];
                case 5:
                    // Do not forget to also close down the connection 
                    _a.sent();
                    thisValue = 'Sone value';
                    return [4 /*yield*/, thisValue];
                case 6: return [2 /*return*/, _a.sent()];
                case 7:
                    err_3 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_3);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.startProduction = startProduction;
;
function somefunction() {
    var value = startProduction(1500.0, 200.0, 10, 1).then(function (x) {
        return (x);
    });
    return value;
}
exports.somefunction = somefunction;
;
function stopProduction() {
    return __awaiter(this, void 0, void 0, function () {
        var currentStateNodeID, session, stateStatus, stateToWrite, changeStateRequest, changeStateRequestToWrite, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentStateNodeID = "ns=6;s=::Program:Cube.Command.Parameter[1]";
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
                    session = openOPCUAConnection();
                    return [4 /*yield*/, session.read({
                            nodeID: currentStateNodeID,
                            attributeId: opcua.AttributeIds.Value,
                        })];
                case 4:
                    stateStatus = _a.sent();
                    if (stateStatus == 2) {
                        stateToWrite = [{
                                nodeID: stateNodeID,
                                attributeId: opcua.AttributeIds.Value,
                                indexRange: null,
                                value: {
                                    value: {
                                        dataType: opcua.DataType.Int,
                                        value: stopProductionCommand
                                    }
                                }
                            }];
                        session.write(stateToWrite);
                        changeStateRequest = true;
                        changeStateRequestToWrite = [{
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
                    }
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
                    return [3 /*break*/, 8];
                case 7:
                    err_4 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_4);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.stopProduction = stopProduction;
;
function getMaintenanceStatus() {
    return __awaiter(this, void 0, void 0, function () {
        var maintenanceStatusNodeID, session, stateStatus, err_5;
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
                    session = openOPCUAConnection();
                    return [4 /*yield*/, session.read({
                            nodeID: maintenanceStatusNodeID,
                            attributeId: opcua.AttributeIds.Value,
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
                    err_5 = _a.sent();
                    console.log("Ohh no something went wrong when opening connection ", err_5);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getMaintenanceStatus = getMaintenanceStatus;
;