import React from 'react';
import { IonItem, IonMenuButton } from '@ionic/react';
import { Link } from 'react-router-dom';

export const MenuItem = props => (
    <IonItem >
        <IonMenuButton >
            <Link className="menu-button" to={{ pathname: props.path }} >{props.label}</Link>
        </IonMenuButton>
    </IonItem>
)