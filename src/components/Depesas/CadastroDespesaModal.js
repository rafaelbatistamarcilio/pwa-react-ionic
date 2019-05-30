
import { IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar, IonFooter, IonButton, IonGrid, IonRow, IonCol, IonDatetime, IonTextarea } from '@ionic/react';
import React, { useState } from 'react';
import { mapearColunas, isDespesaValida, adicionarDespesa } from '../../services/DespesasService';
import { Autocomplete } from '../autocomplete/Autocomplete';
import { toast } from '../../services/MensagemService';

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

    function salvar() {
        if (!isDespesaValida(formData)) {
            toast('Preencha o formulario corretamente!');
        } else {
            adicionarDespesa(formData); 
            toast('Despesa Adicionada');
            props.hide();
            props.onSave();
        }
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

            <IonContent >
                <IonCard class="paddingBottom50">
                    <IonCardContent>

                        <IonItem>
                            <IonLabel position="floating">Data </IonLabel>
                            <IonDatetime displayFormat="DD/MM/YYYY" pickerFormat="DD/MM/YYYY" value={formData.data} name="data" onIonChange={e => setForm(e)} />
                        </IonItem>

                        <IonItem >
                            <IonLabel position="floating">Descrição:</IonLabel>
                            <IonInput required="true" type="text" value={formData.descricao} name="descricao" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("descricao")} />
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
                            <IonLabel position="floating">Marca</IonLabel>
                            <IonInput type="tex" value={formData.marca} name="marca" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("marca")} />
                        </IonItem>
                        <Autocomplete name="marca" show={complete} options={colunas.marcas} search={formData.marca} onSelect={e => { setForm(e); setComplete("") }} />

                        <IonItem>
                            <IonLabel position="floating">Medida</IonLabel>
                            <IonInput type="tex" value={formData.medida} name="medida" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("medida")} />
                        </IonItem>
                        <Autocomplete name="medida" show={complete} options={colunas.medidas} search={formData.medida} onSelect={e => { setForm(e); setComplete("") }} />

                        <IonItem>
                            <IonLabel position="floating">Quantidade</IonLabel>
                            <IonInput type="number" value={formData.quantidade} name="quantidade" onIonChange={e => setForm(e)} onIonFocus={() => setComplete("quantidade")} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Valor</IonLabel>
                            <IonInput type="number" value={formData.valor} name="valor" onIonChange={e => setForm(e)} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Total</IonLabel>
                            <IonInput type="number" disabled="true" value={(formData.valor * formData.quantidade).toFixed(2)} name="total" onIonChange={e => setForm(e)} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="floating">Observação</IonLabel>
                            <IonTextarea value={formData.obs} name="obs" onIonChange={e => setForm(e)}></IonTextarea>
                        </IonItem>

                    </IonCardContent>
                </IonCard>
            </IonContent>
            <IonFooter translucent="true">
                <IonToolbar>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6">
                                <IonButton expand="block" fill="outline" color="dark" onClick={() => { setFormData({}); props.hide() }} >Cancelar</IonButton>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton expand="block" fill="outline" color="success" onClick={() => salvar()} >Salvar</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonFooter>
        </IonModal>
    )
}