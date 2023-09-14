import React, {useState, createRef} from "react";
import Cropper, {ReactCropperElement} from "react-cropper";
import "cropperjs/dist/cropper.css";

export const ImageCropper: React.FC = ({uploadedImage, onCropFile}) => {

  const [cropData, setCropData] = useState<string | undefined>(null);
  const cropperRef = createRef<ReactCropperElement>();
  const defaultOptions = {
    ref: cropperRef,
    zoomTo: 0.5,
    initialAspectRatio: 1,
    aspectRatio: 1,
    src: uploadedImage,
    viewMode: 1,
    minCropBoxHeight: 10,
    minCropBoxWidth: 10,
    background: false,
    responsive: true,
    autoCropArea: 1,
    checkOrientation: false, // https://github.com/fengyuanchen/cropperjs/issues/671
    guides: true,
    style: {maxHeight: 700, width: "100%"}
  }


  const getCropData = () => {
    let cropDataUrlBase64 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();

    if (typeof cropDataUrlBase64 !== "undefined") {

      setCropData(cropDataUrlBase64);

      if (cropDataUrlBase64) {

        let binaryString = atob(cropDataUrlBase64.split(',')[1]); // Binary data string
        let blob = new Blob([binaryString], {type: 'image/png'}); // Create a BLOB object

        let file = new File([blob], 'user-avatar.png', {type: 'image/png'});

        onCropFile(file);
      }
    }
  }

  const onCancel = () => {
    setCropData(null);
    onCropFile(null);
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
