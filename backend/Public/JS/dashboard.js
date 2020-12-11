// Slide-Up script
function scrollWin(x, y) {
    window.scrollBy(x, y);
}
document.addEventListener("DOMContentLoaded", setupRefresh, false);

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
        // let div = document.createElement("div")
        // div.classList.add('col-sm-4')
        // let card = document.createElement('div')
        // card.classList.add('card')
        // div.appendChild(card)
        // let cardBody = document.createElement('div')
        // cardBody.classList.add('card-body')
        // card.append(cardBody)
        // let h5 = document.createElement('h5')
        // h5.classList('card-title')
        // cardBody.appendChild(h5)
        // let p = document.createElement('p')
        // p.classList('card-text')
        // cardBody.appendChild(p)

        document.getElementById(cardIDs[index]).textContent = dataTable[index]
        // var divContainer = document.getElementById("test");
        // divContainer.innerHTML = "";
        // divContainer.appendChild(div);
    }
}

e