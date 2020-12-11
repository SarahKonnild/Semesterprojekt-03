
const nodeOPCUA = require ('../../nodeopcua.ts');

/**
 * @author Simon Quvang
 * 
 * 
 * @param req this parameter must include a JSON formatted object: {"beers":int, "speed":int, "batchnumber":int, "beertype":int}
 * @param res this parameter will send back a JSON formatted object: {"statusCode":int, "measage":string}
*/
exports.startProduction = async function(req,res){
    //beers, productionSpeed, batchnumber, beerType
    let someValue = await nodeOPCUA.startProduction(req.body.beers, req.body.speed, req.body.batchNumber, req.body.beerType);
    res.send(someValue)
    res.end;
};
/**
 * @author Simon Quvang
 * 
 * 
 * @param req Dosent take any additional parameters
 * @param res this parameter will send back a JSON formatted object: {"statusCode":int, "measage":string}
*/
exports.stopProduction = async function(req,res){
    returnValue = await nodeOPCUA.stopProduction();
    res.send(returnValue);
    res.end;
}
/**
 * @author Simon Quvang
 * 
 * 
 * @param req Dosent take any additional parameters
 * @param res this parameter will send back a JSON formatted object: {"statusCode":int, "measage":string}
*/
exports.resetProduction = async function(req, res){
    returnValue = await nodeOPCUA.resetProduction();
    res.send(returnValue);
    res.end;
}
/**
 * @author Simon Quvang
 * 
 * 
 * @param req this function do not need anything passed along with the get request
 * @param res this parameter will send back a JSON formatted object: {"statusCode":int, "measage":string, "maintenacneStatus": value}
*/
exports.detectMaintenanceStatus = async function(req,res){
    returnValue = await nodeOPCUA.getMaintenanceStatus();
    res.send(returnValue);
    res.end;
}
/**
 * @author Simon Quvang
 * 
 * 
 * @param req additional
 * @param res this parameter will send back a JSON formatted object: {"statusCode":int, "measage":string}
*/
exports.getProductionCount = async function(req,res){
    returnValue = await nodeOPCUA.getProducedAmount();
    res.send(returnValue);
    res.end;
}

/**
 * @author Simon Quvang
 * 
 * @param res this parameter will send back a JSON formatted object of the current machine state
*/
exports.getCurrentStatePublic = async function(req,res){
    returnValue = await nodeOPCUA.getCurrentStatePublic();
    res.send(returnValue);
    res.end;
}

/**
 * @author Simon Quvang
 * 
 * 
 * @param req this parameter must include a JSON formatted object: 
 * {"producedNodeID":int, "currentStateNodeID":int, "batchNumberNodeID":int, "batchSizeNodeID":int
 * beerTypeNodeID":int, maintenanceStatusNodeID":int, getCurrentProductionSpeedNodeID":int, defectiveProductsNodeId":int, acceptableProductsNodeId":int} 
*/
exports.getSubValues = async function(req,res){
    returnValue = await nodeOPCUA.getSubValues();
    res.send(returnValue);
    res.end;
}


