export default function CustomModal({title, children, closeModal}) {

  const modalStyle = {
    display: 'block',
    backgroundColor: 'rgba(0, 0, 0, .6)'
  }

  return (
    <div onClick={closeModal} className="modal show modal-xl fade" tabIndex="-1" style={modalStyle}>
      <div onClick={(ev) => ev.stopPropagation()} className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button onClick={closeModal} type="button" className="btn-close" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
