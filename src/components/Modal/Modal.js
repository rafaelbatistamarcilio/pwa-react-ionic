import { IonContent, IonModal } from '@ionic/react';
import React from 'react';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';

export const Modal = props => (
    <IonModal isOpen={props.show} onDidDismiss={() => props.hide()} onIonModalDidPresent={() => props.onInit ? props.onInit() : null} >
        <ModalHeader action={() => props.hide()} title={props.title} />

        <IonContent>
            {props.children}
        </IonContent>

        <ModalFooter
            cancelLabel={props.cancelLabel}
            confirmLabel={props.confirmLabel}
            onCancel={() => props.onCancel()}
            onConfirm={() => props.onConfirm()}
        />
    </IonModal>
)