import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      <Navbar />
      <main className="flex-grow-1 overflow-auto">
        {children}
      </main>
      <footer className="py-3 text-center text-muted small border-top bg-white flex-shrink-0">
        © {new Date().getFullYear()} Hak Cipta Dilindungi. Portal Rekrutmen Calon Karyawan.
      </footer>
    </div>
  );
};

export default MainLayout;
