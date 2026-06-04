require('dotenv').config();
const app = require('./app');
const logger = require('./infrastructure/logging/logger');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Ensure logs directory exists
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});
