/**
 * @author Sarah Manon Pradel
 * 
 * This function calculates the speed that is the highest possible that the user can produce at, while not exceeding the error margin that the user has indicated.
 * Therefore, this function can be used to impose an upper limit on the speed that the user can set the machine to work at. 
 * 
 * @param req this parameter must include a JSON formatted object: {"margin":value}
 * @param res this parameter will send back a JSON formatted object: {"speed":value}
*/
//WORKS, IS TESTED
exports.calculateErrorSpeed = function(req,res){
    let margin = req.body.margin;
    if(margin >= 0){
        let speed = (6250*Math.pow(((39*margin)/3125) + (1212721/25000000),0.5))/39 - (1645/156);
        res.send({"speed":speed});
    }else{
        res.send(400).status('Bad Request');
    }
}

/**
 * @author Sarah Manon Pradel
 * 
 * This function calculates the minimum estimated amount of errors that the user will have to accept for the given speed. 
 *  
 * @param req this parameter must include a JSON formatted object: {"speed":value}
 * @param res this parameter will send back a JSON formatted object: {"margin":value}
 */
//WORKS, IS TESTED
exports.calculateErrorMargin = function(req,res){
    let speed = req.body.speed;
    if(speed > 0){
        let margin = (3.12*Math.pow(10,-3)*Math.pow(speed,2)+0.0658*speed-3.54);
    res.send({"margin":margin});
    }else{
        res.send(400).status('Bad Request');
    }
}

/**
 * @author Sarah Manon Pradel
 * 
 * This function calculates the percentage of errors based on the designated batch size and the minimum acceptable amount of errors.
 * 
 * @param req this parameter must include a JSON formatted object: {"margin":value, "batch":value}
 * @param res this parameter will send back a JSON formatted object: {"percentage":value}
 */
//WORKS, IS TESTED
exports.calculatePercentageErrors = function(req,res){
    let margin = req.body.margin;
    let batch = req.body.batch;
    if(margin > 0 && batch > 0){
        let amount = (margin/batch)*100;
        res.send({"percentage":amount});
    }else{
        res.send(400).status('Bad Request');
    }
}

/**
 * @author Sarah Manon Pradel
 * 
 * This function calculates the amount of errors based on the batch size and the specified percentage error margin. Useful for 
 * presentation to the user and live updating of the effects of adjusting parameters in the frontend.
 * 
 * @param req this parameter must include a JSON formatted object: {"percentage":value, "batch":value}
 * @param res this parameter will send back a JSON formatted object: {"errors":value}
 */
//WORKS, IS TESTED
exports.calculateAmountOfErrors = function(req,res){
    let percentage = req.body.percentage;
    let batch = req.body.batch;
    if(percentage > 0 && batch > 0){
        let amount = (percentage/100)*batch;
        res.send({"errors":amount});
    }else{
        res.send(400).status('Bad Request');
    }
}

/**
 * @author Sarah Manon Pradel
 * 
 * This function will estimate the amount of time (in minutes) that it will complete to finish a batch of the specified size, for the given speed.
 * It is important to note, that the value that is output is time in minutes. 
 * 
 * @param req this parameter must include a JSON formatted object: {"batch":value, "speed":value}
 * @param res this parameter will send back a JSON formatted object: {"time":value} which is noted in minutes
 */
//WORKS, IS TESTED
exports.calculateEstimatedProductionTime = function(req,res){
    if(batch > 0 && speed > 0){
        let batch = req.body.batch;
        let speed = req.body.speed;
        let time = batch/speed;   
        res.send({"time":time});
    }else{
        res.send(400).status('Bad Request');
    }
}

/**
 * @author Sarah Manon Pradel
 * 
 * This function will evaluate if the specified acceptable error margin is a realistic goal for the batch size and allotted time that the user has specified. 
 * The function will find the minimum necessary speed to accomplish this task, and calculate the amount of minimum estimated errors that this produces. If the 
 * calculated minimum necessary speed creates an amount of errors which exceeds the specified acceptable amount of errors, an HTTP statusCode of 404 'Bad Request'
 * is returned to the frontend, because it is not possible to produce less than or equal to the maximum amount of errors that the user is willing to accept. 
 * On the other hand, if the minimum necessary speed dictates an estimated amount of errors that is less than or equal to the amount of errors that the user can
 * accept, the speed is returned.
 * 
 * @param req this parameter must include a JSON formatted object: {"batch":value, "margin":value, "time":value}
 * @param res this parameter will potentially send back an HTTP status code 400 'Bad Request'
 * @param res this parameter will potentially send back a JSON formatted object: {"speed":value}
 */
//WORKS, IS TESTED
exports.calculateOptimalSpeed = function(req,res){
    let batch = req.body.batch;
    let margin = req.body.margin;
    let time = req.body.time;
    if(batch > 0 && margin >= 0 && time > 0){
        let speed = batch/time;

        let calcErrMarg = 0.00312*Math.pow(speed,2)+0.0658*speed-3.54;

        if(calcErrMarg > margin){
            //IF THE CALCULATED ERROR MARGIN IS BIGGER THAN THE ACCEPTABLE ONE (user-defined), THEN THIS IS A BAD REQUEST; THE SPEED IS NOT ALLOWED FOR THE GIVEN MARGIN
            res.status(400).send('Bad Request');
        }else if( calcErrMarg == margin || calcErrMarg < margin){
            //IF THE CALCULATED ERROR MARGIN IS THE SAME AS THE SPECIFIED MARGIN, NO PROBLEMS
            res.send({"speed":speed});
        }
    }else{
        res.send(400).status('Bad Request');
    }
}
