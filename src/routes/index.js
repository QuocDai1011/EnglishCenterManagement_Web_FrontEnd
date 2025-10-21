import Login from '~/pages/Login';
import Admin from '~/pages/Admin';
import { DefaultLayout, HeaderOnly } from '~/layouts';
import Student from '~/pages/Student';

const publicRoutes = [
    { path: '/', component: Login, layout: null},
    { path: '/admin', component: Admin, layout: HeaderOnly},
    { path: '/student', component: Student, layout: HeaderOnly},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
