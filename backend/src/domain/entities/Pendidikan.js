/**
 * Pendidikan Entity - Domain Layer
 */
class Pendidikan {
  constructor(data) {
    this.id = data.id;
    this.biodata_id = data.biodata_id;
    this.jenjang = data.jenjang;
    this.nama_institusi = data.nama_institusi;
    this.jurusan = data.jurusan;
    this.tahun_lulus = data.tahun_lulus;
    this.ipk = data.ipk;
  }
}

module.exports = Pendidikan;
