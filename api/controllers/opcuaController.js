
const nodeOPCUA = require ('../../backend/nodeopcua.ts');

exports.startProduction = async function(req,res){
    // TODO Add some way of getting the data from the req to the function call
    let someValue = await nodeOPCUA.startProduction();
    console.log(someValue);
    res.send(someValue);
    res.end;
};

exports.stopProduction = async function(req,res){
    returnValue = await nodeOPCUA.stopProduction();
    res.send(returnValue);
    res.end;
}

exports.detectMaintenanceStatus = async function(req,res){
    returnValue = await nodeOPCUA.getMaintenanceStatus();
    res.send(returnValue);
    res.end;
}
exports.resetProduction = async function(req, res){
    returnValue = await nodeOPCUA.resetProduction();
    res.send(returnValue);
    res.end;
}

