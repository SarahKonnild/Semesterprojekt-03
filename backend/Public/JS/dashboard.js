// Slide-Up script
function scrollWin(x, y) {
    window.scrollBy(x, y);
}
document.addEventListener("DOMContentLoaded", fetchData, false);
function fetchData() {
    fetch('http://localhost:5000/brewster/getSubValues')
    .then(response => {
        if(!response.ok) {
            throw Error('Error');
        }
        return response.json();
    })
    .then(data => {
            console.log(data.data);
            // EXTRACT VALUE FOR HTML HEADER.
            // ('Book ID', 'Book Name', 'Category' and 'Price')
            let col = [];
            for (let i = 0; i < data.data.length; i++) {
                for (let key in data.data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
                }
            }

        // CREATE DYNAMIC TABLE.
        let table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        let tr = table.insertRow(-1); // TABLE ROW.

        for (let i = 0; i < col.length; i++) {
            let th = document.createElement("th"); // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (let i = 0; i < data.data.length; i++) {
            tr = table.insertRow();
            for (var j = 0; j < col.length; j++) {
                let tabCell = tr.insertCell();
                tabCell.innerHTML = data.data[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("productionData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        })
}
