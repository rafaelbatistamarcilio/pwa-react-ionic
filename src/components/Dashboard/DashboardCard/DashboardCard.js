
import React from 'react';
import { Link } from 'react-router-dom';
import { IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/react';

export const DashboarCard = props => (
    <Link to={{ pathname: props.path }} className="sem-detalhe">
        <IonCard>
            <IonCardHeader>
                <ion-icon name={props.icon} size="large"></ion-icon>
                <IonCardSubtitle>{props.title}</IonCardSubtitle>
                <div>R$ {props.total}</div>
            </IonCardHeader>
        </IonCard>
    </Link>
)