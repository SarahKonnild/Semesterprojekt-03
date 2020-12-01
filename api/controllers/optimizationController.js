exports.calculateErrorSpeed = function(req,res){
    res.send("Ah yes Daddy Svane, I work");
    let data = JSON.stringify(req.body);
    console.log(data);
    client.write(req.url + ", " + data + "\n");
}

exports.cacluateErrorMargin = function(req,res){
    res.send("Ah yes Daddy Svane, I work");
    let data = JSON.stringify(req.body);
    console.log(data);
    client.write(req.url + ", " + data + "\n");
}

exports.calculateOptimalSpeed = function(req,res){
    res.send("Ah yes Daddy Svane, I work");
    let data = JSON.stringify(req.body);
    console.log(data);
    client.write(req.url + ", " + data + "\n");
}