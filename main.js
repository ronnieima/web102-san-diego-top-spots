const FIELDS = ["name", "description", "location"];

$(document).ready(function () {
  // Initialize Leaflet Map

  // config map

  // magnification with which the map will start
  const zoom = 12;
  // co-ordinates
  const lat = 32.766963106704964;
  const lng = -117.10607737976294;
  // calling map
  const map = L.map("map", {}).setView([lat, lng], zoom);

  // Used to load and display tile layers on the map
  // Most tile servers require attribution, which you can set under `Layer`
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Load JSON
  $.getJSON("data.json", function (spots) {
    spots.map((spot) => {
      const newRow = document.createElement("tr");

      for (const field of FIELDS) {
        const newCell = document.createElement("td");

        if (field === "location") {
          const [lat, lng] = spot[field]; // Destructuring the "location" array

          // add marker to map
          const marker = L.marker([lat, lng]).addTo(map);
          marker.bindPopup(
            `<h2 style="font-weight:bold">${spot.name}</h2><p>${spot.description}</p>`,
          );

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
