
import { lazy } from 'react';
import { Home } from "../../views/home/Home";
import { Messages } from '../../constants';

export const Routes = {
    HOME: {
        path: '/',
        component: Home,
        exact: true,
        label: Messages.HOME.TITULO
    },
    DADOS: {
        path: '/dados',
        component: lazy(() => import("./../../views/dados/Dados")),
        label: Messages.DADOS.TITULO
    },
    DESPESAS: {
        path: '/despesas',
        component: lazy(() => import("./../../views/despesas/Despesas")),
        label: Messages.DESPESAS.TITULO
    },
    COMPRAS: {
        path: '/compras',
        component: lazy(() => import("./../../views/Compras")),
        label: Messages.COMPRAS.TITULO
    }
}