import { IonButton, IonCol, IonFooter, IonGrid, IonRow, IonToolbar } from '@ionic/react';
import React from 'react';

export const ModalFooter = props => (
    <IonFooter translucent="true">
        <IonToolbar>
            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <IonButton expand="block" fill="outline" color="dark" onClick={() => props.onCancel()} >{props.cancelLabel}</IonButton>
                    </IonCol>
                    <IonCol size="6">
                        <IonButton expand="block" fill="outline" color="success" onClick={() => props.onConfirm()} >{props.confirmLabel}</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonToolbar>
    </IonFooter>
)