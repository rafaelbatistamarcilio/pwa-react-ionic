import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { IonApp, IonContent } from '@ionic/react';
import React from 'react';
import { MensagemHOC } from './components/mensagem/MensagemHOC';
import { Menu } from './components/menu/Menu';
import { Router } from './components/Router/Router';
import { Routes } from './components/Router/Routes';

const Context = React.createContext();
export const AppContext = {
  API: 'teste'
}
export const App = () => (
  <IonApp>
    <MensagemHOC />
    <Menu routes={Routes} />
    <IonContent id="content-container" fullscreen>
      <Context.Provider value={AppContext} >
        <Router routes={Routes} />
      </Context.Provider>
    </IonContent>
  </IonApp>
);