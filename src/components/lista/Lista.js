
import { IonIcon, IonList } from '@ionic/react';
import React, { useState } from 'react';

/** @param {any[]} dados  */
const montarLinhas = (dados, limite, Component) => {
    const size = dados.length < limite ? dados.length : limite;
    if (dados.length) {
        return dados.slice(0, size).map(item => (<Component key={item.id} dados={item} />))
    }

    return ('Nenhum resultado')
}

export const Lista = props => {
    const [limite, setLimite] = useState(10);
    return (
        <div>
            <IonList >
                {montarLinhas(props.data, limite, props.component)}
            </IonList>
            {
                limite < props.data.length ? <IonIcon size="large" color="primary" name="arrow-dropdown-circle" onClick={() => setLimite(limite + 10)} /> : ""
            }
        </div>
    )
}