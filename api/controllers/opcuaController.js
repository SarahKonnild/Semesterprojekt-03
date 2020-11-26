import * as nodeOPCUA from "./Semesterprojekt-03/backend/nodeopcua.js";

exports.startProduction = function(req,res){
    res.send("Ah yes Daddy Svane, I work");
    let data = JSON.stringify(req.body);
    console.log(data);
    nodeOPCUA.startProduction(1500.0, 200.0, 10, 1);
}

exports.stopProduction = function(req,res){
    nodeOPCUA.stopProduction();
}

exports.detectMaintenanceStatus = function(req,res){
    returnValue = nodeOPCUA.getMaintenanceStatus();
    res.send("Ah yes Daddy Svane, I work " + returnValue);
    res.end();
}

