//REQUIRES A MARGIN AND BATCH SIZE TO BE ENTERED (PERCENT) AND 
exports.calculateErrorSpeed = function(req,res){
    let batch = req.body.batch;
    let margin = req.body.margin;
    let amount = (margin/100)*batch;
    let speed = (6250*((39*amount)/3125 + 1212721/25000000)^(1/2))/39 - (1645/156);
    res.send({"speed":speed});
}

//REQUIRES A SPEED TO BE SENT IN. WILL RETURN A MARGIN IN PERCENTAGE
exports.cacluateErrorMargin = function(req,res){
    let speed = req.body.speed;
    //Sends the error margin in percentage of beers produced
    let margin = ((3.12*Math.pow(10,-3)*Math.pow(speed,2)+0.0658*speed-3.54)/speed)*100;
    res.send({"margin":margin});
}

//REQUIRES A BATCH SIZE TO BE SENT IN AND A MARGIN IN PERCENTAGE. WILL RETURN AN AMOUNT OF ERROR BEERS.
exports.calculateAmountOfErrors = function(req,res){
    let margin = req.body.margin;
    let batch = req.body.batch;
    let amount = (margin/100)*batch;
    res.send({"errors":amount});
}

//REQUIRES A BATCH SIZE AND A SPEED INDICATION. WILL RETURN AN AMOUNT OF TIME IN MINUTES.
exports.calculateEstimatedProductionTime = function(req,res){
    let batch = req.body.batch;
    let speed = req.body.speed;
    let time = batch/speed;   
    res.send({"time":time});
}

//REQUIRES A BATCH SIZE, A MAXIMUM ACCEPTABLE ERROR MARGIN AND A MAXIMUM PRODUCTION TIME IN MINUTES. WILL RETURN THE LOWEST SPEED POSSIBLE FOR THIS CONFIGURATION.
exports.calculateOptimalSpeed = function(req,res){
    let batch = req.body.batch;
    let margin = req.body.margin;
    let time = req.body.time;
    let speed = time/batch;

    let calcMarg = ((3.12*Math.pow(10,-3)*Math.pow(speed,2)+0.0658*speed-3.54)/speed)*100;

    if(calcMarg > margin){
        //IF THE CALCULATED ERROR MARGIN IS BIGGER THAN THE ACCEPTABLE ONE (user-defined), THEN THIS IS A BAD REQUEST; THE SPEED IS NOT ALLOWED FOR THE GIVEN MARGIN
        res.status(400).send('Bad Request');
    }else if( calcMarg == margin || calcMarg < margin){
        //IF THE CALCULATED ERROR MARGIN IS THE SAME AS THE SPECIFIED MARGIN, NO PROBLEMOS
        res.send({"speed":speed});
    }
}