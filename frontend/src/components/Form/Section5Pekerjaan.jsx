import DynamicTable from '../Table/DynamicTable';

const pekerjaanColumns = [
  { key: 'nama_perusahaan', label: 'Nama Perusahaan', placeholder: 'PT. Contoh Indonesia' },
  { key: 'posisi_terakhir', label: 'Posisi Terakhir', placeholder: 'Staff, Manager, dll.' },
  { key: 'pendapatan_terakhir', label: 'Pendapatan (Rp)', type: 'number', placeholder: '5000000' },
  { key: 'tahun', label: 'Tahun Keluar', type: 'number', placeholder: '2023', min: 1990, max: new Date().getFullYear() },
];

/**
 * Section 5 – Riwayat Pekerjaan (Dynamic Table)
 */
const Section5Pekerjaan = ({ rows, onChange }) => {
  return (
    <div>
      <div className="card-header-section">
        <span className="step-badge">5</span>
        Riwayat Pekerjaan
      </div>
      <div className="p-4">
        <DynamicTable
          columns={pekerjaanColumns}
          rows={rows}
          onChange={onChange}
          addLabel="Tambah Riwayat Pekerjaan"
        />
      </div>
    </div>
  );
};

export default Section5Pekerjaan;
