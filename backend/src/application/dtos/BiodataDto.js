/**
 * Biodata DTOs - Application Layer
 */

class BiodataRequestDto {
  constructor(data) {
    this.posisi_dilamar = data.posisi_dilamar || null;
    this.nama = data.nama;
    this.no_ktp = data.no_ktp || null;
    this.tempat_lahir = data.tempat_lahir || null;
    this.tanggal_lahir = data.tanggal_lahir ? new Date(data.tanggal_lahir) : null;
    this.jenis_kelamin = data.jenis_kelamin || null;
    this.agama = data.agama || null;
    this.golongan_darah = data.golongan_darah || null;
    this.status = data.status || null;
    this.alamat_ktp = data.alamat_ktp || null;
    this.alamat_tinggal = data.alamat_tinggal || null;
    this.email = data.email || null;
    this.no_telp = data.no_telp || null;
    this.orang_terdekat = data.orang_terdekat || null;
    this.skill = data.skill || null;
    this.bersedia_ditempatkan = data.bersedia_ditempatkan || false;
    this.penghasilan_diharapkan = data.penghasilan_diharapkan
      ? parseFloat(data.penghasilan_diharapkan)
      : null;
    this.pendidikan = data.pendidikan || [];
    this.pelatihan = data.pelatihan || [];
    this.pekerjaan = data.pekerjaan || [];
  }
}

class BiodataResponseDto {
  constructor(biodata) {
    this.id = biodata.id;
    this.user_id = biodata.user_id;
    this.posisi_dilamar = biodata.posisi_dilamar;
    this.nama = biodata.nama;
    this.no_ktp = biodata.no_ktp;
    this.tempat_lahir = biodata.tempat_lahir;
    this.tanggal_lahir = biodata.tanggal_lahir;
    this.jenis_kelamin = biodata.jenis_kelamin;
    this.agama = biodata.agama;
    this.golongan_darah = biodata.golongan_darah;
    this.status = biodata.status;
    this.alamat_ktp = biodata.alamat_ktp;
    this.alamat_tinggal = biodata.alamat_tinggal;
    this.email = biodata.email;
    this.no_telp = biodata.no_telp;
    this.orang_terdekat = biodata.orang_terdekat;
    this.skill = biodata.skill;
    this.bersedia_ditempatkan = biodata.bersedia_ditempatkan;
    this.penghasilan_diharapkan = biodata.penghasilan_diharapkan;
    this.pendidikan = biodata.pendidikan || [];
    this.pelatihan = biodata.pelatihan || [];
    this.pekerjaan = biodata.pekerjaan || [];
    this.created_at = biodata.created_at;
    this.updated_at = biodata.updated_at;
  }
}

class AdminCandidateListDto {
  constructor(biodata) {
    this.id = biodata.id;
    this.nama = biodata.nama;
    this.tempat_lahir = biodata.tempat_lahir;
    this.tanggal_lahir = biodata.tanggal_lahir;
    this.posisi_dilamar = biodata.posisi_dilamar;
    this.email = biodata.email;
    this.no_telp = biodata.no_telp;
  }
}

module.exports = { BiodataRequestDto, BiodataResponseDto, AdminCandidateListDto };
