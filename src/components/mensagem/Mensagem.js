import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { IonToast } from '@ionic/react';
import React from 'react';
import './Mensagem.css';

export const Mensagem = props => (<IonToast
    isOpen={props.texto !== ""}
    onDidDismiss={() => props.hide()}
    message={props.texto}
    duration={2000}
    position='bottom'
    buttons={[{
        icon: 'close-circle',
        role: 'cancel'
    }]} />)