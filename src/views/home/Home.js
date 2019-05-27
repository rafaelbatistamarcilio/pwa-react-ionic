import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from "@ionic/react";
import React from "react";
import { Header } from "../../components/header/Header";
import { toast } from "../../services/MensagemService";

export const Home = () => (
    <div>
        <Header titulo='Inicio' />
        <IonContent id="content-container" fullscreen text-center>

            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Welcome to Ionic</IonCardSubtitle>
                    <IonCardTitle onClick={()=> toast('Teste pub/sub')}>Running on React</IonCardTitle>
                </IonCardHeader>
            </IonCard>

        </IonContent>
    </div>
);