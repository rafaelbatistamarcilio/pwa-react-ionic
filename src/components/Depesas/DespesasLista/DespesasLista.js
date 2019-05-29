
import { IonIcon, IonList } from '@ionic/react';
import React, { useState } from 'react';
import { DespesaItem } from '../DespesaItem/DespesaItem';

/** @param {any[]} dados  */
const montarLinhas = (dados, limite) => {
    const size = dados.length < limite ? dados.length : limite;
    if (dados.length) {
        return dados.slice(0, size).map(despesa => (<DespesaItem key={despesa.id} dados={despesa} />))
    }

    return ('Nenhum resultado')
}

export const DespesasLista = props => {
    const [limite, setLimite] = useState(10);
    return (
        <div>
            <IonList >
                {montarLinhas(props.data, limite)}
            </IonList>
            {
                limite < props.data.length ? <IonIcon size="large" color="primary" name="arrow-dropdown-circle" onClick={() => setLimite(limite + 10)} /> : ""
            }
        </div>
    )
}