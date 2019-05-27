
import { IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar, IonFooter, IonButton, IonGrid, IonRow, IonCol, IonDatetime } from '@ionic/react';
import React, { useState } from 'react';
import { mapearColunas } from '../../services/DespesasService';
import { Autocomplete } from '../autocomplete/Autocomplete';

export const FiltroDespesasModal = props => {

    const [filtros, setFiltros] = useState({});
    const colunas = useState(mapearColunas())[0];
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
                    <IonButtons slot="start">
                        <IonIcon name='arrow-round-back' size='large' onClick={() => props.hide()} />
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
                            <IonInput type="text" value={filtros.origem} name="origem" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("origem")} />
                        </IonItem>
                        <Autocomplete name="origem" show={complete} options={colunas.origens} search={filtros.origem} onSelect={e => { setForm(e); setComplete("") }} />
                        
                        <IonItem>
                            <IonLabel position="floating">Data Inicial</IonLabel>
                            <IonDatetime displayFormat="DD/MM/YYYY" pickerFormat="DD/MM/YYYY"  value={filtros.dataInicio} name="dataInicio" onIonChange={e => setForm(e)} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Data Final</IonLabel>
                            <IonDatetime displayFormat="DD/MM/YYYY" pickerFormat="DD/MM/YYYY" value={filtros.dataFim} name="dataFim" onIonChange={e => setForm(e)} />
                        </IonItem>

                    </IonCardContent>
                </IonCard>
            </IonContent>
            <IonFooter translucent="true">
                <IonToolbar>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6">
                                <IonButton expand="block" fill="outline" color="dark" onClick={() => setFiltros({})} >Limpar</IonButton>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton expand="block" fill="outline" color="success" onClick={() => props.filtrar(filtros)} >Filtrar</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonFooter>
        </IonModal>
    )
}