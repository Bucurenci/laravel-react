export const dataURLtoBlob = (dataUrl): Blob => {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bst = atob(arr[1]), n = bst.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bst.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

export const dataURLtoFile = (dataUrl): File => {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bst = atob(arr[1]), n = bst.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bst.charCodeAt(n);
    }
    let blob = new Blob([u8arr], {type: mime});

    return new File([blob], "cropped-image.png");
}

export const fileToDataUrl = (file: File, callback: Function): void => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
        callback(reader.result);
    });
}
