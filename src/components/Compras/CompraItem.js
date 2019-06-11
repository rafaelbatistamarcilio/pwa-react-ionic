import React from 'react';
import { IonItemSliding, IonItem, IonLabel, IonText, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';
import { Messages, Events } from '../../constants';
import { emitirMensagem, toast } from '../../services/MensagemService';
import { excluirCompras } from '../../services/ComprasService';


function excluir(id) {
    if (excluirCompras(id)) {
        emitirMensagem(Events.COMPRAS.EXCLUSAO, id);
        toast(Messages.COMPRAS.EXCLUSAO.SUCESSO(id));
    }
}

const editar = despesa => emitirMensagem(Events.COMPRAS.EDICAO, despesa);

export const CompraItem = ({ dados }) => (
    <IonItemSliding >
        <IonItem detail onClick={() => editar(dados)}>
            <IonLabel text-wrap >
                <IonText color="primary">
                    <h3> {dados.data}</h3>
                </IonText>
                <p>{dados.descricao}</p>
                <IonText color="secondary">
                    <p>{dados.total}</p>
                </IonText>
            </IonLabel>
        </IonItem>
        <IonItemOptions side="end">
            <IonItemOption color="danger" expandable onClick={() => excluir(dados.id)}>
                {Messages.COMUM.EXCLUIR}
                <IonIcon size="large" name="trash"></IonIcon>
            </IonItemOption>
        </IonItemOptions>
    </IonItemSliding>
)