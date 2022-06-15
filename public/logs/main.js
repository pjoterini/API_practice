if ("geolocation" in navigator) {
    console.log("available");
    navigator.geolocation.getCurrentPosition(async (position) => {
    let lat, lon, weatherData, airData 
    try {
      lat = position.coords.latitude.toFixed(2);
      document.getElementById("lat").textContent = lat;
      lon = position.coords.longitude.toFixed(2);
      document.getElementById("lon").textContent = lon;

      // OPEN WEATHER API and AIR
      const apis_url = `/logs/weather/${lat},${lon}`
      const response = await fetch(apis_url)
      const weather_and_air_data = await response.json()
      console.log(weather_and_air_data)
      weatherData = weather_and_air_data.weather.main
      airData = weather_and_air_data.air.results[0].measurements

      const temp = weatherData.temp
      document.getElementById("temp").textContent = temp;
      const min_temp = weatherData.temp_min
      document.getElementById("min-temp").textContent = min_temp;
      const max_temp = weatherData.temp_max
      document.getElementById("max-temp").textContent = max_temp;
      const air = airData[0].parameter
      document.getElementById("air").textContent = air;
      
      // POSTING DATA I GOT TO THE DATABSE
      const data = { lat, lon, weatherData, airData };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response_post = await fetch("/api", options);
      const post_data = await response_post.json();
      console.log(post_data);
    
    } catch (error) {
      console.error('shittt')
      airData = {value : -1}
    }
  });
} else {
  console.log("not available");
}