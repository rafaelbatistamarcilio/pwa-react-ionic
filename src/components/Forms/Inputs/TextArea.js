import React from 'react';
import { IonItem, IonLabel, IonTextarea } from '@ionic/react';

export const TextArea = props => (
    <IonItem>
        <IonLabel position="floating">{props.label}</IonLabel>
        <IonTextarea value={props.value} name={props.name} onIonChange={e => props.onChange(e)}></IonTextarea>
    </IonItem>
);