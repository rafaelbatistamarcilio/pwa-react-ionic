import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonFooter, IonToolbar } from "@ionic/react";
import React from "react";
import { FileInput } from "../../components/FileInput/FileInput";
import { Header } from "../../components/header/Header";
import { importarDespesas, limparDespesas } from "../../services/DespesasService";
import { toast } from "../../services/MensagemService";
import { Messages } from "../../constants";

function limpar() {
    limparDespesas();
    toast(Messages.DADOS.EXCLUSAO.SUCESSO)
}

const Dados = () => (
    <div>
        <Header titulo="Dados" />
        <IonContent id="content-container" fullscreen text-center>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Gerenciar dados</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <FileInput change={importarDespesas} />
                </IonCardContent>
            </IonCard>
        </IonContent>
        <IonFooter translucent="true">
            <IonToolbar>
                <IonButton expand="block" fill="outline" color="danger" onClick={() => limpar()} >Limpar</IonButton>
            </IonToolbar>
        </IonFooter>
    </div>
);

export default Dados;