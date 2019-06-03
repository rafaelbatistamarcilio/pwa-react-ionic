import { IonContent } from '@ionic/react';
import React, { useState } from 'react';
import { New } from '../../components/Buttons/New';
import { CadastroDespesaModal } from '../../components/Depesas/CadastroDespesaModal';
import { DespesaItem } from '../../components/Depesas/DespesaItem/DespesaItem';
import { FiltroDespesasModal } from '../../components/Depesas/FiltroDespesasModal';
import { LabelFooter } from '../../components/Footer/LabelFooter';
import { ActionHeader } from '../../components/header/ActionHeader';
import { Lista } from '../../components/lista/Lista';
import { Events, Messages } from '../../constants';
import { calcularTotal, filtrarDespesas, listarDespesas } from '../../services/DespesasService';
import { monitorarMensagens } from '../../services/MensagemService';

let onExcluir;
let onEditar;
monitorarMensagens(Events.DESPESAS.EXCLUSAO, e => onExcluir());
monitorarMensagens(Events.DESPESAS.EDICAO, e => onEditar(e));

const Despesas = () => {
    const [despesas, setDespesas] = useState(listarDespesas());
    const [filtrar, setFiltrar] = useState(false);
    const [novo, setNovo] = useState(false);
    const [despesaEdicao, setDespesaEdicao] = useState(null);

    onExcluir = e => setDespesas(listarDespesas());
    onEditar = e => editar(e);

    function cadastrar() {
        setDespesaEdicao(null);
        setNovo(true);
    }
    function editar(dados) {
        setDespesaEdicao(dados);
        setNovo(true);
    }

    function filtrarDados(filtro) {
        setFiltrar(false);
        setDespesas(filtrarDespesas(filtro));
    }

    return (
        <div>
            <ActionHeader title={Messages.DESPESAS.TITULO} action={() => setFiltrar(true)} icon='options' />
            
            <IonContent id="content-container" fullscreen text-center>
                <Lista data={despesas} component={DespesaItem} />
                <FiltroDespesasModal show={filtrar} hide={() => setFiltrar(false)} filtrar={(e) => filtrarDados(e)} />
                <CadastroDespesaModal show={novo} dados={despesaEdicao} hide={() => { setNovo(false); setDespesaEdicao(null) }} onSave={() => setDespesas(listarDespesas())} />
            </IonContent>

            <LabelFooter label={Messages.COMUM.TOTAL + calcularTotal(despesas)} />

            <New action={() => cadastrar()} />
        </div>
    );
}

export default Despesas;