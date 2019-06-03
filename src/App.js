import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { IonApp, IonContent } from '@ionic/react';
import React from 'react';
import { MensagemHOC } from './components/mensagem/MensagemHOC';
import { Menu } from './components/menu/Menu';
import { Router } from './components/Router/Router';
import { Routes } from './components/Router/Routes';

export const App = () => (
  <IonApp>
    <MensagemHOC />
    <Menu routes={Routes}/>
    <IonContent id="content-container" fullscreen>
      <Router routes={Routes}/>
    </IonContent>
  </IonApp>
);
