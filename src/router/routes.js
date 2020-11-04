import BasicController from '../component/BasicController';
import Home from '../component/Home';

export const rootRouters = [
    {
        path: '/basic',
        exact: true,
        component: BasicController,
    },
    {
        path: '/',
        exact: true,
        component: Home,
    },
];
