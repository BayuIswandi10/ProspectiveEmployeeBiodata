import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authService } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setApiError('');
      const res = await authService.login(data);
      login(res.data.token, res.data.user);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/biodata');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login gagal. Periksa email dan password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="logo-icon">
          <i className="bi bi-person-badge text-white" style={{ fontSize: '2.5rem' }}></i>
        </div>
        <h2>Selamat Datang</h2>
        <p className="subtitle">Masuk ke sistem Biodata Karyawan</p>

        {apiError && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
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

          <div className="mb-4">
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Minimal 6 karakter"
              {...register('password', { required: 'Password wajib diisi' })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <button type="submit" id="btn-login" className="btn btn-primary w-100" disabled={loading}>
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Masuk...</>
              : <><i className="bi bi-box-arrow-in-right me-2"></i> Masuk</>}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small text-muted">
          Belum punya akun?{' '}
          <Link to="/register" className="text-primary fw-semibold">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
