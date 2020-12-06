
const nodeOPCUA = require ('../../nodeopcua.ts');

exports.startProduction = async function(req,res){
    // TODO Add some way of getting the data from the req to the function call
    //beers, productionSpeed, batchnumber, beerType
    let someValue = await nodeOPCUA.startProduction(req.body.beers, req.body.speed, req.body.batchnumber, req.body.beerType);
    res.send(someValue)
    res.end;
};

exports.stopProduction = async function(req,res){
    returnValue = await nodeOPCUA.stopProduction();
    res.send(returnValue);
    res.end;
}

exports.resetProduction = async function(req, res){
    returnValue = await nodeOPCUA.resetProduction();
    res.send(returnValue);
    res.end;
}

exports.detectMaintenanceStatus = async function(req,res){
    returnValue = await nodeOPCUA.getMaintenanceStatus();
    res.send(returnValue);
    res.end;
}
exports.getProductionCount = async function(req,res){
    returnValue = await nodeOPCUA.getProducedAmount();
    res.send(returnValue);
    res.end;
}


