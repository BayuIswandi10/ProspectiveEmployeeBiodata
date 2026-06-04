import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import Section1DataPribadi from '../../components/Form/Section1DataPribadi';
import Section2Kontak from '../../components/Form/Section2Kontak';
import Section3Pendidikan from '../../components/Form/Section3Pendidikan';
import Section4Pelatihan from '../../components/Form/Section4Pelatihan';
import Section5Pekerjaan from '../../components/Form/Section5Pekerjaan';
import Section6Lainnya from '../../components/Form/Section6Lainnya';
import { useMyBiodata, useCreateBiodata, useUpdateBiodata, useDeleteBiodata } from '../../hooks/useBiodata';
import { formatDateInput } from '../../utils/formatters';

const defaultForm = {
  posisi_dilamar: '', nama: '', no_ktp: '', tempat_lahir: '',
  tanggal_lahir: '', jenis_kelamin: '', agama: '', golongan_darah: '',
  status: '', alamat_ktp: '', alamat_tinggal: '', email: '', no_telp: '',
  orang_terdekat: '', skill: '', bersedia_ditempatkan: false,
  penghasilan_diharapkan: '',
};

const BiodataPage = () => {
  const navigate = useNavigate();
  const { data: existing, isLoading } = useMyBiodata();
  const createMutation = useCreateBiodata();
  const updateMutation = useUpdateBiodata();
  const deleteMutation = useDeleteBiodata();

  const [form, setForm] = useState(defaultForm);
  const [pendidikan, setPendidikan] = useState([]);
  const [pelatihan, setPelatihan] = useState([]);
  const [pekerjaan, setPekerjaan] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (existing) {
      setForm({
        ...defaultForm,
        ...existing,
        tanggal_lahir: formatDateInput(existing.tanggal_lahir),
        penghasilan_diharapkan: existing.penghasilan_diharapkan || '',
      });
      setPendidikan(existing.pendidikan || []);
      setPelatihan(existing.pelatihan || []);
      setPekerjaan(existing.pekerjaan || []);
    }
  }, [existing]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama?.trim()) {
      showAlert('danger', 'Nama lengkap wajib diisi!');
      return;
    }

    const payload = { ...form, pendidikan, pelatihan, pekerjaan };

    try {
      if (existing) {
        await updateMutation.mutateAsync({ id: existing.id, data: payload });
        showAlert('success', 'Biodata berhasil diperbarui!');
        setIsEditing(false);
      } else {
        await createMutation.mutateAsync(payload);
        showAlert('success', 'Biodata berhasil disimpan!');
      }
    } catch (err) {
      showAlert('danger', err.response?.data?.message || 'Gagal menyimpan biodata.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Yakin ingin menghapus biodata Anda?')) return;
    try {
      await deleteMutation.mutateAsync(existing.id);
      setForm(defaultForm);
      setPendidikan([]); setPelatihan([]); setPekerjaan([]);
      showAlert('success', 'Biodata berhasil dihapus.');
    } catch (err) {
      showAlert('danger', 'Gagal menghapus biodata.');
    }
  };

  if (isLoading) return <MainLayout><LoadingSpinner /></MainLayout>;

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const readOnly = existing && !isEditing;

  return (
    <MainLayout>
      <div className="page-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h1><i className="bi bi-file-earmark-person me-2"></i> Biodata Saya</h1>
              <p>{existing ? 'Lihat dan kelola data diri Anda' : 'Isi formulir biodata untuk melamar'}</p>
            </div>
            {existing && (
              <div className="d-flex gap-2">
                {!isEditing ? (
                  <button className="btn btn-warning" onClick={() => setIsEditing(true)}><i className="bi bi-pencil-square me-1"></i> Edit</button>
                ) : (
                  <button className="btn btn-secondary" onClick={() => setIsEditing(false)}><i className="bi bi-x-lg me-1"></i> Batal</button>
                )}
                <button className="btn btn-danger" onClick={handleDelete} disabled={deleteMutation.isPending}>
                  <i className="bi bi-trash-fill me-1"></i> Hapus
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container pb-5">
        {alert && (
          <div className={`alert alert-${alert.type} alert-dismissible`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert(null)} />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <fieldset disabled={readOnly}>
            <div className="d-flex flex-column gap-4">
              <div className="card">
                <Section1DataPribadi data={form} onChange={setForm} />
              </div>
              <div className="card">
                <Section2Kontak data={form} onChange={setForm} />
              </div>
              <div className="card">
                <Section3Pendidikan rows={pendidikan} onChange={setPendidikan} />
              </div>
              <div className="card">
                <Section4Pelatihan rows={pelatihan} onChange={setPelatihan} />
              </div>
              <div className="card">
                <Section5Pekerjaan rows={pekerjaan} onChange={setPekerjaan} />
              </div>
              <div className="card">
                <Section6Lainnya data={form} onChange={setForm} />
              </div>
            </div>

            {(!existing || isEditing) && (
              <div className="d-flex justify-content-end mt-4 gap-2">
                {isEditing && (
                  <button type="button" className="btn btn-secondary px-4" onClick={() => setIsEditing(false)}>
                    Batal
                  </button>
                )}
                <button type="submit" id="btn-save-biodata" className="btn btn-primary px-5" disabled={isSubmitting}>
                  {isSubmitting
                    ? <><span className="spinner-border spinner-border-sm me-2" />Menyimpan...</>
                    : existing ? <><i className="bi bi-floppy-fill me-1"></i> Simpan Perubahan</> : <><i className="bi bi-send-fill me-1"></i> Kirim Biodata</>}
                </button>
              </div>
            )}
          </fieldset>
        </form>
      </div>
    </MainLayout>
  );
};

export default BiodataPage;
