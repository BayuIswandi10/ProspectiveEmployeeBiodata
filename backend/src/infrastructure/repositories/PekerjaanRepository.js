const { poolPromise } = require('../database/mssqlClient');

class PekerjaanRepository {
  async findByBiodataId(biodataId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('biodataId', biodataId)
      .query(`SELECT * FROM pekerjaan WHERE biodata_id = @biodataId`);
    return result.recordset;
  }

  async findById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .query(`SELECT * FROM pekerjaan WHERE id = @id`);
    return result.recordset[0] || null;
  }

  async create(data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('biodata_id', data.biodata_id)
      .input('nama_perusahaan', data.nama_perusahaan)
      .input('posisi_terakhir', data.posisi_terakhir)
      .input('pendapatan_terakhir', data.pendapatan_terakhir)
      .input('tahun', data.tahun)
      .query(`
        INSERT INTO pekerjaan (biodata_id, nama_perusahaan, posisi_terakhir, pendapatan_terakhir, tahun)
        OUTPUT INSERTED.*
        VALUES (@biodata_id, @nama_perusahaan, @posisi_terakhir, @pendapatan_terakhir, @tahun)
      `);
    return result.recordset[0];
  }

  async update(id, data) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .input('nama_perusahaan', data.nama_perusahaan)
      .input('posisi_terakhir', data.posisi_terakhir)
      .input('pendapatan_terakhir', data.pendapatan_terakhir)
      .input('tahun', data.tahun)
      .query(`
        UPDATE pekerjaan
        SET nama_perusahaan = @nama_perusahaan, posisi_terakhir = @posisi_terakhir, pendapatan_terakhir = @pendapatan_terakhir, tahun = @tahun
        OUTPUT INSERTED.*
        WHERE id = @id
      `);
    return result.recordset[0];
  }

  async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input('id', id)
      .query(`DELETE FROM pekerjaan WHERE id = @id`);
  }

  async deleteByBiodataId(biodataId) {
    const pool = await poolPromise;
    await pool.request()
      .input('biodataId', biodataId)
      .query(`DELETE FROM pekerjaan WHERE biodata_id = @biodataId`);
  }

  async createMany(records) {
    if (!records || records.length === 0) return;
    const pool = await poolPromise;
    
    for (const data of records) {
      await pool.request()
        .input('biodata_id', data.biodata_id)
        .input('nama_perusahaan', data.nama_perusahaan)
        .input('posisi_terakhir', data.posisi_terakhir)
        .input('pendapatan_terakhir', data.pendapatan_terakhir)
        .input('tahun', data.tahun)
        .query(`
          INSERT INTO pekerjaan (biodata_id, nama_perusahaan, posisi_terakhir, pendapatan_terakhir, tahun)
          VALUES (@biodata_id, @nama_perusahaan, @posisi_terakhir, @pendapatan_terakhir, @tahun)
        `);
    }
  }
}

module.exports = new PekerjaanRepository();
