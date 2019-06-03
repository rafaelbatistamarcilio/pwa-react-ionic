import React from 'react';
import { IonFooter, IonToolbar, IonItem, IonLabel } from '@ionic/react';

export const LabelFooter = props => (
    <IonFooter translucent="true">
        <IonToolbar>
            <IonItem>
                <IonLabel>
                    {props.label}
                </IonLabel>
            </IonItem>
        </IonToolbar>
    </IonFooter>
);