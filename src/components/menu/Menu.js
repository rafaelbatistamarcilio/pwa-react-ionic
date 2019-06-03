import { IonContent, IonHeader, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/react';
import React from "react";
import './Menu.css';
import { MenuItem } from './MenuItem';
import { Messages } from '../../constants';

export const Menu = props => (
    <IonMenu side="start" type="overlay" menuId="app-menu" contentId="content-container">
        <IonHeader>
            <IonToolbar color="dark">
                <IonTitle>{Messages.COMUM.MENU}</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent>
            <IonList lines="full">
                {Object.values(props.routes).map(route => <MenuItem key={route.path} path={route.path} label={route.label} />)}
            </IonList >
        </IonContent >
    </IonMenu >
)