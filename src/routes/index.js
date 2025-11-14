import Login from '~/pages/Login';
import Admin from '~/pages/Admin';
import Logup from '~/pages/Logup';
import Home from '~/pages/Home/HomePage';
import { DefaultLayout, HeaderOnly } from '~/layouts';

// CÁC TRANG CÔNG KHAI (Ai cũng truy cập được)
const publicRoutes = [
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Logup, layout: null },
];

const privateRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
        roles: ['Student'], // Student mới vào được HomePage
    },
    {
        path: '/admin',
        component: Admin,
        layout: DefaultLayout,
        roles: ['Admin'], // Chỉ Admin mới vào Admin page
    },
    {
        path: '/teacher',
        component: Admin, // hoặc TeacherPage nếu có
        layout: DefaultLayout,
        roles: ['Teacher'],
    },
];

export { publicRoutes, privateRoutes };
