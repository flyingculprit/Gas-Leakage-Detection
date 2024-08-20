fetch(
  "https://sheets.googleapis.com/v4/spreadsheets/1u3wX-XdNRbYvdKQKVlWsua74lSUJNK3gQWlGN2YcbA8/values/Sheet1!A2:D5000?key=AIzaSyB-IWxoVoZYVDYwg5L_ZK23Mox0JR2sFEU"
)
  .then((response) => response.json())
  .then((data) => {
    const rows = data.values;
    // Reverse the order of rows
    rows.reverse();

    console.log(rows);
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    rows.forEach((row) => {
      const newRow = document.createElement("tr");
      row.forEach((cell) => {
        const newCell = document.createElement("td");
        newCell.textContent = cell;
        newRow.appendChild(newCell);
      });
      tableBody.appendChild(newRow);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // You can implement your authentication logic here
    // For simplicity, let's assume a hardcoded username and password
    const hardcodedUsername = "admin";
    const hardcodedPassword = "selvalaxmi";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      // Redirect to the page with the table upon successful login
      window.location.href = "table.html";
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
