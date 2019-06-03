import React from 'react';
import { IonItem, IonLabel, IonDatetime } from '@ionic/react';

export const Datepicker = props => (
    <IonItem>
        <IonLabel position="floating">{props.label}</IonLabel>
        <IonDatetime 
            displayFormat={props.format} 
            pickerFormat={props.format} 
            value={props.value} 
            name={props.name} 
            onIonChange={e => props.onChange(e)} />
    </IonItem>
)