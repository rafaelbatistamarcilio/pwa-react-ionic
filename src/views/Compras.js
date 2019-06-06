import { IonContent } from '@ionic/react';
import React, { useState } from 'react';
import { New } from '../components/Buttons/New';
import { LabelFooter } from '../components/Footer/LabelFooter';
import { ActionHeader } from '../components/header/ActionHeader';
import { Messages } from '../constants';
import { ComprasCadastroModal } from '../components/Compras/ComprasCadastroModal/ComprasCadastroModal';
// import { calcularTotal, listarDespesas } from '../../services/DespesasService';

// let onExcluir;
// let onEditar;
// monitorarMensagens('EXCLUSAO:DESPESA', e =>  onExcluir() );
// monitorarMensagens('DESPESA_EDITAR', e => onEditar(e));

const Compras = () => {

    const [showFiltros, setFiltrar] = useState(false);
    const [showCadastro, setCadastrar] = useState(false);
    const [lista, setLista] = useState(null);

    const abrirModalCadastro = () => setCadastrar(true);
    const fecharModalCadastro = () => setCadastrar(false);
    const cadastrar = () => { setLista(null); abrirModalCadastro(); }

    return (
        <div>
            <ActionHeader title={Messages.COMPRAS.TITULO} action={() => abrirModalCadastro()} icon='options' />

            <IonContent id="content-container" fullscreen text-center>
                <ComprasCadastroModal show={showCadastro} dados={lista} hide={()=> fecharModalCadastro()}/>
            </IonContent>

            <LabelFooter label={Messages.COMUM.TOTAL + 0} />

            <New action={() => cadastrar()} />
        </div>
    );
}

export default Compras;