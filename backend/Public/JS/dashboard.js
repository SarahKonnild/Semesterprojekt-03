/** 
 * @author Kasper Svane, Simon Quvang and Sarah Manon Pradel
 * 
 * Javascript for Dashboard HTML
*/

// Slide-Down script for the button
function scrollWin(x, y) {
    window.scrollBy(x, y);
}

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

//Function to insert all values from the getSubValues API into the table and the table setup
function addDataToTable(jsonData) {

    jsonData = JSON.parse(jsonData)
    
    let cardIDs = ['batchNumber', 'beerType', 'productionSpeed', 'batchSize', 'acceptable', 'defects', 'produced', 'state','maintenance'];

    let dataTable = [];

    dataTable.push(jsonData.batchNumberNodeID)
    dataTable.push(jsonData.beerTypeNodeID)
    dataTable.push(jsonData.getCurrentProductionSpeedNodeID)
    dataTable.push(jsonData.batchSizeNodeID)
    dataTable.push(jsonData.acceptableProductsNodeId)
    dataTable.push(jsonData.defectiveProductsNodeId)
    dataTable.push(jsonData.producedNodeID)
    dataTable.push(jsonData.currentStateNodeID)
    dataTable.push(jsonData.maintenanceStatusNodeID)

    for (let index = 0; index < cardIDs.length; index++) {
        document.getElementById(cardIDs[index]).textContent = dataTable[index]
    }
}