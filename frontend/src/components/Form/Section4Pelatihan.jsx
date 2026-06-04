import DynamicTable from '../Table/DynamicTable';

const pelatihanColumns = [
  { key: 'nama_kursus', label: 'Nama Kursus/Pelatihan', placeholder: 'Contoh: Pelatihan K3' },
  {
    key: 'sertifikat', label: 'Sertifikat', type: 'select',
    options: [
      { value: 'ada', label: 'Ada' },
      { value: 'tidak', label: 'Tidak' },
    ]
  },
  { key: 'tahun', label: 'Tahun', type: 'number', placeholder: '2023', min: 1990, max: new Date().getFullYear() },
];

/**
 * Section 4 – Riwayat Pelatihan (Dynamic Table)
 */
const Section4Pelatihan = ({ rows, onChange }) => {
  return (
    <div>
      <div className="card-header-section">
        <span className="step-badge">4</span>
        Riwayat Pelatihan / Kursus
      </div>
      <div className="p-4">
        <DynamicTable
          columns={pelatihanColumns}
          rows={rows}
          onChange={onChange}
          addLabel="Tambah Riwayat Pelatihan"
        />
      </div>
    </div>
  );
};

export default Section4Pelatihan;
