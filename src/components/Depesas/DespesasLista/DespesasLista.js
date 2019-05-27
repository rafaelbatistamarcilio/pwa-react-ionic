
import { IonList } from '@ionic/react';
import React from 'react';
import { DespesaItem } from '../DespesaItem/DespesaItem';

/** @param {any[]} dados  */
const montarLinhas = dados => {
    if (dados.length) {
        return dados.map(despesa => (<DespesaItem key={despesa.id} dados={despesa} />))
    }

    return ('Nenhum resultado')
}

export const DespesasLista = props => <IonList> {montarLinhas(props.data)} </IonList>