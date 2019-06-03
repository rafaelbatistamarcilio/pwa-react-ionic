import React from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';

export const TextInput = props => (
    <IonItem>
        <IonLabel position="floating">{props.label}</IonLabel>
        <IonInput
            type="text"
            value={props.value}
            name={props.name}
            onIonChange={e => props.onChange ? props.onChange(e) : null}
            onIonFocus={() => props.onFocus ? props.onFocus() : null} />
    </IonItem>
)