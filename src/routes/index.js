import Login from '~/pages/Login';
import Admin from '~/pages/Admin';
import Logup from '~/pages/Logup';
import home from '~/pages/Home/HomePage';
import { DefaultLayout, HeaderOnly } from '~/layouts';

// CÁC TRANG CÔNG KHAI (Ai cũng truy cập được)
const publicRoutes = [
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Logup, layout: null },
];

const privateRoutes = [
    {
        path: '/',
        component: home,
        layout: DefaultLayout,
    },
    {
        path: '/admin',
        component: Admin,
        layout: HeaderOnly,
        roles: ['Admin'],
    },
];

export { publicRoutes, privateRoutes };
