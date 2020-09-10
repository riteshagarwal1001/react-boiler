import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import * as RouteUtil from '../../../common/utils/routeUtil';
import { ErrorBoundary } from '../../common/components/ErrorBoundary';
import { routes } from '../routesConfig';
import { RouteConfigInterface } from '../model';
import { hasAccess } from '../../common/utils/util';

const Routes = () => {
    const renderRoutes = (
        routeConfigs: RouteConfigInterface[],
        parentPath?: string,
    ) => {
        let routeList: any[] = [];
        routeConfigs.forEach(
            ({ component: Component, path, childRoutes, access, ...rest }) => {
                let allow = true;
                if (access && !hasAccess(access)) {
                    allow = false;
                }
                const redirectPath =
                    parentPath !== undefined ? parentPath + path : path;
                if (allow) {
                    routeList.push(
                        <Route
                            exact
                            key={path}
                            path={redirectPath}
                            render={props => {
                                if (RouteUtil.isRedirectRequired()) {
                                    if (
                                        RouteUtil.isRedirectToLoginRequired() &&
                                        props.history.location.pathname !== '/'
                                        // && !localStorage.getItem('redirect')
                                    ) {
                                        localStorage.setItem(
                                            'redirect',
                                            `${props.history.location.pathname}${props.history.location.search}`,
                                        );
                                    }
                                    return (
                                        <Redirect
                                            to={RouteUtil.getRedirectLandingPage()}
                                        />
                                    );
                                }
                                const combinedProps = { ...rest, ...props };
                                return (
                                    <ErrorBoundary>
                                        <Component {...combinedProps} />
                                    </ErrorBoundary>
                                );
                            }}
                            {...rest}
                        />,
                    );
                    if (childRoutes && childRoutes.length > 0) {
                        routeList = routeList.concat(
                            renderRoutes(childRoutes, path),
                        );
                    }
                }
            },
        );
        return routeList;
    };

    return <Switch>{renderRoutes(routes)}</Switch>;
};

export default Routes;
