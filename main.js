const FIELDS = ["name", "description", "location"];

$(document).ready(function () {
  $.getJSON("data.json", function (spots) {
    spots.map((spot) => {
      const newRow = document.createElement("tr");

      for (const field of FIELDS) {
        if (field === "location") {
          const [lat, lng] = spot[field]; // Destructuring the "location" array
          const mapLink = document.createElement("a");
          mapLink.innerText = "Open in Google Maps";
          mapLink.target = "_blank"; // this opens a new tab on click
          mapLink.href = `https://www.google.com/maps?q=${lat},${lng}`;

          newRow.appendChild(mapLink);
        } else {
          const newCell = document.createElement("td");
          newCell.innerHTML = spot[field];
          newRow.appendChild(newCell);
        }
      }

      const table = document.getElementById("spots-table");
      table.appendChild(newRow);
    });
  });
});
