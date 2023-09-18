export default function Modal({
                                children,
                                showModal,
                                setShowModal,
                                title,
                                saveButton,
                                deleteButton,
                                onSave,
                                onDelete,
                                onClose
                              }) {

  if (!showModal) {
    return;
  }

  const modalStyle = {
    display: 'block',
    backgroundColor: 'rgba(0, 0, 0, .6)'
  }

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  }

  const handleClose = () => {
    setShowModal(false);
    
    if (onClose) {
      onClose();
    }
  }

  return (
    <div onMouseDown={handleClose} className="modal show modal-xl fade" tabIndex="-1" style={modalStyle}>
      <div onMouseDown={(ev) => ev.stopPropagation()}
           className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title ? title : ''}</h5>
            <button onClick={handleClose} type="button" className="btn-close" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {(saveButton || deleteButton) && (
            <div className="modal-footer">
              {saveButton && (
                <button className="btn btn-lg btn-primary ms-auto" onClick={handleSave}>{saveButton}</button>
              )}
              {deleteButton && (
                <button className="btn btn-lg btn-danger ms-auto" onClick={handleDelete}>{deleteButton}</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
