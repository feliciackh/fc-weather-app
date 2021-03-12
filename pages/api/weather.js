const weatherAPIKey = process.env.WEATHER_API_KEY;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${weatherAPIKey}&units=metric`;

export default function handler(req, res) {
  fetch(weatherUrl)
    .then(response => response.json())
    .then(data =>
      res.status(200).json({weather: data.weather[0].main})
    )
    .catch(() => {
      console.log('Error')
    });
}