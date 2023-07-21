import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});
const apiKey = '9b74130f44b38dfee494e2c58baaac85'; // Замените на свой API-ключ OpenWeatherMap

app.get('/weather', async (req: Request, res: Response) => {
  try {
    const city = req.query.city; // Параметр city передается в запросе, например: /weather?city=London
    if (!city) {
      return res.status(400).json({ error: 'City parameter is missing.' });
    }

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
