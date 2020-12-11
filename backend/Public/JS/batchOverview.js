document.addEventListener("DOMContentLoaded", get_json_data, false);

function get_json_data() {
  let getBatchesURL = "http://localhost:5000/batches/";
  fetch(getBatchesURL)
    .then((res) => res.json())
    .then((json) =>
      append_json(json));

}
function append_json(myBooks) {

  // EXTRACT VALUE FOR HTML HEADER.
  // ('Book ID', 'Book Name', 'Category' and 'Price')
  let col = ['Batch ID', 'Beer Type', 'Batch Size', 'Acceptable Beers', 'Defects Beers', 'Production Speed'];

  // CREATE DYNAMIC TABLE.
  let table = document.createElement("table");
  let thead = document.createElement('thead')
  thead.classList.add('thead-dark')
  thead.classList.add('vw-100')
  table.appendChild(thead)

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  let tr = thead.insertRow(-1); // TABLE ROW.

  for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th"); // TABLE HEADER.
    th.innerHTML = col[i];
    tr.appendChild(th);
  }
  let tbody = document.createElement('tbody')
  table.classList.add('table-hover')
  table.appendChild(tbody)

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (let i = 0; i < myBooks.length; i++) {
    tr = tbody.insertRow();
    for (let j = 0; j < col.length; j++) {
      let tabCell = tr.insertCell();
      tabCell.classList.add('text-center')
      switch (j) {
        case 0:
          tabCell.innerHTML = myBooks[i].batchNumber;
          break;
        case 1:
          tabCell.innerHTML = myBooks[i].beerType;
          break;
        case 2:
          tabCell.innerHTML = myBooks[i].batchSize;
          break;
        case 3:
          tabCell.innerHTML = myBooks[i].acceptable;
          break;
        case 4:
          tabCell.innerHTML = myBooks[i].defects;
          break;
        case 5:
          tabCell.innerHTML = myBooks[i].productionSpeed;
          break;

        default:
          break;

      }
    }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("mytable");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}