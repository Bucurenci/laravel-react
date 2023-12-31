import {ChangeEvent, useRef, useState} from 'react';
import ImageCropper from "../../../../components/ImageCropper";
import {IUser} from "../../../../models/User";
import {IUserFormErrors} from "../../../../models/ServerError";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton, Paper,
  Stack,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

interface AvatarFormProps {
  user: IUser,
  serverErrors: IUserFormErrors | null,
  onUpdate: (image: File) => void,
  onDelete: (user: IUser) => void
}

export default function AvatarForm({user, serverErrors, onUpdate, onDelete}: AvatarFormProps) {
  const avatarRef = useRef<HTMLInputElement>(null!);
  const [showDialog, setShowDialog] = useState<boolean>(false);
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
        setShowDialog(true);
      });

    }
  }

  const handleSave = () => {
    setShowDialog(false);
    onUpdate(croppedImage);
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
          <input
            onChange={onImageSelected}
            ref={avatarRef}
            type="file"
            hidden
            accept="image/*"
            className="form-control form-control-user"
            id="exampleInputAvatar" autoComplete="off"
            placeholder="Email Address"/>

          <Box sx={{position: 'relative', display: 'inline-block'}}>
            <Paper elevation={3} sx={{display: 'flex', overflow: "hidden"}}>
              <img src={user.avatar?.medium ? user.avatar.medium : "/img/user-avatar-placeholder.png"}
                   style={{maxWidth: '100%', height: 'auto'}} alt="IUser Avatar"/>
            </Paper>
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
          </Box>
          {serverErrors?.avatar && <div className="text-danger text-center mt-2">{serverErrors.avatar[0]}</div>}
        </>
      )}

      <Dialog
        onClose={() => setShowDialog(false)}
        aria-labelledby="customized-dialog-title"
        open={showDialog}
        maxWidth="lg"
      >
        <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
          Crop the image
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setShowDialog(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon/>
        </IconButton>
        <DialogContent dividers>
          <ImageCropper uploadedImage={uploadedImage} onCropFile={onCropFile}/>
        </DialogContent>
        {croppedImage.size && (
          <DialogActions>
            <Button autoFocus onClick={handleSave} variant="contained" size="large">
              Upload selection
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
