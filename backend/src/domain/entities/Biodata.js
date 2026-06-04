/**
 * Biodata Entity - Domain Layer
 */
class Biodata {
  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.posisi_dilamar = data.posisi_dilamar;
    this.nama = data.nama;
    this.no_ktp = data.no_ktp;
    this.tempat_lahir = data.tempat_lahir;
    this.tanggal_lahir = data.tanggal_lahir;
    this.jenis_kelamin = data.jenis_kelamin;
    this.agama = data.agama;
    this.golongan_darah = data.golongan_darah;
    this.status = data.status;
    this.alamat_ktp = data.alamat_ktp;
    this.alamat_tinggal = data.alamat_tinggal;
    this.email = data.email;
    this.no_telp = data.no_telp;
    this.orang_terdekat = data.orang_terdekat;
    this.skill = data.skill;
    this.bersedia_ditempatkan = data.bersedia_ditempatkan;
    this.penghasilan_diharapkan = data.penghasilan_diharapkan;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.pendidikan = data.pendidikan || [];
    this.pelatihan = data.pelatihan || [];
    this.pekerjaan = data.pekerjaan || [];
  }
}

module.exports = Biodata;
