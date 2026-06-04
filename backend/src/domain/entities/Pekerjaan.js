/**
 * Pekerjaan Entity - Domain Layer
 */
class Pekerjaan {
  constructor(data) {
    this.id = data.id;
    this.biodata_id = data.biodata_id;
    this.nama_perusahaan = data.nama_perusahaan;
    this.posisi_terakhir = data.posisi_terakhir;
    this.pendapatan_terakhir = data.pendapatan_terakhir;
    this.tahun = data.tahun;
  }
}

module.exports = Pekerjaan;
