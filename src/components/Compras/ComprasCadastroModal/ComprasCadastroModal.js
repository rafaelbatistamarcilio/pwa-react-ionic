
import { IonCard, IonCardContent, IonIcon, IonTitle, IonList, IonItem } from '@ionic/react';
import React, { useState } from 'react';
import { Formats, Messages } from '../../../constants';
import { updateForm } from '../../../services/FormService';
import { CadastroDespesaModal } from '../../Depesas/CadastroDespesaModal';
import { Datepicker } from '../../Forms/Inputs/DatePicker';
import { TextArea } from '../../Forms/Inputs/TextArea';
import { Modal } from '../../Modal/Modal';
const itens = [];
export const ComprasCadastroModal = props => {
    const [formData, setFormData] = useState({});
    const [showCadastroItem, setCadastrarItem] = useState(false);

    const setForm = e => updateForm({ event: e, formData: formData, updateState: setFormData, defaultData: props.dados });
    const adicionarItem = () => setCadastrarItem(true);
    const fecharModalCadastroItem = () => setCadastrarItem(false);
    const [item, setItem] = useState(null);

    function carregarDados(dados) {
        if (dados) {
            const copy = Object.assign({}, dados);
            copy.data = copy.data.split('/').reverse().join('-')
            setFormData(copy);
        }
    }

    const onSave = novoItem => { itens.push(novoItem); }

    return (
        <Modal
            show={props.show}
            hide={() => props.hide()}
            onInit={() => carregarDados(props.dados)}
            title={Messages.COMPRAS.CADASTRO.NOVA}
            onCancel={() => { props.hide() }}
            onConfirm={() => console.log('SALVAR')}
            cancelLabel={Messages.COMUM.CANCELAR}
            confirmLabel={Messages.COMUM.SALVAR}>

            <IonCard class="">
                <IonCardContent>
                    <Datepicker label={Messages.COMUM.DATA} format={Formats.diaMesAno}
                        value={formData.data} name="data" onChange={e => setForm(e)} />

                    <TextArea label={Messages.COMUM.DESCRICAO} value={formData.descricao} name="descricao" onChange={e => setForm(e)} />

                    <IonTitle>Itens <IonIcon name="add" onClick={() => adicionarItem()}></IonIcon></IonTitle>

                    <IonList>
                        {itens.map(itemCompra => (<IonItem key={itemCompra.descricao}>{itemCompra.descricao} </IonItem>))}
                    </IonList>

                </IonCardContent>
                <CadastroDespesaModal show={showCadastroItem} dados={item} hide={() => fecharModalCadastroItem()} onSave={e => onSave(e)} />
            </IonCard>
        </Modal>
    );
}