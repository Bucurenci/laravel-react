export default function Modal({children, title, saveButton, onSave, deleteButton, onDelete, showModal, setShowModal}) {

  const modalStyle = {
    display: 'block',
    backgroundColor: 'rgba(0, 0, 0, .6)'
  }

  if (!showModal) {
    return;
  }

  return (
    <div onMouseDown={() => setShowModal(false)} className="modal show modal-xl fade" tabIndex="-1" style={modalStyle}>
      <div onMouseDown={(ev) => ev.stopPropagation()}
           className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title ? title : ''}</h5>
            <button onClick={() => setShowModal(false)} type="button" className="btn-close" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {(saveButton || deleteButton) && (
            <div className="modal-footer">
              {saveButton && (
                <button className="btn btn-lg btn-primary ms-auto" onClick={onSave}>{saveButton}</button>
              )}
              {deleteButton && (
                <button className="btn btn-lg btn-primary ms-auto" onClick={onDelete}>{deleteButton}</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
