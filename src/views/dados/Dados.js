import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent } from "@ionic/react";
import React from "react";
import { FileInput } from "../../components/FileInput/FileInput";
import { Header } from "../../components/header/Header";
import { importarDespesas } from "../../services/DespesasService";

const Dados = () => (
    <div>
        <Header titulo='Dados' />
        <IonContent id="content-container" fullscreen text-center>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Gerenciar dados</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <FileInput  change={importarDespesas}/>
                </IonCardContent>
            </IonCard>
        </IonContent>
    </div>
);

export default Dados;