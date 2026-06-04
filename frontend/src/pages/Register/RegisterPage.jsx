import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authService } from '../../services/authService';

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setApiError('');
      await authService.register(data);
      setApiSuccess('Registrasi berhasil! Silakan login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registrasi gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="logo-icon">
          <i className="bi bi-person-lines-fill text-white" style={{ fontSize: '2.5rem' }}></i>
        </div>
        <h2>Buat Akun Baru</h2>
        <p className="subtitle">Daftarkan diri untuk mengisi biodata</p>

        {apiError && (
          <div className="alert alert-danger d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill me-2"></i> {apiError}
          </div>
        )}
        {apiSuccess && (
          <div className="alert alert-success d-flex align-items-center">
            <i className="bi bi-check-circle-fill me-2"></i> {apiSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="contoh@email.com"
              {...register('email', {
                required: 'Email wajib diisi',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Format email tidak valid' },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Minimal 8 karakter"
              {...register('password', {
                required: 'Password wajib diisi',
                minLength: { value: 8, message: 'Password minimal 8 karakter' },
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="reg-confirm">Konfirmasi Password</label>
            <input
              id="reg-confirm"
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Ulangi password"
              {...register('confirmPassword', {
                required: 'Konfirmasi password wajib diisi',
                validate: (v) => v === password || 'Password tidak cocok',
              })}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword.message}</div>
            )}
          </div>

          <button type="submit" id="btn-register" className="btn btn-primary w-100" disabled={loading}>
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Mendaftarkan...</>
              : <><i className="bi bi-person-plus-fill me-2"></i> Daftar</>}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small text-muted">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-primary fw-semibold">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
