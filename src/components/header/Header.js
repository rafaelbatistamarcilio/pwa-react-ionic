import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonIcon } from "@ionic/react";
import React from "react";

export const Header = (props) => (
    <IonHeader class="header header-md hydrated">
        <IonToolbar class="hydrated">
            <IonButtons slot="start">
                <IonMenuButton menu="app-menu" >
                    <IonIcon name='menu' size='large' />
                </IonMenuButton>
            </IonButtons>
            <IonTitle class="title-md hydrated"> {props.titulo}</IonTitle>
        </IonToolbar>
    </IonHeader>
)