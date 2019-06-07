
export const copy = (from, to, defaultObj = null) => Object.keys(from).forEach(key => to[key] = from[key] ? from[key] : defaultObj ? defaultObj[key] : null);

export const values = obj => Object.values(obj);