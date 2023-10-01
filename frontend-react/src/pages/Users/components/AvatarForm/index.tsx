import {ChangeEvent, useRef, useState} from 'react';
import Modal from "../../../../components/Modal";
import ImageCropper from "../../../../components/ImageCropper";
import {User, UserFormErrors} from "../../../../models/User";
import {Box, Button, Stack} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface AvatarFormProps {
  user: User,
  errors: UserFormErrors | null,
  onUpdate: (user: User, image: File) => void,
  onDelete: (user: User) => void
}

export default function AvatarForm({user, errors, onUpdate, onDelete}: AvatarFormProps) {
  const avatarRef = useRef<HTMLInputElement>(null!);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(null);
  const [croppedImage, setCroppedImage] = useState<File>({} as File);

  const onSelectImage = (): void => {
    avatarRef.current.value = "";
    avatarRef.current.click();
  }

  const onImageSelected = (e: ChangeEvent<HTMLInputElement>): void => {
    setCroppedImage({} as File);

    if (e.target.files instanceof FileList) {

      const reader: FileReader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        setUploadedImage(reader.result);
        setShowModal(true);
      });

    }
  }

  const handleSave = () => {
    setShowModal(false);
    onUpdate(user, croppedImage);
  }

  const handleDelete = () => {
    onDelete(user);
  }

  const onCropFile = (file: File) => {
    setCroppedImage(file);
  }

  return (

    <>
      {user && (
        <>
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

          <div className="position-relative d-inline-block">
            <img src={user.avatar?.medium ? user.avatar.medium : "/img/user-avatar-placeholder.png"}
                 className="img-fluid rounded shadow" alt="User Avatar"/>
            <Box component="div" sx={{position: "absolute", bottom: 0, right: 0, mb: 1, mr: 1}}>
              {user.avatar?.medium ? (
                <Stack direction="row" spacing={1}>
                  <Button onClick={onSelectImage} variant="contained" sx={{minWidth: 45, px: 0}}>
                    <EditIcon/>
                  </Button>
                  <Button onClick={handleDelete} variant="contained" color="error" sx={{minWidth: 45, px: 0}}>
                    <DeleteIcon/>
                  </Button>
                </Stack>
              ) : (
                <Button onClick={onSelectImage} variant="contained" sx={{minWidth: 45, px: 0}}>
                  <CloudUploadIcon/>
                </Button>
              )}
            </Box>
          </div>
          {errors?.avatar && <div className="text-danger text-center mt-2">{errors.avatar[0]}</div>}
        </>
      )}

      <Modal title="Crop the image" showModal={showModal} setShowModal={setShowModal}
             saveButton={croppedImage.size ? "Upload selection" : ''}
             onSave={handleSave}>

        <div className="text-center">
          <ImageCropper uploadedImage={uploadedImage} onCropFile={onCropFile}/>
        </div>
      </Modal>
    </>
  );
}
