import 'dotenv/config'
import express from 'express';
import Datastore from 'nedb'
import fetch from 'node-fetch';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }))
app.listen(port, () =>
  console.log(`server is at: http://localhost:${port}.`)
)

const database = new Datastore('database.db')
database.loadDatabase()

// OPEN WEATHER AND AIR QUALITY APIS - get data from apis via proxy server to avoid CORS errors, instal node-fetch via npm to allow use of fetch() on server side.
app.get('/logs/weather/:latlon', async (request, response) => {
  console.log(request.params)
  const latlon = request.params.latlon.split(",")
  console.log(latlon)
  let lat = latlon[0]
  let lon = latlon[1]
  
  const api_key = process.env.API_KEY
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
  const weather_response = await fetch(weather_url)
  const weather_data = await weather_response.json()
 
  const air_url = `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}`
  const air_response = await fetch(air_url)
  const air_data = await air_response.json()
  
  const data = {
    weather: weather_data,
    air: air_data
  }
  response.json(data)
})

// POST DATA THAT I'VE GOT FROM APIS(via server) TO DATABASE
app.post('/api', (request, response) => {
    const data = request.body
    const timestamp = Date.now()
    data.timestamp = timestamp
    database.insert(data)
    response.json(data)
})

// DISPLAY DATABASE DATA BACK ON PAGE
app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    response.json(data)
  })
})
