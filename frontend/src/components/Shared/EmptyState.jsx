const EmptyState = ({ icon = <i className="bi bi-inbox text-muted"></i>, title = 'Tidak ada data', description = '' }) => (
  <div className="empty-state">
    <div className="empty-state-icon text-muted" style={{ fontSize: '3rem' }}>{icon}</div>
    <h5 className="text-muted">{title}</h5>
    {description && <p className="text-muted small">{description}</p>}
  </div>
);

export default EmptyState;
