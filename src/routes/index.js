import Login from '~/pages/Login';
import Admin from '~/pages/Admin';
import { DefaultLayout, HeaderOnly } from '~/layouts';

const publicRoutes = [
    { path: '/', component: Login, layout: null},
    { path: '/admin', component: Admin, layout: HeaderOnly},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
