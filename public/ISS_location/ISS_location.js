// Making map and tiles
var map = L.map("map").setView([0, 0], 4);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org.copyright">Openstreetmap</a>';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

// Custom marker
const issIcon = L.icon({
    iconUrl: 'International_Space_Station.svg.png',
    iconSize:     [50, 32], // size of the icon
    iconAnchor:   [25, 16], // point of the icon which will correspond to marker's location
});

// Making a marker
let marker = L.marker([0, 0],{icon: issIcon}).addTo(map);
let firstTime = true;

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data)
  
  // DESTRUKTURYZACJA
    const { latitude, longitude, altitude } = data;

  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    map.setView([latitude, longitude]);
    firstTime = false;
  }

  document.getElementById("lat").innerText = latitude.toFixed(3);
  document.getElementById("lon").innerText = longitude.toFixed(3);
  document.getElementById("alt").innerText = altitude.toFixed(3);
}

getISS()

setInterval(getISS, 1000);
