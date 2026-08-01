const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'agendaglass-api' });
});

// Rotas serão adicionadas aqui nas próximas fases (auth, bookings...)

module.exports = app;