
import { IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar, IonFooter, IonButton, IonGrid, IonRow, IonCol, IonDatetime } from '@ionic/react';
import React, { useState } from 'react';
import { mapearColunas } from '../../services/DespesasService';
import { Autocomplete } from '../autocomplete/Autocomplete';

export const CadastroDespesaModal = props => {

    const [formData, setFormData] = useState({});
    const colunas = useState(mapearColunas())[0];
    const [complete, setComplete] = useState("");

    function setForm(e) {
        let form = {};
        Object.keys(formData).forEach(key => form[key] = formData[key])
        form[e.target.name] = e.target.value;
        setFormData(form)
    }

    return (
        <IonModal isOpen={props.show} onDidDismiss={() => props.hide()} >
            <IonHeader class="header header-md hydrated">
                <IonToolbar class="hydrated">
                    <IonButtons slot="start">
                        <IonIcon name='arrow-round-back' size='large' onClick={() => props.hide()} />
                    </IonButtons>
                    <IonTitle class="title-md hydrated"> Nova Despesa</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonCard>
                    <IonCardContent>

                        <IonItem>
                            <IonLabel position="floating">Descrição</IonLabel>
                            <IonInput type="text" value={formData.descricao} name="descricao" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("descricao")} />
                        </IonItem>
                        <Autocomplete name="descricao" show={complete} options={colunas.descricoes} search={formData.descricao} onSelect={e => { setForm(e); setComplete("") }} />

                        <IonItem>
                            <IonLabel position="floating">Tipo</IonLabel>
                            <IonInput type="text" value={formData.tipo} name="tipo" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("tipo")} />
                        </IonItem>
                        <Autocomplete name="tipo" show={complete} options={colunas.tipos} search={formData.tipo} onSelect={e => { setForm(e); setComplete("") }} />

                        <IonItem>
                            <IonLabel position="floating">Origem</IonLabel>
                            <IonInput type="text" value={formData.origem} name="origem" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("origem")} />
                        </IonItem>
                        <Autocomplete name="origem" show={complete} options={colunas.origens} search={formData.origem} onSelect={e => { setForm(e); setComplete("") }} />

                        <IonItem>
                            <IonLabel position="floating">Vendedor</IonLabel>
                            <IonInput type="text" value={formData.vendedor} name="vendedor" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("vendedor")} />
                        </IonItem>
                        <Autocomplete name="vendedor" show={complete} options={colunas.vendedores} search={formData.vendedor} onSelect={e => { setForm(e); setComplete("") }} />

                        <IonItem>
                            <IonLabel position="floating">Quantidade</IonLabel>
                            <IonInput type="number" value={formData.quantidade} name="quantidade" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("quantidade")} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Preco</IonLabel>
                            <IonInput type="number" value={formData.preco} name="preco" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("preco")} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Data </IonLabel>
                            <IonDatetime displayFormat="DD/MM/YYYY" pickerFormat="DD/MM/YYYY" value={formData.data} name="data" onIonChange={e => setForm(e)} />
                        </IonItem>

                    </IonCardContent>
                </IonCard>
            </IonContent>
            <IonFooter translucent="true">
                <IonToolbar>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6">
                                <IonButton expand="block" fill="outline" color="dark" onClick={() => setFormData({})} >Limpar</IonButton>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton expand="block" fill="outline" color="success" onClick={() => props.salvar(formData)} >Salvar</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonFooter>
        </IonModal>
    )
}