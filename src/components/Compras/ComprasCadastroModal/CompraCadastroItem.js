import { IonCheckbox, IonItem, IonLabel, IonText } from '@ionic/react';
import React from 'react';

export const CompraCadastroItem = ({ dados, events }) => (
    <IonItem key={dados.descricao}>
        <IonCheckbox
            slot='start'
            color="success"
            checked={dados.comprado}
            onIonChange={e => events.onCheck({ id: dados.id, checked: e.target.checked })} />
        <IonLabel>{dados.descricao}</IonLabel>
        <IonText color="secondary">
            <p>{dados.total}</p>
        </IonText>
    </IonItem>
)