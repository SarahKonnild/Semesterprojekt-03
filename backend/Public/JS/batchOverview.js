document.addEventListener("DOMContentLoaded", append_json, false);

// function get_json_data() {
//   let getBatchesURL = "http://localhost:5000/batches/";
//   fetch(getBatchesURL)
//     .then((res) => res.json())
//     .then((json) => append_json(json));

// }
function append_json(myBooks) {
  var myBooks = [
    {
      _id: {
        $numberInt: "5",
      },
      startTime: "Mon Nov 02",
      endTime: "Mon Nov 02",
      beerType: "IPA",
      batchSize: {
        $numberInt: "400",
      },
      defects: {
        $numberInt: "30",
      },
      productionSpeed: {
        $numberDouble: "400",
      },
      temp: {
        $numberDouble: "20",
      },
      humidity: {
        $numberDouble: "10",
      },
      vibration: {
        $numberDouble: "2",
      },
    },
    {
      _id: {
        $numberInt: "5",
      },
      startTime: "Mon Nov 02 02:26:31 CET 2020",
      endTime: "Mon Nov 02 02:26:31 CET 2020",
      beerType: "IPA",
      batchSize: {
        $numberInt: "400",
      },
      defects: {
        $numberInt: "30",
      },
      productionSpeed: {
        $numberDouble: "400",
      },
      temp: {
        $numberDouble: "20",
      },
      humidity: {
        $numberDouble: "10",
      },
      vibration: {
        $numberDouble: "2",
      },
    },
    {
      _id: {
        $numberInt: "5",
      },
      startTime: "Mon Nov 02 02:26:31 CET 2020",
      endTime: "Mon Nov 02 02:26:31 CET 2020",
      beerType: "IPA",
      batchSize: {
        $numberInt: "400",
      },
      defects: {
        $numberInt: "30",
      },
      productionSpeed: {
        $numberDouble: "400",
      },
      temp: {
        $numberDouble: "20",
      },
      humidity: {
        $numberDouble: "10",
      },
      vibration: {
        $numberDouble: "2",
      },
    },
  ];

  // EXTRACT VALUE FOR HTML HEADER.
  // ('Book ID', 'Book Name', 'Category' and 'Price')
  let col = [];
  for (let i = 0; i < myBooks.length; i++) {
    for (let key in myBooks[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // CREATE DYNAMIC TABLE.
  let table = document.createElement("table");
  let thead = document.createElement('thead')
  thead.classList.add('thead-dark')
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

    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell();
      if (j == 0) {
        tabCell.innerHTML = myBooks[i]._id.$numberInt;
      }
      if (j == 1) {
        tabCell.innerHTML = myBooks[i][col[j]];
      }
      if (j == 2) {
        tabCell.innerHTML = myBooks[i][col[j]];
      }
      if (j == 3) {
        tabCell.innerHTML = myBooks[i][col[j]];
      }
      if (j == 4) {
        tabCell.innerHTML = myBooks[i].batchSize.$numberInt;
      }
      if (j == 5) {
        tabCell.innerHTML = myBooks[i].defects.$numberInt;
      }
      if (j == 6) {
        tabCell.innerHTML = myBooks[i].productionSpeed.$numberDouble;
      }
      if (j == 7) {
        tabCell.innerHTML = myBooks[i].temp.$numberDouble;
      }
      if (j == 8) {
        tabCell.innerHTML = myBooks[i].humidity.$numberDouble;
      }
      if (j == 9) {
        tabCell.innerHTML = myBooks[i].vibration.$numberDouble;
      }
    }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("mytable");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}
