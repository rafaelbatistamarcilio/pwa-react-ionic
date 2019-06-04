
import { IonCard, IonCardContent, IonInput } from '@ionic/react';
import React, { useState } from 'react';
import { Formats, Messages } from '../../constants';
import { adicionarDespesa, editarDespesa, isDespesaValida, mapearColunas } from '../../services/DespesasService';
import { toast } from '../../services/MensagemService';
import { copy } from '../../utils/ObjectUtils';
import { AutocompleteInput } from '../Forms/Inputs/AutoCompleteInput';
import { Datepicker } from '../Forms/Inputs/DatePicker';
import { NumberInput } from '../Forms/Inputs/NumberInput';
import { TextArea } from '../Forms/Inputs/TextArea';
import { Modal } from '../Modal/Modal';

export const CadastroDespesaModal = props => {
    const [formData, setFormData] = useState({});
    const colunas = useState(mapearColunas())[0];

    function setForm(e) {
        let form = {};
        copy(formData, form, props.dados);
        form[e.target.name] = e.target.value;
        setFormData(form)
    }

    function salvar() {
        if (!isDespesaValida(formData)) {
            toast('Preencha o formulario corretamente!');
        } else {
            if (props.dados && props.dados.id) {
                const edit = {};
                Object.keys(formData).forEach(key => edit[key] = formData[key]);
                edit.id = props.dados.id;
                editarDespesa(edit);
            } else {
                adicionarDespesa(formData);
            }
            setFormData({})
            toast('Despesa Adicionada');
            props.hide();
            props.onSave();
        }
    }

    function carregarDados(dados) {
        if (dados) {
            const copy = Object.assign({}, dados);
            copy.data = copy.data.split('/').reverse().join('-')
            setFormData(copy);
        }
    }

    return (
        <Modal
            show={props.show}
            hide={() => props.hide()}
            onInit={() => carregarDados(props.dados)}
            title={Messages.DESPESAS.CADASTRO.NOVA}
            onCancel={() => { setFormData({}); props.hide() }}
            onConfirm={() => salvar()}
            cancelLabel={Messages.COMUM.CANCELAR}
            confirmLabel={Messages.COMUM.SALVAR}>

            <IonCard class="paddingBottom50">
                <IonCardContent>
                    <IonInput type="hidden" value={formData.id} name="id" onChange={e => setForm(e)} />

                    <Datepicker label={Messages.COMUM.DATA} format={Formats.diaMesAno}
                        value={formData.data} name="data" onChange={e => setForm(e)} />

                    <AutocompleteInput label={Messages.COMUM.DESCRICAO} value={formData.descricao} name="descricao"
                        onChange={e => setForm(e)} options={colunas.descricoes} />

                    <AutocompleteInput label={Messages.COMUM.TIPO} value={formData.tipo} name="tipo"
                        onChange={e => setForm(e)} options={colunas.tipos} />

                    <AutocompleteInput label={Messages.COMUM.ORIGEM} value={formData.origem} name="origem"
                        onChange={e => setForm(e)} options={colunas.origens} />

                    <AutocompleteInput label={Messages.COMUM.VENDEDOR} value={formData.vendedor} name="vendedor"
                        onChange={e => setForm(e)} options={colunas.vendedores} />

                    <AutocompleteInput label={Messages.COMUM.MARCA} value={formData.marca} name="marca"
                        onChange={e => setForm(e)} options={colunas.marcas} />

                    <AutocompleteInput label={Messages.COMUM.MEDIDA} value={formData.medida} name="medida"
                        onChange={e => setForm(e)} options={colunas.medidas} />

                    <NumberInput label={Messages.COMUM.QUANTIDADE} name="quantidade" value={formData.quantidade} onChange={e => setForm(e)} />

                    <NumberInput label={Messages.COMUM.VALOR} name="valor" value={formData.valor} onChange={e => setForm(e)} />

                    <NumberInput disabled="true" label={Messages.COMUM.TOTAL} name="total" value={(formData.valor * formData.quantidade).toFixed(2)} onChange={e => setForm(e)} />

                    <TextArea label={Messages.COMUM.OBSERVACAO} value={formData.obs} name="obs" onChange={e => setForm(e)} />
                </IonCardContent>
            </IonCard>
        </Modal>
    )
}