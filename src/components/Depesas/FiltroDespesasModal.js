
import { IonCard, IonCardContent, IonContent, IonDatetime, IonInput, IonItem, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import Messages from '../../constants/Messages';
import { mapearColunas } from '../../services/DespesasService';
import { Autocomplete } from '../autocomplete/Autocomplete';
import { AutocompleteInput } from '../Forms/Inputs/AutoCompleteInput';
import { Modal } from '../Modal/Modal';

export const FiltroDespesasModal = props => {

    const [filtros, setFiltros] = useState({});
    const colunas = useState(mapearColunas())[0];
    const [complete, setComplete] = useState("");

    function setForm(e) {
        let form = {};
        Object.keys(filtros).forEach(key => form[key] = filtros[key])
        form[e.target.name] = e.target.value;
        setFiltros(form)
    }

    return (
        <Modal
            show={props.show}
            hide={() => props.hide()}
            title={Messages.DESPESAS.FILTRO}
            onCancel={() => setFiltros({})}
            onConfirm={() => props.filtrar(filtros)}
            cancelLabel={Messages.COMUM.LIMPAR}
            confirmLabel={Messages.COMUM.FILTRAR}>

            <IonContent>
                <IonCard>
                    <IonCardContent>

                        <AutocompleteInput
                            label={Messages.COMUM.DESCRICAO}
                            value={filtros.descricao}
                            name="descricao"
                            onChange={e => setForm(e)}
                            options={colunas.descricoes}
                            onSelect={e => setForm(e)} />

                        <IonItem>
                            <IonLabel position="floating">Tipo</IonLabel>
                            <IonInput type="text" value={filtros.tipo} name="tipo" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("tipo")} />
                        </IonItem>
                        <Autocomplete name="tipo" show={complete} options={colunas.tipos} search={filtros.tipo} onSelect={e => { setForm(e); setComplete("") }} />

                        <IonItem>
                            <IonLabel position="floating">Origem</IonLabel>
                            <IonInput type="text" value={filtros.origem} name="origem" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("origem")} />
                        </IonItem>
                        <Autocomplete name="origem" show={complete} options={colunas.origens} search={filtros.origem} onSelect={e => { setForm(e); setComplete("") }} />

                        <IonItem>
                            <IonLabel position="floating">Data Inicial</IonLabel>
                            <IonDatetime displayFormat="DD/MM/YYYY" pickerFormat="DD/MM/YYYY" value={filtros.dataInicio} name="dataInicio" onIonChange={e => setForm(e)} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Data Final</IonLabel>
                            <IonDatetime displayFormat="DD/MM/YYYY" pickerFormat="DD/MM/YYYY" value={filtros.dataFim} name="dataFim" onIonChange={e => setForm(e)} />
                        </IonItem>

                    </IonCardContent>
                </IonCard>
            </IonContent>
        </Modal >
    )
}