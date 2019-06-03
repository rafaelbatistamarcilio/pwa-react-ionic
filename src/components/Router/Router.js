
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Messages } from '../../constants';

export const Router = props => (
    <Switch >
        <Suspense fallback={<div>{Messages.COMUM.CARREGANDO}</div>}>
            {Object.values(props.routes)
                .map(route => (
                    <Route  key={route.path} 
                            path={route.path} 
                            component={route.component}
                            exact={route.exact} />
                ) )}
        </Suspense>
    </Switch>
)