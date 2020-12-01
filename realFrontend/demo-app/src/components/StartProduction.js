export function startProduction(beerType, productionSpeed, batchSize) {
    //Check if all data is received correctly:
    console.log("Beertype is: " + beerType + "\n" +
        "Production Speed is: " + productionSpeed + "\n" +
        "Batch Size is: " + batchSize + "\n")

    //AJAX method attempt
    //https://www.w3schools.com/js/js_ajax_intro.asp

    //First make a XMLHttpRequest object which will handle all the data
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", )
}