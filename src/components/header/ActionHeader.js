import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonIcon, IonTitle, IonButton } from '@ionic/react';

export const ActionHeader = props => (
    <IonHeader class="header header-md hydrated">
        <IonToolbar class="hydrated">
            <IonButtons slot="start">
                <IonMenuButton menu="app-menu" >
                    <IonIcon name='menu' size='large' />
                </IonMenuButton>
            </IonButtons>
            <IonTitle class="title-md hydrated"> {props.title} </IonTitle>
            <IonButtons slot="end">
                <IonButton onClick={() => props.action()}>
                    <IonIcon name={props.icon} size='large' />
                </IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
)