const sql = require('mssql/msnodesqlv8');
const logger = require('../logging/logger');

const config = {
  connectionString: process.env.DB_CONNECTION_STRING || 'Driver={ODBC Driver 17 for SQL Server};Server=Mobile-17\\SQL2019;Database=ProspectiveEmployeeBiodata;Trusted_Connection=yes;'
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    logger.info('Connected to MSSQL Database');
    return pool;
  })
  .catch((err) => {
    logger.error('Database Connection Failed! Bad Config: ', err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise,
};

