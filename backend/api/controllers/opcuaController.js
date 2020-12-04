
const nodeOPCUA = require ('../../nodeopcua.ts');

exports.startProduction = async function(req,res){
    // TODO Add some way of getting the data from the req to the function call
    //beers, productionSpeed, batchnumber, beerType
    let someValue = await nodeOPCUA.startProduction(req.body.beers, req.body.speed, req.body.batchnumber, req.body.beerType);
    res.send("Production started - " + someValue)
    console.log(req.body)
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
exports.getProductionCount = async function(req,res){
    returnValue = await nodeOPCUA.getProducedAmount();
    res.send(returnValue);
    res.end;
}


