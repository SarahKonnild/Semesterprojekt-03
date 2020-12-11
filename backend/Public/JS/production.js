/** 
 * @author Kasper Svane, Simon Quvang and Sarah Manon Pradel
 * 
 * Javascript for Production HTML
*/

//Alert with close function
$(document).ready(function () {
    $(".close").click(function () {
        $("#myAlert").alert("close");
    });
});

//Enable Tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

document.addEventListener("DOMContentLoaded", setupRefresh, false);

//Get "Live Data" from the API
function setupRefresh() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:5000/brewster/getSubValues", requestOptions)
        .then(response => response.text())
        .then(result => addDataToTable(result))
        .catch(error => console.log('error', error));

    setTimeout(setupRefresh, 5000); // milliseconds
}

//Fetch the getSubValues API
function fetchData(params) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:5000/brewster/getSubValues", requestOptions)
        .then(response => response.text())
        .then(result => addDataToTable(result))
        .catch(error => console.log('error', error));
};

//Function to insert all values from the getSubValues API into the table and the table setup
function addDataToTable(jsonData) {
    jsonData = JSON.parse(jsonData)

    let label = ['Batch ID', 'Batch Size', 'Beer Type', 'Production Speed', 'Machine State', 'Produced'];
    let valueID = ['showId', 'showSize', 'showType', 'showSpeed', 'showState', 'showProduced'];
    console.log(jsonData);
    let dataTable = []
    dataTable.push(jsonData.batchNumberNodeID);
    dataTable.push(jsonData.batchSizeNodeID);
    dataTable.push(jsonData.beerTypeNodeID);
    dataTable.push(jsonData.getCurrentProductionSpeedNodeID);
    dataTable.push(jsonData.currentStateNodeID);
    dataTable.push(jsonData.producedNodeID);

    for (let i = 0; i < valueID.length; i++) {
        document.getElementById(valueID[i]).value = dataTable[i];
    }
}

//The function for all the calculation for the Simulator
function calcOptimal() {
    let batchSize = parseInt(document.getElementById("simSize").value);
    let amountValid = parseInt(document.getElementById("amountValid").value);
    let allottedTime = parseInt(document.getElementById("allottedTime").value);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({ "batch": batchSize, "margin": amountValid, "time": allottedTime })
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://localhost:5000/brewster/calculateOptimalSpeedUsingValids", requestOptions)
        .then(response => {
            if (response.status != 200) throw new Error("Bad request " + response.status)
            return response.text()
        })
        .then(result => {
            console.log(result)
            let speedString = result.split(":")[1]
            let finalResult = speedString.substring(0, speedString.length - 1)
            document.getElementById("optimalSpeed").value = finalResult
            setTimeout(recolor("optimalSpeed", "green"), 5000);
            setTimeout(recolor("optiLabel", "green"), 5000);
        })
        .catch(error => {
            document.getElementById("optimalSpeed").value = "Impossible configuration";
            setTimeout(recolor("optimalSpeed", "crimson"), 5000);
            setTimeout(recolor("optiLabel", "crimson", 5000));
            console.log('error', error)
        });
}

//Change the border for correct or impossible optimal speed in the Simulator
function recolor(element, color) {
    document.getElementById(element).style.borderColor = color;
}

//Save all the inputted data from the "Manage Production" to the database
function saveToDatabase(raw, interval) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    console.log(raw);
    fetch("http://localhost:5000/batches/add", requestOptions)
        .then(response => response.text())
        .then(result => clearInterval(interval))
        .catch(error => console.log('error', error));
}

//Start the production
function startProduction() {
    let batchID = parseInt(document.getElementById("batchID").value);
    let beerType = document.getElementById("beerTypes").value;
    let batchSize = document.getElementById("batchSize").value;
    let speed = document.getElementById("speed").value;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ "beers": batchSize, "speed": speed, "batchNumber": batchID, "beerType": beerType });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:5000/brewster/startProduction", requestOptions)
        .then(response => response.text())
        .then(result => {
            let interval = setInterval(function () {
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch("http://localhost:5000/brewster/machineStatus", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        let json = JSON.parse(result)
                        if (json.statusCode != 200) throw new Error("not supported");
                        if (json.state == 17) {
                            let requestOptions = {
                                method: 'GET',
                                redirect: 'follow'
                              };
                              
                              fetch("http://localhost:5000/brewster/getProductionCount", requestOptions)
                                .then(response => response.text())
                                .then(result => {
                                    let produced = JSON.parse(result)
                                    let rawToDatabase = JSON.stringify({
                                        "batchNumber": batchID,
                                        "beerType": beerType,
                                        "batchSize": batchSize,
                                        "acceptable": produced.acceptable,
                                        "defects": produced.defective,
                                        "productionSpeed": speed
                                    });
                                    saveToDatabase(rawToDatabase, interval)
                                })
                                .catch(error => console.log('error', error));
                        };
                        console.log(JSON.parse(result).state)
                    })
                    .catch(error => console.log('error', error));
            }, 5000)
            myAlert("The production was started", "alert-success")
        })
        .catch(error => myAlert("The production could not be started. \n" + error, "alert-danger"));
}

//Stop the Production
function stopProduction() {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:5000/brewster/stopProduction", requestOptions)
        .then(response => response.text())
        .then(result => myAlert("The production was stopped successfully.", "alert-success"))
        .catch(error => myAlert("The production could not be stopped. \n" + error, "alert-danger"));
}

//Reset the Production
function resetProduction() {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://localhost:5000/brewster/resetProduction", requestOptions)
        .then(response => response.text())
        .then(result => myAlert("The machine was reset successfully.", "alert-success"))
        .catch(error => myAlert("The machine could not be reset. \n" + error, "alert-danger"));
}

//Alert to be displayed
function myAlert(message, alerttype) {
    $('#alert').append('<div id="alertdiv" class="alert ' + alerttype + ' alert-dismissible fade show" role="alert">' + message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
    $('#alert').css("display", "");
}
