import ErrorNotFound from '../common/NotFound/notFound';
import { RouteConfigInterface } from './model';
import { applicationPath } from '../../config/routePath';
import TestComponent from '../test/testComponent';
export const routes: RouteConfigInterface[] = [
    {
        path: applicationPath.Home,
        component: TestComponent,
        childRoutes: [],
    },
    /**
     * ! Wild Card Route - Add all other routes before wild card route
     */
    {
        path: applicationPath.Unknown,
        component: ErrorNotFound,
        childRoutes: [],
    },
];
