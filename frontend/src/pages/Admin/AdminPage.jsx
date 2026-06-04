import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import EmptyState from '../../components/Shared/EmptyState';
import Pagination from '../../components/Shared/Pagination';
import { useAdminCandidates, useDeleteCandidate } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/formatters';

const AdminPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('nama');
  const [page, setPage] = useState(1);
  const [submittedSearch, setSubmittedSearch] = useState({ search: '', searchBy: 'nama' });
  const [deleteId, setDeleteId] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

  const { data, isLoading, isFetching } = useAdminCandidates({
    search: submittedSearch.search,
    searchBy: submittedSearch.searchBy,
    page,
    limit: 10,
  });
  const deleteMutation = useDeleteCandidate();

  const candidates = data?.data || [];
  const pagination = data?.pagination;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSubmittedSearch({ search, searchBy });
  };

  const handleReset = () => {
    setSearch('');
    setSearchBy('nama');
    setPage(1);
    setSubmittedSearch({ search: '', searchBy: 'nama' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus biodata kandidat ini?')) return;
    try {
      await deleteMutation.mutateAsync(id);
      setAlertMsg({ type: 'success', text: '✅ Kandidat berhasil dihapus.' });
      setTimeout(() => setAlertMsg(null), 3000);
    } catch {
      setAlertMsg({ type: 'danger', text: '⚠️ Gagal menghapus kandidat.' });
      setTimeout(() => setAlertMsg(null), 3000);
    }
  };

  return (
    <MainLayout>
      <div className="page-header">
        <div className="container">
          <h1><i className="bi bi-speedometer2 me-2"></i> Dashboard Admin</h1>
          <p>Kelola seluruh data kandidat yang telah mendaftar</p>
        </div>
      </div>

      <div className="container pb-5">
        {alertMsg && (
          <div className={`alert alert-${alertMsg.type} alert-dismissible`}>
            {alertMsg.text}
            <button type="button" className="btn-close" onClick={() => setAlertMsg(null)} />
          </div>
        )}

        {/* Stat Summary */}
        {pagination && (
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="stat-card">
                <div className="d-flex align-items-center gap-3">
                  <div className="stat-icon" style={{ background: '#dbeafe' }}><i className="bi bi-people-fill text-primary"></i></div>
                  <div>
                    <div className="text-muted small">Total Kandidat</div>
                    <div className="fw-bold fs-4">{pagination.total}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSearch} className="row g-2 align-items-end">
              <div className="col-md-5">
                <label className="form-label fw-semibold"><i className="bi bi-search me-2"></i> Kata Kunci</label>
                <input
                  type="text"
                  className="form-control"
                  id="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Masukkan kata kunci pencarian..."
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Cari Berdasarkan</label>
                <select className="form-select" id="search-by" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                  <option value="nama">Nama</option>
                  <option value="posisi">Posisi Dilamar</option>
                  <option value="jenjang">Jenjang Pendidikan</option>
                </select>
              </div>
              <div className="col-md-4 d-flex gap-2">
                <button type="submit" id="btn-search" className="btn btn-primary"><i className="bi bi-search me-1"></i> Cari</button>
                <button type="button" className="btn btn-outline-secondary" onClick={handleReset}><i className="bi bi-arrow-counterclockwise me-1"></i> Reset</button>
              </div>
            </form>
          </div>
        </div>

        {/* Table */}
        <div className="card">
          <div className="card-body p-0">
            {isLoading || isFetching ? (
              <LoadingSpinner text="Memuat data kandidat..." />
            ) : candidates.length === 0 ? (
              <EmptyState icon={<i className="bi bi-person-x text-muted" style={{ fontSize: '3rem' }}></i>} title="Tidak ada kandidat ditemukan" description="Coba ubah kata kunci pencarian" />
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-hover mb-0 admin-table">
                    <thead>
                      <tr>
                        <th className="ps-3">No.</th>
                        <th>Nama</th>
                        <th>Tempat Lahir</th>
                        <th>Tanggal Lahir</th>
                        <th>Posisi Dilamar</th>
                        <th className="text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.map((c, idx) => (
                        <tr key={c.id}>
                          <td className="ps-3 text-muted small">{(page - 1) * 10 + idx + 1}</td>
                          <td className="fw-semibold">{c.nama}</td>
                          <td>{c.tempat_lahir || '-'}</td>
                          <td>{formatDate(c.tanggal_lahir)}</td>
                          <td>
                            {c.posisi_dilamar
                              ? <span className="badge bg-primary-subtle text-primary border border-primary-subtle">{c.posisi_dilamar}</span>
                              : <span className="text-muted">-</span>}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-primary me-1"
                              onClick={() => navigate(`/admin/detail/${c.id}`)}
                              title="Lihat Detail"
                            >
                              <i className="bi bi-eye-fill me-1"></i> Detail
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(c.id)}
                              disabled={deleteMutation.isPending}
                              title="Hapus"
                            >
                              <i className="bi bi-trash-fill me-1"></i> Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-3 border-top d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <small className="text-muted">
                    Menampilkan {candidates.length} dari {pagination?.total || 0} kandidat
                  </small>
                  <Pagination pagination={pagination} onPageChange={setPage} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
