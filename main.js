const FIELDS = ["name", "description", "location"];

$(document).ready(function () {
  $.getJSON("data.json", function (spots) {
    spots.map((spot) => {
      const newRow = document.createElement("tr");

      for (const field of FIELDS) {
        const newCell = document.createElement("td");

        if (field === "location") {
          const [lat, lng] = spot[field]; // Destructuring the "location" array
          const mapLink = document.createElement("a");
          const googleMapsLogo = document.createElement("img");
          googleMapsLogo.src = "images/google-maps-logo.png";
          googleMapsLogo.classList = " w-full h-full";

          mapLink.appendChild(googleMapsLogo);
          mapLink.target = "_blank"; // this opens a new tab on click
          mapLink.href = `https://www.google.com/maps?q=${lat},${lng}`;
          mapLink.classList =
            " flex justify-start size-12 hover:scale-105 transition-all";

          newCell.appendChild(mapLink);
        } else {
          newCell.innerHTML = spot[field];
        }
        newRow.appendChild(newCell);
      }

      const table = document.getElementById("spots-table");
      table.appendChild(newRow);
    });
  });
});
