
import { IonCard, IonCardContent, IonIcon, IonText, IonTitle, IonToolbar, IonInput } from '@ionic/react';
import React, { useState, useReducer } from 'react';
import { Formats, Messages } from '../../../constants';
import { adicionarCompras, editarCompras } from '../../../services/ComprasService';
import { adicionarDespesa, calcularTotal, obterDespesaPorCompra, editarDespesa } from '../../../services/DespesasService';
import { updateForm } from '../../../services/FormService';
import { toast } from '../../../services/MensagemService';
import { toEUADate } from '../../../utils/DateUtils';
import { CadastroDespesaModal } from '../../Depesas/CadastroDespesaModal';
import { Datepicker } from '../../Forms/Inputs/DatePicker';
import { TextArea } from '../../Forms/Inputs/TextArea';
import { Lista } from '../../lista/Lista';
import { Modal } from '../../Modal/Modal';
import { CompraCadastroItem } from './CompraCadastroItem';
import { ItensCompraReducer } from '../../../reducers/ItensCompraReducer';

export const ComprasCadastroModal = props => {
    const [formData, setFormData] = useState({});
    const [showCadastroItem, setCadastrarItem] = useState(false);
    const [item, setItem] = useState(null);
    const [itens, setItens] = useReducer(ItensCompraReducer, []);

    const setForm = e => updateForm({ event: e, formData: formData, updateState: setFormData, defaultData: props.dados });

    const adicionarItem = () => {
        setItem({ data: formData.data })
        setCadastrarItem(true);
    };

    const fecharModalCadastroItem = () => setCadastrarItem(false);

    function carregarDados(dados) {
        if (dados) {
            const copy = Object.assign({}, dados);
            copy.data = toEUADate(copy.data)
            setFormData(copy);
            let itensCompras = obterDespesaPorCompra(dados.id);
            setItens({ type: 'set', value: itensCompras });
        }
    }

    const salvarItem = novoItem => { itens.push(novoItem); }

    const salvarCompras = () => {
        try {
            let id = formData.id;
            if (formData.id) {
                editarCompras(formData);
            } else {
                id = adicionarCompras(formData).id;
            }

            itens.forEach(item => {
                if (!item.comprasId) {
                    item.comprasId = id;
                    adicionarDespesa(item);
                } else {
                    editarDespesa(item);
                }
            });

            props.hide();
            props.onSave();
            setFormData({})
        } catch (error) {
            toast(error.message);
        }
    }

    const onCheck = e => {
        const itemEdicao = itens.filter(item => item.id === e.id)[0];
        itemEdicao.comprado = e.checked;
        setItens({ type: 'update', value: itemEdicao });
    };


    return (
        <Modal
            show={props.show}
            hide={() => props.hide()}
            onInit={() => carregarDados(props.dados)}
            title={Messages.COMPRAS.CADASTRO.NOVA}
            onCancel={() => props.hide()}
            onConfirm={() => salvarCompras()}
            cancelLabel={Messages.COMUM.CANCELAR}
            confirmLabel={Messages.COMUM.SALVAR}>

            <IonCard class="">
                <IonCardContent>
                    <IonInput type="hidden" value={formData.id} name="id" onChange={e => setForm(e)} />
                    <Datepicker label={Messages.COMUM.DATA} format={Formats.diaMesAno}
                        value={formData.data} name="data" onChange={e => setForm(e)} />

                    <TextArea label={Messages.COMUM.DESCRICAO} value={formData.descricao} name="descricao" onChange={e => setForm(e)} />

                    <IonToolbar>
                        <IonTitle slot='start'>{Messages.COMUM.ITENS}</IonTitle>
                        <IonText color="secondary" slot='secondary'>
                            {calcularTotal(itens)}
                        </IonText>
                        <IonIcon slot='end' name="add-circle" size='large' color='success' onClick={() => adicionarItem()}></IonIcon>
                    </IonToolbar>

                    <Lista data={itens} component={CompraCadastroItem} events={{ onCheck: e => onCheck(e) }} />

                </IonCardContent>
                <CadastroDespesaModal show={showCadastroItem} dados={item} hide={() => fecharModalCadastroItem()} onSave={e => salvarItem(e)} />
            </IonCard>
        </Modal>
    );
}