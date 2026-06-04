/**
 * Pelatihan Entity - Domain Layer
 */
class Pelatihan {
  constructor(data) {
    this.id = data.id;
    this.biodata_id = data.biodata_id;
    this.nama_kursus = data.nama_kursus;
    this.sertifikat = data.sertifikat;
    this.tahun = data.tahun;
  }
}

module.exports = Pelatihan;
