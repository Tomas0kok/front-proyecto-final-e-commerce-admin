import ReactDOM from "react-dom";

const Modal = ({ isOpen, title, children, onClose, size = "md" }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="bd-modal-backdrop" onClick={onClose}>
      <div
        className={`bd-modal-dialog bd-modal-${size}`}
        onClick={(e) => e.stopPropagation()} // 👈 evita que el click dentro cierre
      >
        <div className="bd-modal-header">
          <h5 className="mb-0">{title}</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar"
            onClick={onClose}
          />
        </div>

        <div className="bd-modal-body">{children}</div>
      </div>
    </div>,
    document.body // 👈 Portal: se monta directamente sobre <body>
  );
};

export default Modal;
