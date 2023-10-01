import {useState, createRef, FC} from "react";
import Cropper, {ReactCropperElement, ReactCropperProps} from "react-cropper";
import "cropperjs/dist/cropper.css";
import {dataURLtoFile} from "../../utils/Files";
import {Box, Button, Grid} from "@mui/material";

interface ImageCropperProps {
  uploadedImage: string | ArrayBuffer | null;
  onCropFile: (image: File) => void
}

export const ImageCropper: FC<ImageCropperProps> = ({uploadedImage, onCropFile}) => {

  const [cropData, setCropData] = useState<string | undefined>();
  const cropperRef = createRef<ReactCropperElement>();

  const defaultOptions: ReactCropperProps = {
    // @ts-ignore
    ref: cropperRef,
    // @ts-ignore
    zoomTo: 0.5,
    // @ts-ignore
    initialAspectRatio: 1,
    // @ts-ignore
    aspectRatio: 1,
    // @ts-ignore
    src: uploadedImage,
    // @ts-ignore
    viewMode: 1,
    // @ts-ignore
    minCropBoxHeight: 10,
    // @ts-ignore
    minCropBoxWidth: 10,
    // @ts-ignore
    background: false,
    // @ts-ignore
    responsive: true,
    // @ts-ignore
    autoCropArea: 1,
    // @ts-ignore
    checkOrientation: false, // https://github.com/fengyuanchen/cropperjs/issues/671
    // @ts-ignore
    guides: true,
    // @ts-ignore
    style: {maxHeight: 700, width: "100%"}
  }

  const getCropData = () => {
    // @ts-ignore
    let dataUrl = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();

    if (typeof dataUrl !== "undefined") {

      setCropData(dataUrl);

      if (dataUrl && onCropFile) {
        onCropFile(dataURLtoFile(dataUrl));
      }
    }
  }

  const onCancel = () => {
    setCropData(undefined);

    if (onCropFile) {
      onCropFile({} as File);
    }
  }

  return (
    <>
      {cropData ? (
        <Grid container display="flex" direction="column" justifyContent="center">

          <Box component="div" mb={2}>
            <img src={cropData} alt="cropped" style={{maxWidth: '100%', height: 'auto', maxHeight: 650}}/>
          </Box>

          <Box component="div" sx={{textAlign: "center"}}>
            <Button variant="contained" color="secondary" size="large"
                    sx={{
                      backgroundColor: (theme) => theme.palette.grey[500],
                      '&:hover': {backgroundColor: (theme) => theme.palette.grey[600]}
                    }}
                    onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        </Grid>
      ) : (
        <Grid container display="flex" direction="column" justifyContent="center">
          <Box component="div" mb={2}>
            <Cropper {...defaultOptions} />
          </Box>

          <Box component="div" sx={{textAlign: "center"}}>
            <Button variant="contained" size="large" onClick={getCropData}>
              Crop Image
            </Button>
          </Box>
        </Grid>

      )}
    </>
  );
};

export default ImageCropper;
