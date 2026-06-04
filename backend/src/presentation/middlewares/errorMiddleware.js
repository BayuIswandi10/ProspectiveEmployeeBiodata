const logger = require('../../infrastructure/logging/logger');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Gunakan duck typing (cek err.statusCode & err.isOperational)
  // lebih andal dari instanceof karena menghindari masalah module caching Node.js
  let statusCode = err.statusCode || 500;
  let message = err.isOperational ? err.message : 'Internal Server Error';

  // Tangani MSSQL error secara khusus
  if (err.name === 'RequestError' || err.number) {
    switch (err.number) {
      case 2627:
      case 2601: // Unique constraint violation
        statusCode = 409;
        message = 'Data sudah ada (duplikat)';
        break;
      case 547: // Foreign key constraint
        statusCode = 400;
        message = 'Referensi data tidak valid';
        break;
      default:
        statusCode = 500;
        message = `Database error: ${err.message}`;
    }
  }

  // Log semua error
  if (statusCode >= 500) {
    logger.error(`[${statusCode}] ${req.method} ${req.originalUrl} - ${err.message}`, {
      stack: err.stack,
    });
  } else {
    logger.warn(`[${statusCode}] ${req.method} ${req.originalUrl} - ${err.message}`);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      detail: err.message,
      stack: err.stack,
    }),
  });
};

/**
 * Handle validation errors from express-validator
 */
const { validationResult } = require('express-validator');
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const logger = require('../../infrastructure/logging/logger');
    logger.warn(`[400] Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors: errors.array(),
    });
  }
  next();
};

module.exports = { errorHandler, handleValidationErrors };
