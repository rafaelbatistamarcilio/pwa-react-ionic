
export const copy = (from, to, defaultObj) => Object.keys(from).forEach(key => to[key] = from[key] ? from[key] : defaultObj ? defaultObj[key] : null);

export const values = obj => Object.values(obj);

export const toDate = stringDate =>  new Date(stringDate.split('/').reverse().join('-')+"T03:00:00");

export const toEUADate = ddmmyyyyString => ddmmyyyyString.split('/').reverse().join('-');