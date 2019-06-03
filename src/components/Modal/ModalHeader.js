import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle } from '@ionic/react';

export const ModalHeader = props => (
    <IonHeader class="header header-md hydrated">
        <IonToolbar class="hydrated">
            <IonButtons slot="start">
                <IonIcon name='arrow-round-back' size='large' onClick={() => props.action()} />
            </IonButtons>
            <IonTitle class="title-md hydrated">{props.title}</IonTitle>
        </IonToolbar>
    </IonHeader>
)