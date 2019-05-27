import { IonContent, IonHeader, IonItem, IonList, IonMenu, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import React from "react";
import { Link } from 'react-router-dom';

export const Menu = () => (
    <IonMenu side="start" type="overlay" menuId="app-menu" contentId="content-container">
        <IonHeader>
            <IonToolbar color="dark">
                <IonTitle>Menu</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent>
            <IonList lines="full">
                <IonItem>
                    <IonMenuButton>
                        <Link to={{ pathname: '/' }} > Home</Link>
                    </IonMenuButton>
                </IonItem>
                <IonItem>
                    <IonMenuButton>
                        <Link to={{ pathname: '/dados' }} > Dados</Link>
                    </IonMenuButton>
                </IonItem>
                <IonItem>
                    <IonMenuButton>
                        <Link to={{ pathname: '/despesas' }} > Despesas </Link>
                    </IonMenuButton>
                </IonItem>
            </IonList >
        </IonContent >
    </IonMenu >
)