
import { IonCard, IonCardContent, IonCheckbox, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { Formats, Messages } from '../../../constants';
import { adicionarCompras, editarCompras } from '../../../services/ComprasService';
import { adicionarDespesa } from '../../../services/DespesasService';
import { updateForm } from '../../../services/FormService';
import { toast } from '../../../services/MensagemService';
import { toEUADate } from '../../../utils/DateUtils';
import { CadastroDespesaModal } from '../../Depesas/CadastroDespesaModal';
import { Datepicker } from '../../Forms/Inputs/DatePicker';
import { TextArea } from '../../Forms/Inputs/TextArea';
import { Modal } from '../../Modal/Modal';

const itens = [];
export const ComprasCadastroModal = props => {
    const [formData, setFormData] = useState({});
    const [showCadastroItem, setCadastrarItem] = useState(false);

    const setForm = e => updateForm({ event: e, formData: formData, updateState: setFormData, defaultData: props.dados });
    const adicionarItem = () => {
        setItem({ data: formData.data })
        setCadastrarItem(true);
    };
    const fecharModalCadastroItem = () => setCadastrarItem(false);
    const [item, setItem] = useState(null);

    function carregarDados(dados) {
        if (dados) {
            const copy = Object.assign({}, dados);
            copy.data = toEUADate(copy.data)
            setFormData(copy);
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
                item.comprasId = id;
                adicionarDespesa(item);
            });

            props.hide();
            props.onSave(formData);
            setFormData({})
        } catch (error) {
            toast(error.message);
        }
    }

    return (
        <Modal
            show={props.show}
            hide={() => props.hide()}
            onInit={() => carregarDados(props.dados)}
            title={Messages.COMPRAS.CADASTRO.NOVA}
            onCancel={() => { props.hide() }}
            onConfirm={() => salvarCompras()}
            cancelLabel={Messages.COMUM.CANCELAR}
            confirmLabel={Messages.COMUM.SALVAR}>

            <IonCard class="">
                <IonCardContent>
                    <Datepicker label={Messages.COMUM.DATA} format={Formats.diaMesAno}
                        value={formData.data} name="data" onChange={e => setForm(e)} />

                    <TextArea label={Messages.COMUM.DESCRICAO} value={formData.descricao} name="descricao" onChange={e => setForm(e)} />

                    <IonToolbar>
                        <IonTitle>{Messages.COMUM.ITENS}</IonTitle>
                        <IonIcon slot='end' name="add-circle" size='large' color='success' onClick={() => adicionarItem()}></IonIcon>
                    </IonToolbar>

                    <IonList>
                        {itens.map(itemCompra => (
                            <IonItem key={itemCompra.descricao}>
                                <IonCheckbox slot='start' color="success" value={itemCompra.comprado} />
                                <IonLabel>{itemCompra.descricao} - {itemCompra.comprado}</IonLabel>
                            </IonItem>))}
                    </IonList>

                </IonCardContent>
                <CadastroDespesaModal show={showCadastroItem} dados={item} hide={() => fecharModalCadastroItem()} onSave={e => salvarItem(e)} />
            </IonCard>
        </Modal>
    );
}