const { poolPromise } = require('../database/mssqlClient');

class UserRepository {
  async findByEmail(email) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', email)
      .query(`SELECT * FROM users WHERE email = @email`);
    return result.recordset[0] || null;
  }

  async findById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .query(`SELECT * FROM users WHERE id = @id`);
    return result.recordset[0] || null;
  }

  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', data.email)
      .input('password', data.password)
      .input('role', data.role || 'user')
      .query(`
        INSERT INTO users (email, password, role, created_at)
        OUTPUT INSERTED.*
        VALUES (@email, @password, @role, GETDATE())
      `);
    return result.recordset[0];
  }
}

module.exports = new UserRepository();
