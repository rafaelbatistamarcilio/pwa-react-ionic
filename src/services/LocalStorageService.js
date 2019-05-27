
/**
 * @param {string} store 
 * @returns {any[]}
 */
export const getStore = store=> {
    let storage = localStorage.getItem(store);
    const dados = JSON.parse(storage);
    return dados ? dados: [];
};

export const setData = (store, data)=> localStorage.setItem(store, JSON.stringify(data));