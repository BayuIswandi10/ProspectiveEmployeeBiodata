/**
 * Section 6 – Skill & Preferensi
 */
const Section6Lainnya = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({ ...data, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div>
      <div className="card-header-section">
        <span className="step-badge">6</span>
        Skill &amp; Preferensi Kerja
      </div>
      <div className="p-4">
        <div className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Skill / Keahlian</label>
            <textarea
              className="form-control"
              name="skill"
              value={data.skill || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Contoh: Microsoft Office, PHP, Laravel, komunikasi, dll."
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Penghasilan yang Diharapkan (Rp)</label>
            <div className="input-group">
              <span className="input-group-text">Rp</span>
              <input
                type="number"
                className="form-control"
                name="penghasilan_diharapkan"
                value={data.penghasilan_diharapkan || ''}
                onChange={handleChange}
                placeholder="Harus > 0 (contoh: 5000000)"
                min={0}
              />
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-end">
            <div className="form-check form-switch mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="bersedia_ditempatkan"
                name="bersedia_ditempatkan"
                checked={!!data.bersedia_ditempatkan}
                onChange={handleChange}
                style={{ width: '3rem', height: '1.5rem' }}
              />
              <label className="form-check-label ms-2 fw-medium" htmlFor="bersedia_ditempatkan">
                Bersedia Ditempatkan di Luar Kota
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section6Lainnya;
