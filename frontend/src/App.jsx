import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { PublicRoute, PrivateRoute, AdminRoute } from './routes/ProtectedRoute';
import LoadingSpinner from './components/Shared/LoadingSpinner';

// Lazy-loaded pages
const LoginPage    = lazy(() => import('./pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Register/RegisterPage'));
const BiodataPage  = lazy(() => import('./pages/Biodata/BiodataPage'));
const AdminPage    = lazy(() => import('./pages/Admin/AdminPage'));
const DetailPage   = lazy(() => import('./pages/Detail/DetailPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 }, // 5 minutes
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="loading-wrapper"><div className="spinner-border text-primary"/></div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

              {/* User Routes */}
              <Route path="/biodata" element={<PrivateRoute><BiodataPage /></PrivateRoute>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
              <Route path="/admin/detail/:id" element={<AdminRoute><DetailPage /></AdminRoute>} />

              {/* Default */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
