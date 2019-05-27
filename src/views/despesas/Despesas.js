import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { DespesasLista } from '../../components/Depesas/DespesasLista/DespesasLista';
import { FiltroDespesasModal } from '../../components/Depesas/FiltroDespesasModal';
import { filtrarDespesas, listarDespesas } from '../../services/DespesasService';

const Despesas = () => {
    const [despesas, setDespesas] = useState(listarDespesas());
    const [filtrar, setFiltrar] = useState(false);

    function filtrarDados(filtro) {
        setFiltrar(false);
        setDespesas(filtrarDespesas(filtro));
    }

    return (
        <div>
            <IonHeader class="header header-md hydrated">
                <IonToolbar class="hydrated">
                    <IonButtons slot="start">
                        <IonMenuButton menu="app-menu" >
                            <IonIcon name='menu' size='large' />
                        </IonMenuButton>
                    </IonButtons>
                    <IonTitle class="title-md hydrated"> Despesas </IonTitle>
                    <IonButtons slot="end">
                        <IonButton menu="app-menu" onClick={() => setFiltrar(true)}>
                            <IonIcon name='options' size='large' />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent id="content-container" fullscreen text-center>
                <DespesasLista data={despesas} />
                <FiltroDespesasModal show={filtrar} hide={() => setFiltrar(false)} filtrar={(e) => filtrarDados(e)} />
            </IonContent>
            <IonFooter translucent="true">
                <IonToolbar>
                    <IonItem><IonLabel>Total: {despesas.reduce((total, item) => total + item.total, 0).toFixed(2)} </IonLabel> </IonItem>
                </IonToolbar>
            </IonFooter>
        </div>
    );
}

export default Despesas;