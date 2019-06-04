
import React from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';

export const NumberInput = props => (
    <IonItem>
        <IonLabel position="floating">{props.label}</IonLabel>
        <IonInput disabled={props.disabled} type="number" value={props.value} name={props.name} onIonChange={e => props.onChange(e)} />
    </IonItem>
);