import { copy } from "../utils/ObjectUtils";

/**
 * 
 * @param {{event:Event, formData:any, defaultData:any, updateState:Function}} updateEvent 
 */
export const updateForm = updateEvent => {
    let form = {};
    copy(updateEvent.formData, form, updateEvent.defaultData);
    form[updateEvent.event.target.name] = updateEvent.event.target.value;
    updateEvent.updateState(form)
}

export const copyWithId = (data, id) => {
    const copy = {};
    Object.keys(data).forEach(key => copy[key] = data[key]);
    copy.id = id;
    return copy;
}