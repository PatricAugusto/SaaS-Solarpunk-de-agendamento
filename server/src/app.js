const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const eventTypeRoutes = require('./routes/eventTypeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'agendaglass-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/event-types', eventTypeRoutes);
app.use('/api/bookings', bookingRoutes);

module.exports = app;