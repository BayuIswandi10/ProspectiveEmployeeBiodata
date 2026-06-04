import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (_) {}
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1e3a8a' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to={isAdmin() ? '/admin' : '/biodata'}>
          <i className="bi bi-buildings-fill me-2"></i> Portal Rekrutmen
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {user && (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white-50 small">
                    <i className="bi bi-person-circle me-1"></i> {user.email}
                    <span className={`ms-2 badge ${isAdmin() ? 'bg-warning text-dark' : 'bg-info'}`}>
                      {isAdmin() ? 'Admin' : 'User'}
                    </span>
                  </span>
                </li>
                {!isAdmin() && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/biodata"><i className="bi bi-file-earmark-person me-1"></i> Biodata Saya</Link>
                  </li>
                )}
                {isAdmin() && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin"><i className="bi bi-speedometer2 me-1"></i> Dashboard</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
