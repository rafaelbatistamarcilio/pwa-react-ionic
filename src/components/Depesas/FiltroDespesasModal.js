
import { IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar, IonFooter, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { mapearColunas } from '../../services/DespesasService';
import { Autocomplete } from '../autocomplete/Autocomplete';

export const FiltroDespesasModal = props => {

    const [filtros, setFiltros] = useState({});
    const [colunas, setColunas] = useState(mapearColunas());
    const [complete, setComplete] = useState("");

    function setForm(e) {
        let form = {};
        Object.keys(filtros).forEach(key => form[key] = filtros[key])
        form[e.target.name] = e.target.value;
        setFiltros(form)
    }

    return (
        <IonModal isOpen={props.show} onDidDismiss={() => props.hide()} >
            <IonHeader class="header header-md hydrated">
                <IonToolbar class="hydrated">
                    <IonButtons slot="end">
                        <IonIcon name='search' size='large' onClick={() => props.filtrar(filtros)} />
                    </IonButtons>
                    <IonTitle class="title-md hydrated"> Filtro de Despesas</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonCard>
                    <IonCardContent>

                        <IonItem>
                            <IonLabel position="floating">Descrição</IonLabel>
                            <IonInput type="text" value={filtros.descricao} name="descricao" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("descricao")} />
                        </IonItem>
                        <Autocomplete name="descricao" show={complete} options={colunas.descricoes} search={filtros.descricao} onSelect={e => { setForm(e); setComplete("") }} />

                        <IonItem>
                            <IonLabel position="floating">Tipo</IonLabel>
                            <IonInput type="text" value={filtros.tipo} name="tipo" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("tipo")} />
                        </IonItem>
                        <Autocomplete name="tipo" show={complete} options={colunas.tipos} search={filtros.tipo} onSelect={e => { setForm(e); setComplete("") }} />

                        <IonItem>
                            <IonLabel position="floating">Origem</IonLabel>
                            <IonInput type="text" value={filtros.origem} name="origem" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("origem")}/>
                        </IonItem>
                        <Autocomplete name="origem" show={complete} options={colunas.origens} search={filtros.origem} onSelect={e => { setForm(e); setComplete("") }} />

                    </IonCardContent>
                </IonCard>
            </IonContent>
            <IonFooter translucent="true">
                <IonToolbar>
                    <IonButton expand="block" fill="outline" color="dark" onClick={() => setFiltros({})} >Limpar Filtros</IonButton>
                </IonToolbar>
            </IonFooter>
        </IonModal>
    )
}