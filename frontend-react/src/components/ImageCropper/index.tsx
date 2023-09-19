import {useState, createRef, FC} from "react";
import Cropper, {ReactCropperElement, ReactCropperProps} from "react-cropper";
import "cropperjs/dist/cropper.css";
import {dataURLtoFile} from "../../utils/Files";

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
        <>
          <div className="mb-3">
            <img src={cropData} className="img-fluid" style={{maxHeight: 700}} alt="cropped"/>
          </div>

          <button className="btn btn-secondary btn-lg" onClick={onCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className="mb-3">
            <Cropper {...defaultOptions} />
          </div>

          <button className="btn btn-primary btn-lg" onClick={getCropData}>
            Crop Image
          </button>
        </>

      )}
    </>
  );
};

export default ImageCropper;
