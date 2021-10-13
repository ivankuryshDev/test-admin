import { TRoutes } from '../types/generic';
import { lazy } from "react";

const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'));
const Tracker = lazy(() => import('./TrackerView/TrackerView'));
const ListOfTrackedItems = lazy(() => import('./ListOfTrackedItemsView/ListOfTrackedItemsView'));
const TrackedItem = lazy(() => import('./TrackedItemView/TrackedItemView'));




const NotFoundPage = lazy(() => import('./PageNotFoundView/PageNotFoundView'));

export const routes: TRoutes = [
    {
        exact: true,
        layout: DefaultLayout,
        path: '/',
        component: Tracker,
    },
    {
        exact: true,
        layout: DefaultLayout,
        path: '/list',
        component: ListOfTrackedItems,
    },
    {
        layout: DefaultLayout,
        path: '/list/:id',
        component: TrackedItem,
    },
    {
        component: NotFoundPage
    }
];
