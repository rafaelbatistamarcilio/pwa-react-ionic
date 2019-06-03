import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';

export const New = props => (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => props.action()}>
            <IonIcon name="add" />
        </IonFabButton>
    </IonFab>
);