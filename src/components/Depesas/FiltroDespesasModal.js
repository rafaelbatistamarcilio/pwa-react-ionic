
import { IonCard, IonCardContent, IonContent } from '@ionic/react';
import React, { useState } from 'react';
import { Formats } from '../../constants';
import Messages from '../../constants/Messages';
import { mapearColunas } from '../../services/DespesasService';
import { AutocompleteInput } from '../Forms/Inputs/AutoCompleteInput';
import { Datepicker } from '../Forms/Inputs/DatePicker';
import { Modal } from '../Modal/Modal';
import { copy } from '../../utils/ObjectUtils';

export const FiltroDespesasModal = props => {

    const [filtros, setFiltros] = useState({});
    const colunas = useState(mapearColunas())[0];

    function setForm(e) {
        let form = {};
        copy(filtros, form)
        form[e.target.name] = e.target.value;
        setFiltros(form)
    }

    return (
        <Modal
            show={props.show} hide={() => props.hide()}
            title={Messages.DESPESAS.FILTRO}
            onCancel={() => setFiltros({})}
            onConfirm={() => props.filtrar(filtros)}
            cancelLabel={Messages.COMUM.LIMPAR}
            confirmLabel={Messages.COMUM.FILTRAR}>

            <IonContent>
                <IonCard>
                    <IonCardContent>
                        <AutocompleteInput label={Messages.COMUM.DESCRICAO} value={filtros.descricao} name="descricao"
                            onChange={e => setForm(e)} options={colunas.descricoes} />

                        <AutocompleteInput label={Messages.COMUM.TIPO} value={filtros.tipo} name="tipo"
                            onChange={e => setForm(e)} options={colunas.tipos} />

                        <AutocompleteInput label={Messages.COMUM.ORIGEM} value={filtros.origem} name="origem"
                            onChange={e => setForm(e)} options={colunas.origens} />

                        <Datepicker label={Messages.COMUM.DATA_INICIAL} format={Formats.diaMesAno}
                            value={filtros.dataInicio} name="dataInicio" onChange={e => setForm(e)} />

                        <Datepicker label={Messages.COMUM.DATA_FINAL} format={Formats.diaMesAno}
                            value={filtros.dataFim} name="dataFim" onChange={e => setForm(e)} />
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </Modal >
    )
}