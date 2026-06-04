/**
 * ILogger - Domain Interface
 * Kontrak untuk layanan logging
 */
class ILogger {
  info(message, meta) {
    throw new Error('Method not implemented: info');
  }

  warn(message, meta) {
    throw new Error('Method not implemented: warn');
  }

  error(message, meta) {
    throw new Error('Method not implemented: error');
  }
}

module.exports = ILogger;
