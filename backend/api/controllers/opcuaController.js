
const nodeOPCUA = require ('../../nodeopcua.ts');

exports.startProduction = async function(req,res){
    // TODO Add some way of getting the data from the req to the function call
    let someValue = await nodeOPCUA.startProduction();
    res.send("Production started - " + someValue)
    res.end;
};

exports.stopProduction = async function(req,res){
    returnValue = await nodeOPCUA.stopProduction();
    res.send("Production stopped! " + returnValue);
    res.end;
}

exports.resetProduction = async function(req, res){
    returnValue = await nodeOPCUA.resetProduction();
    res.send("Brewser Machine reset " + returnValue);
    res.end;
}

exports.detectMaintenanceStatus = async function(req,res){
    returnValue = await nodeOPCUA.getMaintenanceStatus();
    res.send("Maintenance Status: " + "\n" + returnValue);
    res.end;
}


