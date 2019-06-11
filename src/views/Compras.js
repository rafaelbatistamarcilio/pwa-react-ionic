import { IonContent } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { New } from '../components/Buttons/New';
import { CompraItem } from '../components/Compras/CompraItem';
import { ComprasCadastroModal } from '../components/Compras/ComprasCadastroModal/ComprasCadastroModal';
import { LabelFooter } from '../components/Footer/LabelFooter';
import { ActionHeader } from '../components/header/ActionHeader';
import { Lista } from '../components/lista/Lista';
import { Messages, Events } from '../constants';
import { listarCompras } from '../services/ComprasService';
import { monitorarMensagens } from '../services/MensagemService';

let onExcluir;
let onEditar;
monitorarMensagens(Events.COMPRAS.EXCLUSAO, e => onExcluir());
monitorarMensagens(Events.COMPRAS.EDICAO, e => onEditar(e));

const Compras = () => {

    const [compras, setCompras] = useState(listarCompras());
    const [showCadastro, setCadastrar] = useState(false);
    const [compra, setCompra] = useState(null);

    const onSave = e => setCompras(listarCompras());

    onEditar = e => {
        setCompra(e);
        setCadastrar(true);
    }

    onExcluir = ()=> setCompras(listarCompras());

    const abrirModalCadastro = () => setCadastrar(true);
    const fecharModalCadastro = () => setCadastrar(false);
    const cadastrar = () => { setCompra(null); abrirModalCadastro(); }
    const contex = useContext(AppContext);

    return (
        <div>
            <ActionHeader title={Messages.COMPRAS.TITULO} action={() => abrirModalCadastro()} icon='options' />

            <IonContent id="content-container" fullscreen text-center>
                <Lista data={compras} component={CompraItem} />
                <ComprasCadastroModal show={showCadastro} dados={compra} hide={() => fecharModalCadastro()} onSave={e => onSave()} />
            </IonContent>

            <LabelFooter label={Messages.COMUM.TOTAL + 0} />

            <New action={() => cadastrar()} />
        </div>
    );
}

export default Compras;