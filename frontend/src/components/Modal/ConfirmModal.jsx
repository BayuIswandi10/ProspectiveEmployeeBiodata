import { useEffect, useRef } from 'react';
import { Modal as BsModal } from 'bootstrap';

/**
 * ConfirmModal – modal konfirmasi hapus data
 */
const ConfirmModal = ({ id = 'confirmModal', title, message, onConfirm, loading = false }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current._bsModal = new BsModal(modalRef.current);
    }
  }, []);

  return (
    <div className="modal fade" id={id} ref={modalRef} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">⚠️ {title || 'Konfirmasi'}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body">
            <p className="mb-0">{message || 'Apakah Anda yakin ingin melanjutkan?'}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" disabled={loading}>
              Batal
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-1" />Menghapus...</>
              ) : 'Ya, Hapus'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
