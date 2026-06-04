const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./presentation/routes/authRoutes');
const biodataRoutes = require('./presentation/routes/biodataRoutes');
const adminRoutes = require('./presentation/routes/adminRoutes');
const { errorHandler } = require('./presentation/middlewares/errorMiddleware');
const { NotFoundError } = require('./shared/exceptions');

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/biodata', biodataRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} tidak ditemukan`));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
