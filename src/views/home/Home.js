import { IonCol, IonContent, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import { DashboarCard } from "../../components/Dashboard/DashboardCard/DashboardCard";
import { Header } from "../../components/header/Header";
import { calcularTotal, listarDespesas } from "../../services/DespesasService";
import { Messages } from "../../constants";
import { Routes } from "../../components/Router/Routes";

const total = calcularTotal(listarDespesas());

export const Home = () => (
    <div>
        <Header titulo={Messages.HOME.TITULO} />
        <IonContent id="content-container" fullscreen text-center>
            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <DashboarCard title={Messages.DESPESAS.TITULO} path={Routes.DESPESAS.path} icon="cash" total={total} />
                    </IonCol>
                    <IonCol size="6">
                        <DashboarCard title={Messages.COMPRAS.TITULO} path={Routes.COMPRAS.path} icon="cart" total={0} />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </div>
);