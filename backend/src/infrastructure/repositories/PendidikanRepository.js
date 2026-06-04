const { poolPromise } = require('../database/mssqlClient');

class PendidikanRepository {
  async findByBiodataId(biodataId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('biodataId', biodataId)
      .query(`SELECT * FROM pendidikan WHERE biodata_id = @biodataId`);
    return result.recordset;
  }

  async findById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .query(`SELECT * FROM pendidikan WHERE id = @id`);
    return result.recordset[0] || null;
  }

  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('biodata_id', data.biodata_id)
      .input('jenjang', data.jenjang)
      .input('nama_institusi', data.nama_institusi)
      .input('jurusan', data.jurusan)
      .input('tahun_lulus', data.tahun_lulus)
      .input('ipk', data.ipk)
      .query(`
        INSERT INTO pendidikan (biodata_id, jenjang, nama_institusi, jurusan, tahun_lulus, ipk)
        OUTPUT INSERTED.*
        VALUES (@biodata_id, @jenjang, @nama_institusi, @jurusan, @tahun_lulus, @ipk)
      `);
    return result.recordset[0];
  }

  async update(id, data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .input('jenjang', data.jenjang)
      .input('nama_institusi', data.nama_institusi)
      .input('jurusan', data.jurusan)
      .input('tahun_lulus', data.tahun_lulus)
      .input('ipk', data.ipk)
      .query(`
        UPDATE pendidikan
        SET jenjang = @jenjang, nama_institusi = @nama_institusi, jurusan = @jurusan, tahun_lulus = @tahun_lulus, ipk = @ipk
        OUTPUT INSERTED.*
        WHERE id = @id
      `);
    return result.recordset[0];
  }

  async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input('id', id)
      .query(`DELETE FROM pendidikan WHERE id = @id`);
  }

  async deleteByBiodataId(biodataId) {
    const pool = await poolPromise;
    await pool.request()
      .input('biodataId', biodataId)
      .query(`DELETE FROM pendidikan WHERE biodata_id = @biodataId`);
  }

  async createMany(records) {
    if (!records || records.length === 0) return;
    const pool = await poolPromise;
    
    // Simplest way for createMany without table-valued parameters is to loop
    // For small arrays this is perfectly fine.
    for (const data of records) {
      await pool.request()
        .input('biodata_id', data.biodata_id)
        .input('jenjang', data.jenjang)
        .input('nama_institusi', data.nama_institusi)
        .input('jurusan', data.jurusan)
        .input('tahun_lulus', data.tahun_lulus)
        .input('ipk', data.ipk)
        .query(`
          INSERT INTO pendidikan (biodata_id, jenjang, nama_institusi, jurusan, tahun_lulus, ipk)
          VALUES (@biodata_id, @jenjang, @nama_institusi, @jurusan, @tahun_lulus, @ipk)
        `);
    }
  }
}

module.exports = new PendidikanRepository();
