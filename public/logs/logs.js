
async function getData() {
  const response = await fetch("/api");
  const data = await response.json();
  console.log(data);

  data.forEach((item) => {
    const root = document.createElement("div");
    root.id = 'container-div'
    const geo = document.createElement("div");
    const date = document.createElement("div");
    
    geo.textContent = `lat = ${item.lat}, lon = ${item.lon}`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;

    root.append(geo, date);
    document.body.append(root);
  });

  // MAKING MAP AND TILES
  var map = L.map("map").setView([0, 0], 2);
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org.copyright">Openstreetmap</a>';
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(map);

  // MAKING MARKERS

  data.forEach(item => {
    const marker = L.marker([item.lat, item.lon]).addTo(map);

    let txt

    if (item.airData.value < 0) {
      txt = `lon = ${item.lon}, lat = ${item.lat}, temps = ${item.weatherData.temp}, air = no value`
    } else {
      txt = `lon = ${item.lon}, lat = ${item.lat}, temps = ${item.weatherData.temp}, air = ${item.airData[0].value}`
    }
    
    marker.bindPopup(txt)
  })
}

getData();
      