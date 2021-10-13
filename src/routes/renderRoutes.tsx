import React, { Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { TRoutes } from '../types/generic';

const renderRoutes = (routes: TRoutes = []): JSX.Element => (
    <Suspense fallback={null}>
        <Switch>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route
                        key={route.path || i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Guard>
                                <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
                            </Guard>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>

);

export default renderRoutes;
