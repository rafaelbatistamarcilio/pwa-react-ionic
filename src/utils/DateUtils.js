
export const dateToString = data => data ? data.substr(0, 10).split('-').reverse().join('/') : null;

export const stringToDate = stringDate => new Date(stringDate.split('/').reverse().join('-') + "T03:00:00");

/**
 * @param {string} ddmmyyyyString 
 */
export const toEUADate = ddmmyyyyString => ddmmyyyyString && ddmmyyyyString.length === 10 ? ddmmyyyyString.split('/').reverse().join('-') : null;