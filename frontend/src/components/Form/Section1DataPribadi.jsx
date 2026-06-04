/**
 * Section 1 – Data Pribadi
 * Posisi Dilamar, Nama, No KTP, Tempat Lahir, Tanggal Lahir,
 * Jenis Kelamin, Agama, Golongan Darah, Status
 */
const Section1DataPribadi = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div>
      <div className="card-header-section">
        <span className="step-badge">1</span>
        Data Pribadi
      </div>
      <div className="p-4">
        <div className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Posisi yang Dilamar</label>
            <input
              type="text"
              className="form-control"
              name="posisi_dilamar"
              value={data.posisi_dilamar || ''}
              onChange={handleChange}
              placeholder="Contoh: Staff Administrasi, Programmer, dll."
            />
          </div>

          <div className="col-md-8">
            <label className="form-label">Nama Lengkap <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="nama"
              value={data.nama || ''}
              onChange={handleChange}
              placeholder="Nama sesuai KTP"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">No. KTP <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="no_ktp"
              value={data.no_ktp || ''}
              onChange={handleChange}
              placeholder="Wajib 16 digit angka NIK"
              maxLength={16}
            />
          </div>

          <div className="col-md-5">
            <label className="form-label">Tempat Lahir</label>
            <input
              type="text"
              className="form-control"
              name="tempat_lahir"
              value={data.tempat_lahir || ''}
              onChange={handleChange}
              placeholder="Kota tempat lahir"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Tanggal Lahir</label>
            <input
              type="date"
              className="form-control"
              name="tanggal_lahir"
              value={data.tanggal_lahir || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Golongan Darah</label>
            <select className="form-select" name="golongan_darah" value={data.golongan_darah || ''} onChange={handleChange}>
              <option value="">-- Pilih --</option>
              {['A', 'B', 'AB', 'O'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Jenis Kelamin</label>
            <select className="form-select" name="jenis_kelamin" value={data.jenis_kelamin || ''} onChange={handleChange}>
              <option value="">-- Pilih --</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Agama</label>
            <select className="form-select" name="agama" value={data.agama || ''} onChange={handleChange}>
              <option value="">-- Pilih --</option>
              {['Islam','Kristen','Katolik','Hindu','Budha','Konghucu'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Status Perkawinan</label>
            <select className="form-select" name="status" value={data.status || ''} onChange={handleChange}>
              <option value="">-- Pilih --</option>
              {['Belum Menikah','Menikah','Duda','Janda'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1DataPribadi;
