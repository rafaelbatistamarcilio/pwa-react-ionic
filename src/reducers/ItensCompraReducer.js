 export const ItensCompraReducer = (myArray, { type, value }) => {
    switch (type) {
        case 'set':
            myArray = value;
            return myArray;
        case "add":
            return [...myArray, value];
        case "add-all":
            return myArray.concat(value);
        case "remove":
            return myArray.filter((_, index) => index !== value);
        case "update":
            myArray.filter((_, index) => index !== value.id)[0] = value;
            return myArray;
        default:
            return myArray;
    }
}