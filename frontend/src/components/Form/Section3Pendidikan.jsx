import DynamicTable from '../Table/DynamicTable';

const pendidikanColumns = [
  {
    key: 'jenjang', label: 'Jenjang', type: 'select',
    options: [
      { value: 'SD', label: 'SD' },
      { value: 'SMP', label: 'SMP' },
      { value: 'SMA/SMK', label: 'SMA/SMK' },
      { value: 'D1', label: 'D1' },
      { value: 'D2', label: 'D2' },
      { value: 'D3', label: 'D3' },
      { value: 'S1', label: 'S1' },
      { value: 'S2', label: 'S2' },
      { value: 'S3', label: 'S3' },
    ]
  },
  { key: 'nama_institusi', label: 'Nama Institusi', placeholder: 'Nama sekolah/universitas' },
  { key: 'jurusan', label: 'Jurusan', placeholder: 'Jurusan/Program Studi' },
  { key: 'tahun_lulus', label: 'Tahun Lulus', type: 'number', placeholder: 'Maks. thn ini', min: 1950, max: new Date().getFullYear() },
  { key: 'ipk', label: 'IPK/Nilai', type: 'number', placeholder: 'Skala 0 - 4 (ex: 3.50)', step: '0.01', min: 0, max: 4 },
];

/**
 * Section 3 – Riwayat Pendidikan (Dynamic Table)
 */
const Section3Pendidikan = ({ rows, onChange }) => {
  return (
    <div>
      <div className="card-header-section">
        <span className="step-badge">3</span>
        Riwayat Pendidikan
      </div>
      <div className="p-4">
        <DynamicTable
          columns={pendidikanColumns}
          rows={rows}
          onChange={onChange}
          addLabel="Tambah Riwayat Pendidikan"
        />
      </div>
    </div>
  );
};

export default Section3Pendidikan;
