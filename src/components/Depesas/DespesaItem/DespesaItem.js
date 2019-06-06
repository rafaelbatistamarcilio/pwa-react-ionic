import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonText } from '@ionic/react';
import React from 'react';
import { excluirDespesa } from '../../../services/DespesasService';
import { emitirMensagem, toast } from '../../../services/MensagemService';
import { Events, Messages } from '../../../constants';

function excluir(id) {
    if (excluirDespesa(id)) {
        emitirMensagem(Events.DESPESAS.EXCLUSAO, id);
        toast(`Despesa id ${id} excluída`);
    }
}

const editar = despesa => emitirMensagem(Events.DESPESAS.EDICAO, despesa)

export const DespesaItem = props => (
    <IonItemSliding >
        <IonItem detail onClick={() => editar(props.dados)}>
            <IonLabel text-wrap >
                <IonText color="primary">
                    <h3> {props.dados.tipo}</h3>
                </IonText>
                <p>{props.dados.descricao + ' - ' + props.dados.data}</p>
                <IonText color="secondary">
                    <p>{props.dados.total}</p>
                </IonText>
            </IonLabel>
        </IonItem>
        <IonItemOptions side="end">
            <IonItemOption color="danger" expandable onClick={() => excluir(props.dados.id)}>
                {Messages.COMUM.EXCLUIR}
                <IonIcon size="large" name="trash"></IonIcon>
            </IonItemOption>
        </IonItemOptions>
    </IonItemSliding>
)