const { poolPromise } = require('../database/mssqlClient');

class PelatihanRepository {
  async findByBiodataId(biodataId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('biodataId', biodataId)
      .query(`SELECT * FROM pelatihan WHERE biodata_id = @biodataId`);
    return result.recordset;
  }

  async findById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .query(`SELECT * FROM pelatihan WHERE id = @id`);
    return result.recordset[0] || null;
  }

  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('biodata_id', data.biodata_id)
      .input('nama_kursus', data.nama_kursus)
      .input('sertifikat', data.sertifikat)
      .input('tahun', data.tahun)
      .query(`
        INSERT INTO pelatihan (biodata_id, nama_kursus, sertifikat, tahun)
        OUTPUT INSERTED.*
        VALUES (@biodata_id, @nama_kursus, @sertifikat, @tahun)
      `);
    return result.recordset[0];
  }

  async update(id, data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .input('nama_kursus', data.nama_kursus)
      .input('sertifikat', data.sertifikat)
      .input('tahun', data.tahun)
      .query(`
        UPDATE pelatihan
        SET nama_kursus = @nama_kursus, sertifikat = @sertifikat, tahun = @tahun
        OUTPUT INSERTED.*
        WHERE id = @id
      `);
    return result.recordset[0];
  }

  async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input('id', id)
      .query(`DELETE FROM pelatihan WHERE id = @id`);
  }

  async deleteByBiodataId(biodataId) {
    const pool = await poolPromise;
    await pool.request()
      .input('biodataId', biodataId)
      .query(`DELETE FROM pelatihan WHERE biodata_id = @biodataId`);
  }

  async createMany(records) {
    if (!records || records.length === 0) return;
    const pool = await poolPromise;
    
    for (const data of records) {
      await pool.request()
        .input('biodata_id', data.biodata_id)
        .input('nama_kursus', data.nama_kursus)
        .input('sertifikat', data.sertifikat)
        .input('tahun', data.tahun)
        .query(`
          INSERT INTO pelatihan (biodata_id, nama_kursus, sertifikat, tahun)
          VALUES (@biodata_id, @nama_kursus, @sertifikat, @tahun)
        `);
    }
  }
}

module.exports = new PelatihanRepository();
