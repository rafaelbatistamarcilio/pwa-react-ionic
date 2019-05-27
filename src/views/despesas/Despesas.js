import { IonButton, IonContent, IonFooter, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { DespesasLista } from '../../components/Depesas/DespesasLista/DespesasLista';
import { FiltroDespesasModal } from '../../components/Depesas/FiltroDespesasModal';
import { Header } from '../../components/header/Header';
import { listarDespesas, filtrarDespesas } from '../../services/DespesasService';

const Despesas = () => {
    const [despesas, setDespesas] = useState(listarDespesas());
    const [filtrar, setFiltrar] = useState(false);

    function filtrarDados(filtro) {
        setFiltrar(false);
        setDespesas(filtrarDespesas(filtro));
    }

    return (
        <div>
            <Header titulo='Despesas' />
            <IonContent id="content-container" fullscreen text-center>
                <DespesasLista data={despesas} />
                <FiltroDespesasModal show={filtrar} hide={() => setFiltrar(false)} filtrar={(e) => filtrarDados(e)} />
            </IonContent>
            <IonFooter translucent="true">
                <IonToolbar>
                    <IonButton expand="block" fill="outline" color="dark" onClick={() => setFiltrar(true)} >Filtros</IonButton>
                </IonToolbar>
            </IonFooter>
        </div>
    );
}

export default Despesas;