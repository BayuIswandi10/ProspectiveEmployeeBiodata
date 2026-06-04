const { poolPromise } = require('../database/mssqlClient');

class BiodataRepository {
  async _fetchRelations(pool, biodataId) {
    const [pendidikan, pelatihan, pekerjaan] = await Promise.all([
      pool.request().input('id', biodataId).query(`SELECT * FROM pendidikan WHERE biodata_id = @id`),
      pool.request().input('id', biodataId).query(`SELECT * FROM pelatihan WHERE biodata_id = @id`),
      pool.request().input('id', biodataId).query(`SELECT * FROM pekerjaan WHERE biodata_id = @id`)
    ]);
    return {
      pendidikan: pendidikan.recordset,
      pelatihan: pelatihan.recordset,
      pekerjaan: pekerjaan.recordset
    };
  }

  async findByUserId(userId) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('userId', userId)
      .query(`SELECT * FROM biodata WHERE user_id = @userId`);
    
    if (result.recordset.length === 0) return null;
    const biodata = result.recordset[0];
    
    const relations = await this._fetchRelations(pool, biodata.id);
    return { ...biodata, ...relations };
  }

  async findById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .query(`
        SELECT b.*, u.email as user_email, u.role as user_role 
        FROM biodata b 
        LEFT JOIN users u ON b.user_id = u.id 
        WHERE b.id = @id
      `);
    
    if (result.recordset.length === 0) return null;
    const row = result.recordset[0];
    const biodata = { ...row };
    delete biodata.user_email;
    delete biodata.user_role;
    biodata.user = { id: row.user_id, email: row.user_email, role: row.user_role };
    
    const relations = await this._fetchRelations(pool, biodata.id);
    return { ...biodata, ...relations };
  }

  async findByNoKtp(noKtp) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('noKtp', noKtp)
      .query(`SELECT id, user_id FROM biodata WHERE no_ktp = @noKtp`);
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(data) {
    const pool = await poolPromise;
    const req = pool.request();
    
    // Auto-generate input parameters
    const fields = ['user_id', 'posisi_dilamar', 'nama', 'no_ktp', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama', 'golongan_darah', 'status', 'alamat_ktp', 'alamat_tinggal', 'email', 'no_telp', 'orang_terdekat', 'skill', 'bersedia_ditempatkan', 'penghasilan_diharapkan'];
    
    fields.forEach(f => {
      req.input(f, data[f] !== undefined ? data[f] : null);
    });

    const columns = fields.join(', ');
    const values = fields.map(f => '@' + f).join(', ');

    const result = await req.query(`
      INSERT INTO biodata (${columns}, created_at, updated_at)
      OUTPUT INSERTED.*
      VALUES (${values}, GETDATE(), GETDATE())
    `);
    return result.recordset[0];
  }

  async update(id, data) {
    const pool = await poolPromise;
    const req = pool.request();
    req.input('id', id);

    const fields = ['posisi_dilamar', 'nama', 'no_ktp', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama', 'golongan_darah', 'status', 'alamat_ktp', 'alamat_tinggal', 'email', 'no_telp', 'orang_terdekat', 'skill', 'bersedia_ditempatkan', 'penghasilan_diharapkan'];
    
    const updates = [];
    fields.forEach(f => {
      if (data[f] !== undefined) {
        req.input(f, data[f]);
        updates.push(`${f} = @${f}`);
      }
    });

    if (updates.length === 0) return this.findById(id);

    updates.push('updated_at = GETDATE()');

    const result = await req.query(`
      UPDATE biodata
      SET ${updates.join(', ')}
      OUTPUT INSERTED.*
      WHERE id = @id
    `);
    return result.recordset[0];
  }

  async delete(id) {
    const pool = await poolPromise;
    await pool.request().input('id', id).query(`DELETE FROM biodata WHERE id = @id`);
  }

  async findAll({ search, searchBy, page = 1, limit = 10 }) {
    const pool = await poolPromise;
    const offset = (page - 1) * limit;
    const reqData = pool.request();
    const reqCount = pool.request();

    let whereClause = '1=1';
    
    if (search && searchBy) {
      if (searchBy === 'nama') {
        whereClause += ` AND b.nama LIKE '%' + @search + '%'`;
        reqData.input('search', search);
        reqCount.input('search', search);
      } else if (searchBy === 'posisi') {
        whereClause += ` AND b.posisi_dilamar LIKE '%' + @search + '%'`;
        reqData.input('search', search);
        reqCount.input('search', search);
      } else if (searchBy === 'jenjang') {
        // Needs a subquery or join for pendidikan
        whereClause += ` AND EXISTS (SELECT 1 FROM pendidikan p WHERE p.biodata_id = b.id AND p.jenjang LIKE '%' + @search + '%')`;
        reqData.input('search', search);
        reqCount.input('search', search);
      }
    }

    reqData.input('limit', parseInt(limit));
    reqData.input('offset', parseInt(offset));

    const countResult = await reqCount.query(`SELECT COUNT(*) as total FROM biodata b WHERE ${whereClause}`);
    const total = countResult.recordset[0].total;

    const dataResult = await reqData.query(`
      SELECT b.*, u.email as user_email 
      FROM biodata b
      LEFT JOIN users u ON b.user_id = u.id
      WHERE ${whereClause}
      ORDER BY b.created_at DESC
      OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
    `);

    // Fetch relations for each biodata
    const data = [];
    for (const row of dataResult.recordset) {
      const biodata = { ...row };
      delete biodata.user_email;
      biodata.user = { id: row.user_id, email: row.user_email };
      const relations = await this._fetchRelations(pool, biodata.id);
      data.push({ ...biodata, ...relations });
    }

    return { data, total };
  }
}

module.exports = new BiodataRepository();
