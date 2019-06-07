import { IonContent, IonItem, IonList } from '@ionic/react';
import React, { useState } from 'react';
import { New } from '../components/Buttons/New';
import { ComprasCadastroModal } from '../components/Compras/ComprasCadastroModal/ComprasCadastroModal';
import { LabelFooter } from '../components/Footer/LabelFooter';
import { ActionHeader } from '../components/header/ActionHeader';
import { Messages } from '../constants';
import { listarCompras } from '../services/ComprasService';

const Compras = () => {

    const [showCadastro, setCadastrar] = useState(false);
    const [lista, setLista] = useState(null);

    const abrirModalCadastro = () => setCadastrar(true);
    const fecharModalCadastro = () => setCadastrar(false);
    const cadastrar = () => { setLista(null); abrirModalCadastro(); }

    return (
        <div>
            <ActionHeader title={Messages.COMPRAS.TITULO} action={() => abrirModalCadastro()} icon='options' />

            <IonContent id="content-container" fullscreen text-center>

                <IonList>
                    {listarCompras().map(compra => (
                        <IonItem>{compra.data} - {compra.descricao}</IonItem>
                    ))}
                </IonList>

                <ComprasCadastroModal show={showCadastro} dados={lista} hide={() => fecharModalCadastro()} />
            </IonContent>

            <LabelFooter label={Messages.COMUM.TOTAL + 0} />

            <New action={() => cadastrar()} />
        </div>
    );
}

export default Compras;