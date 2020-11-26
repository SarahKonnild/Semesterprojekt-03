
let nodeOPCUA = require ('../../backend/nodeopcua.ts');

exports.startProduction = function(req,res){
    // TODO Add some way of getting the data from the req to the function call
    let someValue = nodeOPCUA.somefunction();
    console.log(someValue);
    res.send(someValue);
};

exports.stopProduction = function(req,res){
    // TODO Add some form of return message
    nodeOPCUA.stopProduction();
}

exports.detectMaintenanceStatus = function(req,res){
    returnValue = nodeOPCUA.getMaintenanceStatus();
    res.send("Ah yes Daddy Svane, I work " + returnValue);
    res.end();
}

