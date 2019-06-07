
/** @param {Number} value  */
export const toMoney = value => Number(value).toFixed(2);

export const clearMoney = value => toMoney(value.replace('R$ ', ''));

export const generateId = () => new Date().getTime() + Math.random();