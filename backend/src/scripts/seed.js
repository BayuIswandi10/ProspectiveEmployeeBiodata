require('dotenv').config();
const { sql, poolPromise } = require('../infrastructure/database/mssqlClient');
const bcrypt = require('bcryptjs');
const logger = require('../infrastructure/logging/logger');

async function main() {
  try {
    const pool = await poolPromise;
    const adminEmail = 'admin@biodata.com';
    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Check if admin already exists
    const checkResult = await pool.request()
      .input('email', adminEmail)
      .query(`SELECT id FROM users WHERE email = @email`);

    if (checkResult.recordset.length > 0) {
      logger.info('Admin user already exists. Skipping seed.');
    } else {
      await pool.request()
        .input('email', adminEmail)
        .input('password', hashedPassword)
        .input('role', 'admin')
        .query(`
          INSERT INTO users (email, password, role, created_at, updated_at)
          VALUES (@email, @password, @role, GETDATE(), GETDATE())
        `);
      logger.info('Admin user created successfully');
    }
  } catch (err) {
    logger.error('Error seeding database: ', err);
  } finally {
    sql.close();
  }
}

main();
