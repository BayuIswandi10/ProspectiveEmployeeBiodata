const biodataRepository = require('../../infrastructure/repositories/BiodataRepository');
const pendidikanRepository = require('../../infrastructure/repositories/PendidikanRepository');
const pelatihanRepository = require('../../infrastructure/repositories/PelatihanRepository');
const pekerjaanRepository = require('../../infrastructure/repositories/PekerjaanRepository');
const { NotFoundError, ForbiddenError, ConflictError } = require('../../shared/exceptions');
const logger = require('../../infrastructure/logging/logger');

/**
 * Bersihkan payload: ubah string kosong ke null, konversi tipe data
 */
const cleanPayload = (data) => {
  const cleaned = {};
  for (const [key, val] of Object.entries(data)) {
    if (val === '' || val === undefined) {
      cleaned[key] = null;
    } else {
      cleaned[key] = val;
    }
  }

  // Konversi tanggal_lahir ke Date object
  if (cleaned.tanggal_lahir && typeof cleaned.tanggal_lahir === 'string') {
    cleaned.tanggal_lahir = new Date(cleaned.tanggal_lahir);
  }

  // Konversi penghasilan_diharapkan ke number / null
  if (cleaned.penghasilan_diharapkan !== null) {
    const parsed = parseFloat(cleaned.penghasilan_diharapkan);
    cleaned.penghasilan_diharapkan = isNaN(parsed) ? null : parsed;
  }

  // Konversi bersedia_ditempatkan ke boolean
  if (cleaned.bersedia_ditempatkan !== null) {
    cleaned.bersedia_ditempatkan = Boolean(cleaned.bersedia_ditempatkan);
  }

  return cleaned;
};

/**
 * Bersihkan row child table (hapus id jika ada, konversi tipe)
 */
const cleanChildRow = (row) => {
  const cleaned = {};
  for (const [key, val] of Object.entries(row)) {
    if (key === 'id') continue; // skip id dari frontend
    cleaned[key] = val === '' ? null : val;
  }
  if (cleaned.tahun !== null && cleaned.tahun !== undefined) {
    cleaned.tahun = parseInt(cleaned.tahun) || null;
  }
  if (cleaned.tahun_lulus !== null && cleaned.tahun_lulus !== undefined) {
    cleaned.tahun_lulus = parseInt(cleaned.tahun_lulus) || null;
  }
  if (cleaned.ipk !== null && cleaned.ipk !== undefined) {
    cleaned.ipk = parseFloat(cleaned.ipk) || null;
  }
  if (cleaned.pendapatan_terakhir !== null && cleaned.pendapatan_terakhir !== undefined) {
    cleaned.pendapatan_terakhir = parseFloat(cleaned.pendapatan_terakhir) || null;
  }
  return cleaned;
};

class BiodataUseCase {
  async getMyBiodata(userId) {
    const biodata = await biodataRepository.findByUserId(userId);
    if (!biodata) throw new NotFoundError('Biodata belum diisi');
    return biodata;
  }

  async createBiodata(userId, payload) {
    const { pendidikan = [], pelatihan = [], pekerjaan = [], ...rawData } = payload;

    // Bersihkan dan konversi tipe data
    const biodataData = cleanPayload(rawData);

    // KTP uniqueness check
    if (biodataData.no_ktp) {
      const existingKtp = await biodataRepository.findByNoKtp(biodataData.no_ktp);
      if (existingKtp) {
        throw new ConflictError('Nomor KTP sudah digunakan oleh kandidat lain');
      }
    }

    const biodata = await biodataRepository.create({
      ...biodataData,
      user_id: userId,
    });

    // Create child records
    if (pendidikan.length > 0) {
      await pendidikanRepository.createMany(
        pendidikan.map((p) => ({ ...cleanChildRow(p), biodata_id: biodata.id }))
      );
    }
    if (pelatihan.length > 0) {
      await pelatihanRepository.createMany(
        pelatihan.map((p) => ({ ...cleanChildRow(p), biodata_id: biodata.id }))
      );
    }
    if (pekerjaan.length > 0) {
      await pekerjaanRepository.createMany(
        pekerjaan.map((p) => ({ ...cleanChildRow(p), biodata_id: biodata.id }))
      );
    }

    logger.info(`Create biodata - userId: ${userId}`);
    return await biodataRepository.findByUserId(userId);
  }


  async updateBiodata(id, userId, userRole, payload) {
    const existing = await biodataRepository.findById(id);
    if (!existing) throw new NotFoundError('Biodata tidak ditemukan');

    // Only admin or the owner can update
    if (userRole !== 'admin' && String(existing.user_id) !== String(userId)) {
      throw new ForbiddenError('Tidak diizinkan mengubah biodata ini');
    }

    const { pendidikan, pelatihan, pekerjaan, ...biodataData } = payload;

    if (biodataData.tanggal_lahir) {
      biodataData.tanggal_lahir = new Date(biodataData.tanggal_lahir);
    }

    if (biodataData.no_ktp) {
      const existingKtp = await biodataRepository.findByNoKtp(biodataData.no_ktp);
      if (existingKtp && String(existingKtp.id) !== String(id)) {
        throw new ConflictError('Nomor KTP sudah digunakan oleh kandidat lain');
      }
    }

    await biodataRepository.update(id, biodataData);

    // Replace child tables if provided
    if (pendidikan !== undefined) {
      await pendidikanRepository.deleteByBiodataId(id);
      if (pendidikan.length > 0) {
        await pendidikanRepository.createMany(
          pendidikan.map((p) => ({ ...p, biodata_id: id }))
        );
      }
    }
    if (pelatihan !== undefined) {
      await pelatihanRepository.deleteByBiodataId(id);
      if (pelatihan.length > 0) {
        await pelatihanRepository.createMany(
          pelatihan.map((p) => ({ ...p, biodata_id: id }))
        );
      }
    }
    if (pekerjaan !== undefined) {
      await pekerjaanRepository.deleteByBiodataId(id);
      if (pekerjaan.length > 0) {
        await pekerjaanRepository.createMany(
          pekerjaan.map((p) => ({ ...p, biodata_id: id }))
        );
      }
    }

    logger.info(`Update biodata id: ${id} by userId: ${userId}`);
    return await biodataRepository.findById(id);
  }

  async deleteBiodata(id, userId, userRole) {
    const existing = await biodataRepository.findById(id);
    if (!existing) throw new NotFoundError('Biodata tidak ditemukan');

    if (userRole !== 'admin' && String(existing.user_id) !== String(userId)) {
      throw new ForbiddenError('Tidak diizinkan menghapus biodata ini');
    }

    await biodataRepository.delete(id);
    logger.info(`Delete biodata id: ${id} by userId: ${userId}`);
  }
}

module.exports = new BiodataUseCase();
