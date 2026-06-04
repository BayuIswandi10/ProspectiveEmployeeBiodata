import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { useAdminCandidateDetail } from '../../hooks/useAdmin';
import { formatDate, formatCurrency } from '../../utils/formatters';

const DetailRow = ({ label, value }) => (
  <div className="row mb-2 border-bottom pb-2">
    <div className="col-5 col-md-4 text-muted small fw-semibold">{label}</div>
    <div className="col-7 col-md-8 small">{value || <span className="text-muted">-</span>}</div>
  </div>
);

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: biodata, isLoading, error } = useAdminCandidateDetail(parseInt(id));

  if (isLoading) return <MainLayout><LoadingSpinner /></MainLayout>;
  if (error || !biodata) {
    return (
      <MainLayout>
        <div className="container py-5 text-center">
          <h3 className="text-muted">Data tidak ditemukan</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/admin')}>← Kembali</button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="page-header">
        <div className="container d-flex align-items-center gap-3">
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/admin')}>← Kembali</button>
          <div>
            <h1><i className="bi bi-person-vcard me-2"></i> Detail Kandidat</h1>
            <p className="mb-0">{biodata.nama}</p>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row g-4">
          {/* Data Pribadi */}
          <div className="col-12">
            <div className="card">
              <div className="card-header-section"><i className="bi bi-file-earmark-person me-2"></i> Data Pribadi</div>
              <div className="p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <DetailRow label="Posisi Dilamar" value={biodata.posisi_dilamar} />
                    <DetailRow label="Nama Lengkap" value={biodata.nama} />
                    <DetailRow label="No. KTP" value={biodata.no_ktp} />
                    <DetailRow label="Tempat Lahir" value={biodata.tempat_lahir} />
                    <DetailRow label="Tanggal Lahir" value={formatDate(biodata.tanggal_lahir)} />
                  </div>
                  <div className="col-md-6">
                    <DetailRow label="Jenis Kelamin" value={biodata.jenis_kelamin} />
                    <DetailRow label="Agama" value={biodata.agama} />
                    <DetailRow label="Golongan Darah" value={biodata.golongan_darah} />
                    <DetailRow label="Status" value={biodata.status} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kontak & Alamat */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header-section"><i className="bi bi-geo-alt me-2"></i> Kontak &amp; Alamat</div>
              <div className="p-4">
                <DetailRow label="Email" value={biodata.email} />
                <DetailRow label="No. Telepon" value={biodata.no_telp} />
                <DetailRow label="Kontak Darurat" value={biodata.orang_terdekat} />
                <DetailRow label="Alamat KTP" value={biodata.alamat_ktp} />
                <DetailRow label="Alamat Domisili" value={biodata.alamat_tinggal} />
              </div>
            </div>
          </div>

          {/* Skill & Preferensi */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header-section"><i className="bi bi-lightbulb me-2"></i> Skill &amp; Preferensi</div>
              <div className="p-4">
                <DetailRow label="Skill" value={biodata.skill} />
                <DetailRow label="Gaji Diharapkan" value={formatCurrency(biodata.penghasilan_diharapkan)} />
                <DetailRow label="Bersedia Ditempatkan" value={biodata.bersedia_ditempatkan ? <><i className="bi bi-check-circle-fill text-success me-1"></i> Ya</> : <><i className="bi bi-x-circle-fill text-danger me-1"></i> Tidak</>} />
              </div>
            </div>
          </div>

          {/* Pendidikan */}
          {biodata.pendidikan?.length > 0 && (
            <div className="col-12">
              <div className="card">
                <div className="card-header-section"><i className="bi bi-mortarboard me-2"></i> Riwayat Pendidikan</div>
                <div className="p-0">
                  <div className="table-responsive">
                    <table className="table table-sm mb-0 admin-table">
                      <thead>
                        <tr>
                          <th className="ps-3">Jenjang</th>
                          <th>Institusi</th>
                          <th>Jurusan</th>
                          <th>Tahun Lulus</th>
                          <th>IPK</th>
                        </tr>
                      </thead>
                      <tbody>
                        {biodata.pendidikan.map((p, i) => (
                          <tr key={i}>
                            <td className="ps-3"><span className="badge bg-secondary">{p.jenjang || '-'}</span></td>
                            <td>{p.nama_institusi || '-'}</td>
                            <td>{p.jurusan || '-'}</td>
                            <td>{p.tahun_lulus || '-'}</td>
                            <td>{p.ipk || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pelatihan */}
          {biodata.pelatihan?.length > 0 && (
            <div className="col-md-6">
              <div className="card">
                <div className="card-header-section"><i className="bi bi-book me-2"></i> Riwayat Pelatihan</div>
                <div className="p-0">
                  <div className="table-responsive">
                    <table className="table table-sm mb-0 admin-table">
                      <thead>
                        <tr>
                          <th className="ps-3">Kursus</th>
                          <th>Sertifikat</th>
                          <th>Tahun</th>
                        </tr>
                      </thead>
                      <tbody>
                        {biodata.pelatihan.map((p, i) => (
                          <tr key={i}>
                            <td className="ps-3">{p.nama_kursus || '-'}</td>
                            <td>
                              <span className={`badge ${p.sertifikat === 'ada' ? 'bg-success' : 'bg-secondary'}`}>
                                {p.sertifikat === 'ada' ? <><i className="bi bi-check2 me-1"></i> Ada</> : 'Tidak'}
                              </span>
                            </td>
                            <td>{p.tahun || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pekerjaan */}
          {biodata.pekerjaan?.length > 0 && (
            <div className="col-md-6">
              <div className="card">
                <div className="card-header-section"><i className="bi bi-briefcase me-2"></i> Riwayat Pekerjaan</div>
                <div className="p-0">
                  <div className="table-responsive">
                    <table className="table table-sm mb-0 admin-table">
                      <thead>
                        <tr>
                          <th className="ps-3">Perusahaan</th>
                          <th>Posisi</th>
                          <th>Pendapatan</th>
                          <th>Tahun</th>
                        </tr>
                      </thead>
                      <tbody>
                        {biodata.pekerjaan.map((p, i) => (
                          <tr key={i}>
                            <td className="ps-3">{p.nama_perusahaan || '-'}</td>
                            <td>{p.posisi_terakhir || '-'}</td>
                            <td>{formatCurrency(p.pendapatan_terakhir)}</td>
                            <td>{p.tahun || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DetailPage;
