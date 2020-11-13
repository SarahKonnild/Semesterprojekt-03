let net = require('net');
let client = net.connect(8000, 'localhost');

client.setEncoding('utf8');

exports.startProduction = function(req,res){
    res.send("Ah yes Daddy Svane, I work");
    let data = JSON.stringify(req.body);
    console.log(data);
    client.write(req.url + ", " + data + "\n");
}

exports.stopProduction = function(req,res){
    client.write(req.url + "\n");
}

exports.detectMaintenanceStatus = function(req,res){
    client.write(req.url + "\n");
}

exports.calculateErrorSpeed = function(req,res){
    client.write(req.url + "\n");
}

exports.cacluateErrorMargin = function(req,res){
    client.write(req.url + "\n");
}

exports.calculateOptimalSpeed = function(req,res){
    client.write(req.url + "\n");
}

