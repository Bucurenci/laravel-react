export const objectAreEqual = (obj1: {}, obj2: {}) => {
    let objEqual = false;
    const obj1Keys = Object.keys(obj1).sort();
    const obj2Keys = Object.keys(obj2).sort();
    if (obj1Keys.length === obj2Keys.length) {
        const areEqual = obj1Keys.every((key, index) => {
            const objValue1 = obj1[key];
            const objValue2 = obj2[obj2Keys[index]];
            return objValue1 === objValue2;
        });
        if (areEqual) {
            objEqual = true;
        }
    }

    return objEqual;
}
