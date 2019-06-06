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
import { calcularTotal, filtrarDespesas, listarDespesas, editarDespesa, adicionarDespesa } from '../../services/DespesasService';
import { monitorarMensagens, toast } from '../../services/MensagemService';
import { copyWithId } from '../../services/FormService';

let onExcluir;
let onEditar;
monitorarMensagens(Events.DESPESAS.EXCLUSAO, e => onExcluir());
monitorarMensagens(Events.DESPESAS.EDICAO, e => onEditar(e));

const Despesas = () => {
    const [despesas, setDespesas] = useState(listarDespesas());
    const [showFiltros, setFiltrar] = useState(false);
    const [showCadastro, setCadastrar] = useState(false);
    const [despesa, setDespesa] = useState(null);

    onExcluir = e => setDespesas(listarDespesas());
    onEditar = e => editar(e);

    const abrirModalCadastro = () => setCadastrar(true);
    const fecharModalCadastro = () => { setCadastrar(false); setDespesa(null); }
    const abrirModalFiltros = () => setFiltrar(true);
    const fecharModalFiltros = () => setFiltrar(false);
    const listar = filtros => setDespesas(filtros ? filtrarDespesas(filtros) : listarDespesas());
    const cadastrar = () => { setDespesa(null); abrirModalCadastro(); }
    const editar = dados => { setDespesa(dados); abrirModalCadastro(); }

    const onSave = dados => despesa && despesa.id ? salvarEdicao(dados) : savarNova(dados);
    
    const salvarEdicao = dados => {
            editarDespesa(copyWithId(dados, despesa.id));
            toast(Messages.DESPESAS.EDICAO.SUCESSO);
    }
    
    const savarNova = dados =>{
        adicionarDespesa(dados);
        toast(Messages.DESPESAS.CADASTRO.SUCESSO);
    }

    return (
        <div>
            <ActionHeader title={Messages.DESPESAS.TITULO} action={() => abrirModalFiltros()} icon='options' />

            <IonContent id="content-container" fullscreen text-center>
                <Lista data={despesas} component={DespesaItem} />
                <FiltroDespesasModal show={showFiltros} hide={() => fecharModalFiltros()} filtrar={e => listar(e)} />
                <CadastroDespesaModal show={showCadastro} dados={despesa} hide={() => fecharModalCadastro()} onSave={e => onSave(e)} />
            </IonContent>

            <LabelFooter label={Messages.COMUM.TOTAL + calcularTotal(despesas)} />

            <New action={() => cadastrar()} />
        </div>
    );
}

export default Despesas;