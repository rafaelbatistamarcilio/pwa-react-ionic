import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { CadastroDespesaModal } from '../../components/Depesas/CadastroDespesaModal';
import { DespesasLista } from '../../components/Depesas/DespesasLista/DespesasLista';
import { FiltroDespesasModal } from '../../components/Depesas/FiltroDespesasModal';
import { filtrarDespesas, listarDespesas } from '../../services/DespesasService';
import { monitorarMensagens } from '../../services/MensagemService';

const Despesas = () => {
    const [despesas, setDespesas] = useState(listarDespesas());
    const [filtrar, setFiltrar] = useState(false);
    const [novo, setNovo] = useState(false);

    monitorarMensagens('EXCLUSAO:DESPESA', e=> setDespesas(listarDespesas()))

    function filtrarDados(filtro) {
        setFiltrar(false);
        setDespesas(filtrarDespesas(filtro));
    }

    function calcularTotal() {
        if (despesas && despesas.length) {
            return despesas.reduce((total, item) => total + Number(item.total), 0).toFixed(2);
        }

        return 0;
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
                <CadastroDespesaModal show={novo} hide={() => setNovo(false)} onSave={() => setDespesas(listarDespesas())} />
            </IonContent>

            <IonFooter translucent="true">
                <IonToolbar>
                    <IonItem><IonLabel>Total: {calcularTotal()} </IonLabel> </IonItem>
                </IonToolbar>
            </IonFooter>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => setNovo(true)}>
                    <IonIcon name="add" />
                </IonFabButton>
            </IonFab>
        </div>
    );
}

export default Despesas;