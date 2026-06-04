/**
 * DynamicTable – komponen tabel dengan fitur tambah/hapus baris
 * Props:
 *   - columns: [{ key, label, type, options }]
 *   - rows: array of objects
 *   - onChange: (updatedRows) => void
 *   - addLabel: string
 */
const DynamicTable = ({ columns, rows, onChange, addLabel = 'Tambah Baris' }) => {
  const handleChange = (index, key, value) => {
    const updated = rows.map((row, i) =>
      i === index ? { ...row, [key]: value } : row
    );
    onChange(updated);
  };

  const handleAdd = () => {
    const emptyRow = columns.reduce((acc, col) => ({ ...acc, [col.key]: '' }), {});
    onChange([...rows, emptyRow]);
  };

  const handleRemove = (index) => {
    onChange(rows.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-bordered table-sm dynamic-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>No.</th>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              <th style={{ width: '60px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="text-center text-muted py-3 small">
                  Belum ada data. Klik tombol tambah.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="text-center text-muted small">{idx + 1}</td>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.type === 'select' ? (
                        <select
                          className="form-select form-select-sm"
                          value={row[col.key] || ''}
                          onChange={(e) => handleChange(idx, col.key, e.target.value)}
                        >
                          <option value="">-- Pilih --</option>
                          {col.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={col.type || 'text'}
                          className="form-control form-control-sm"
                          value={row[col.key] || ''}
                          placeholder={col.placeholder || ''}
                          onChange={(e) => handleChange(idx, col.key, e.target.value)}
                          step={col.step}
                          min={col.min}
                          max={col.max}
                        />
                      )}
                    </td>
                  ))}
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm py-0 px-2"
                      onClick={() => handleRemove(idx)}
                      title="Hapus baris"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <button type="button" className="btn btn-outline-primary btn-sm btn-add-row" onClick={handleAdd}>
        ＋ {addLabel}
      </button>
    </div>
  );
};

export default DynamicTable;
