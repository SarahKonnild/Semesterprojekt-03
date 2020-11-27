
let nodeOPCUA = require ('../../backend/nodeopcua.ts');

exports.startProduction = async function(req,res){
    // TODO Add some way of getting the data from the req to the function call
    let someValue = await nodeOPCUA.somefunction();
    console.log(someValue);
    res.send(someValue);
};

exports.stopProduction = async function(req,res){
    // TODO Add some form of return message
    await nodeOPCUA.stopProduction();
}

exports.detectMaintenanceStatus = async function(req,res){
    returnValue = await nodeOPCUA.getMaintenanceStatus();
    res.send("Ah yes Daddy Svane, I work " + returnValue);
    res.end();
}

