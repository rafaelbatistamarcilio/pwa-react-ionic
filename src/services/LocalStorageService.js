import { generateId } from "../utils/MathUtils";

/**
 * @param {string} store 
 * @returns {{id:number}[]}
 */
export const getStore = store => {
    let storage = localStorage.getItem(store);
    const dados = JSON.parse(storage);
    return dados ? dados : [];
};

/**
 * @param {string} store 
 * @param {any []} data 
 */
export const setData = (store, data) => localStorage.setItem(store, JSON.stringify(data));

/**
 * @param {string} storage 
 * @param {{id:number}} data 
 */
export const save = (storage, data) => {
    data.id = generateId();
    const collection = getStore(storage);
    collection.push(data);
    setData(storage, collection);
    return data;
}

/**
 * @param {string} storage 
 * @param { {id: number} } item 
 */
export const update = (storage, newItem) => {
    const collection = getStore(storage);
    const item = collection.filter(oldItem => oldItem.id === newItem.id)[0];
    Object.keys(item).forEach(key => item[key] = newItem[key]);
    setData(storage, collection);
}

/**
 * @param {string} storage 
 * @param {number} id 
 */
export const remove = (storage, id) => {
    const size = getStore(storage).length;
    const collection = getStore(storage).filter(item => item.id !== id);
    if (collection.length !== size) {
        setData(storage, collection);
        return true;
    }
    return false;
}

/**
 * @param {string} storage 
 * @param {number} id 
 */
export const findById = (storage, id) => {
    const find = getStore(storage).filter(item => Number(item.id) === id);
    return find && find.length === 1 ? find[0] : null;
}

/**
 * @param {string} storage 
 * @param {any[]} data 
 */
export const addAll = (storage, data) => {
    let collection = getStore(storage);
    if (data && data.length) {
        collection = collection.concat(data);
        setData(storage, collection);
    }
}