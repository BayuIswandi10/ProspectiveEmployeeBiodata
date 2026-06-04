/**
 * Section 2 – Kontak & Alamat
 */
const Section2Kontak = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div>
      <div className="card-header-section">
        <span className="step-badge">2</span>
        Alamat &amp; Kontak
      </div>
      <div className="p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Alamat Sesuai KTP</label>
            <textarea
              className="form-control"
              name="alamat_ktp"
              value={data.alamat_ktp || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Alamat lengkap sesuai KTP"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Alamat Domisili</label>
            <textarea
              className="form-control"
              name="alamat_tinggal"
              value={data.alamat_tinggal || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Alamat tempat tinggal saat ini"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={data.email || ''}
              onChange={handleChange}
              placeholder="email@contoh.com"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">No. Telepon / HP <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              name="no_telp"
              value={data.no_telp || ''}
              onChange={handleChange}
              placeholder="Angka saja, 10-15 digit (contoh: 08xxxxxxxx)"
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Kontak Darurat (Orang Terdekat)</label>
            <input
              type="text"
              className="form-control"
              name="orang_terdekat"
              value={data.orang_terdekat || ''}
              onChange={handleChange}
              placeholder="Nama dan No. Telepon orang terdekat"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2Kontak;
