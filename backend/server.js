// Backend: Node.js mit Express
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const users = [];

app.use(cors());
app.use(express.json());

// Authentifizierung mit JWT
app.post('/login', (req, res) => {
    const { username } = req.body;
    const user = { name: username };
    const accessToken = jwt.sign(user, 'secret_key');
    res.json({ accessToken });
});

// Wetterdaten abrufen
app.get('/weather/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Abrufen der Wetterdaten' });
    }
});
console.log("🔹 API Key:", process.env.WEATHER_API_KEY); // Debug-Log
// Server starten
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
