
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './../../views/home/Home';

const Dados = lazy(() => import("./../../views/dados/Dados"));
const Despesas = lazy(() => import("./../../views/despesas/Despesas"));

export const Router = () => (
    <Switch >
        <Route path="/" component={Home} exact={true} />
        <Suspense fallback={<div>Loading...</div>}>
            <Route path="/dados" component={Dados} />
            <Route path="/despesas" component={Despesas} />
        </Suspense>
    </Switch>
)