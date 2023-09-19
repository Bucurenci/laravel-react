export const dataURLtoFile = (dataUrl: any): File => {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bst = atob(arr[1]), n = bst.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bst.charCodeAt(n);
    }
    let blob = new Blob([u8arr], {type: mime});

    return new File([blob], "cropped-image.png");
}
