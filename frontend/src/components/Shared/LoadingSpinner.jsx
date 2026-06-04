const LoadingSpinner = ({ text = 'Memuat data...' }) => (
  <div className="loading-wrapper">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mb-0 text-muted">{text}</p>
  </div>
);

export default LoadingSpinner;
