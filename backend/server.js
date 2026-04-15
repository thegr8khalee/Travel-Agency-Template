require('dotenv').config();
const express = require('express');
const cors = require('cors');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes
app.use('/api/search', searchRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Travel Agency API Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Running on: http://localhost:${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
🔗 API Base: http://localhost:${PORT}/api

Available Endpoints:
  GET /api/health          - Health check
  GET /api/search/flights  - Search flights
  GET /api/search/hotels   - Search hotels
  GET /api/search/locations - Location autocomplete
  GET /api/search/airlines - Airline info
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

module.exports = app;
