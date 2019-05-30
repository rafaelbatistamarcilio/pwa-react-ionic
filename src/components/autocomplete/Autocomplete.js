import React from 'react';
import { IonCard, IonItem } from '@ionic/react';

export const Autocomplete = props => (
    <IonCard>
        {
            props.show === props.name && props.search ? props.options
                .filter(option => option.toUpperCase().indexOf(props.search.toUpperCase()) !== -1)
                .map(item => (
                    <IonItem key={new Date().getTime() + Math.random()} onClick={() => props.onSelect({ target: { name: props.name, value: item } }) }>
                        {item}
                    </IonItem>)
                ) : ""
        }
    </IonCard>
)