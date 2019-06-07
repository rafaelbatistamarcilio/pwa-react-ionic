import React, { useState } from 'react';
import { TextInput } from './TextInput';
import { Autocomplete } from '../../autocomplete/Autocomplete';

export const AutocompleteInput = props => {

    const [complete, setComplete] = useState('');

    return (
        <>
            <TextInput
                label={props.label}
                value={props.value}
                name={props.name}
                onChange={e => props.onChange(e)}
                onFocus={() => setComplete(props.name)}
                onBlur={()=> setTimeout(()=> setComplete(''), 10)} />
            <Autocomplete
                name={props.name}
                show={complete}
                options={props.options}
                search={props.value}
                onSelect={e => { setComplete(''); props.onChange(e) }} />
        </>
    )
}