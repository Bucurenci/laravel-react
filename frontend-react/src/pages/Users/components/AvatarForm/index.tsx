import {useRef, useState} from 'react';
import Modal from "../../../../components/Modal";
import ImageCropper from "../../../../components/ImageCropper";
import {fileToDataUrl} from "../../../../utils/Files";

export default function AvatarForm({user, errors, onUpdate, onDelete}) {
  const avatarRef = useRef<HTMLInputElement>(null!);
  const [showModal, setShowModal] = useState<boolean>();
  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer>('');
  const [croppedImage, setCroppedImage] = useState<File>(null);

  const onSelectImage = (): void => {
    avatarRef.current.value = "";
    avatarRef.current.click();
  }

  const onImageSelected = (e): void => {
    setCroppedImage(null);

    if (e.target.files && e.target.files.length > 0) {

      fileToDataUrl(e.target.files[0], (result) => {

        setUploadedImage(result);
        setShowModal(true);
      });

    }
  }

  const handleSave = () => {
    setShowModal(false);
    onUpdate(croppedImage);
  }

  const onCropFile = (file: File) => {
    setCroppedImage(file);
  }

  return (

    <>
      {user && (
        <>
          <div className="position-relative d-inline-block">
            <img src={user.avatar.medium ? user.avatar.medium : "/img/user-avatar-placeholder.png"}
                 className="img-fluid rounded shadow" alt="User Avatar"/>
            <div className="position-absolute bottom-0 end-0 mb-2 me-2">
              {user.avatar ? (
                <>
                  <button onClick={onSelectImage} className="btn btn-primary"><i className="fa fa-pencil"></i></button>
                  <button onClick={onDelete} className="btn btn-danger ms-2"><i className="fa fa-trash"></i>
                  </button>
                </>
              ) : (
                <button onClick={onSelectImage}
                        className="btn btn-primary"><i className="fa fa-upload"></i></button>
              )}
            </div>
          </div>
          {errors?.avatar && <div className="text-danger text-center mt-2">{errors.avatar[0]}</div>}
        </>
      )}

      <form className="user col d-none" autoComplete="off">

        <div className="col-lg-5 mb-3 mb-lg-0 order-lg-last">

          <div className="mt-3">
            <input
              onChange={onImageSelected}
              ref={avatarRef}
              type="file"
              accept="image/*"
              className="form-control form-control-user"
              id="exampleInputAvatar" autoComplete="off"
              placeholder="Email Address"/>
          </div>
        </div>
      </form>

      <Modal title="Crop the image" showModal={showModal} setShowModal={setShowModal}
             saveButton={croppedImage ? "Upload selection" : null}
             onSave={handleSave}>

        <div className="text-center">
          <ImageCropper uploadedImage={uploadedImage} onCropFile={onCropFile}/>
        </div>
      </Modal>
    </>
  );
}
