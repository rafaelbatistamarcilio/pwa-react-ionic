import React from 'react';
import { IonItem, IonText, IonLabel } from '@ionic/react';

export const DespesaItem = prop => (
    <IonItem detail>
        <IonLabel text-wrap >
            <IonText color="primary">
                <h3> {prop.dados.tipo}</h3>
            </IonText>
            <p>{prop.dados.descricao}</p>
            <IonText color="secondary">
                <p>{prop.dados.total}</p>
            </IonText>
        </IonLabel>
    </IonItem>
)