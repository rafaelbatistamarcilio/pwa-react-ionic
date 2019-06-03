import { IonContent } from '@ionic/react';
import React, { useState } from 'react';
import { New } from '../components/Buttons/New';
import { LabelFooter } from '../components/Footer/LabelFooter';
import { ActionHeader } from '../components/header/ActionHeader';
import { Messages } from '../constants';
// import { calcularTotal, listarDespesas } from '../../services/DespesasService';

// let onExcluir;
// let onEditar;
// monitorarMensagens('EXCLUSAO:DESPESA', e =>  onExcluir() );
// monitorarMensagens('DESPESA_EDITAR', e => onEditar(e));

const Compras = () => {

    const [filtrar, setFiltrar] = useState(false);

    function cadastrar() {
    }

    return (
        <div>
            <ActionHeader title={Messages.COMPRAS.TITULO} action={() => setFiltrar(true)} icon='options' />

            <IonContent id="content-container" fullscreen text-center>
            </IonContent>

            <LabelFooter label={Messages.COMUM.TOTAL + 0} />

            <New action={() => cadastrar()} />
        </div>
    );
}

export default Compras;