let net = require('net');
let client = net.connect(8000, 'localhost');


client.setEncoding('utf8');
import * as nodeOPCUA from "./Semesterprojekt-03/backend/nodeopcua.js";

exports.startProduction = function(req,res){
    res.send("Ah yes Daddy Svane, I work");
    let data = JSON.stringify(req.body);
    console.log(data);

    nodeOPCUA.startProduction(1500.0, 200.0, 10, 1);
}

exports.stopProduction = function(req,res){
    client.write(req.url + "\n");
}

exports.detectMaintenanceStatus = function(req,res){
    // let server = net.createServer(function(client){
    //     client.on("data", function(data){
    //         console.log("Et eller andet smart" + data);
    //         client.end();
    //     })
    // });
    // server.listen(8000, function(){
    //    console.log("Listening on port 8000");
    // });
    res.send("Ah yes Daddy Svane, I work");
    let data = JSON.stringify(req.body);
    console.log(data);
    client.write(req.url + ", " + data + "\n");
    res.end();
}

exports.detectedStatus = function(req,res){
    console.log("Daddy Svane er kommet :3")
    try{
        if ( req.method == "POST" ) {
            let strBody = "";
            req.on("data", function(chunk) {
                strBody += chunk;
            });

            req.on("end", function() {
                console.log("Received posted data: " + strBody);
            });
        } else {
            console.dir(req);
        }
    } catch( ex ) {
        console.dir(ex);
    }
    // let data = JSON.stringify(req.body);
    // console.log(data + "Pølse");
    // res.send(data);
}

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

