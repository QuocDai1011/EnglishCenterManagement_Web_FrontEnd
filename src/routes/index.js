import Login from '~/pages/Login';
import Admin from '~/pages/Admin';
import User from '~/pages/User';
import MyClass from '~/pages/MyClass';
import Groups from '~/pages/Groups';
import Logup from '~/pages/Logup';
import Home from '~/pages/Home/HomePage';
import { DefaultLayout, HeaderOnly } from '~/layouts';

// Student pages
import ManagementStudent from '~/pages/Student/ManagementStudent'
import AddStudentForm from '~/layouts/component/Form';
// import { Classes } from '~/pages/Student/StudentClasses';
import StudentUser from '~/pages/Student/StudentUser';

// Layout components
import HeaderAndNavbar from '~/layouts/HeaderAndNavbar';
import StudentClassItem from '~/layouts/component/StudentClassItem';
import FullCalendarItem from '~/layouts/component/FullCalendarItem';
import StudentSpace from '~/layouts/component/StudentSpace';

import StudentMarketplace from '~/pages/Student/StudentMarketplace';
import StudentCourseItem from '~/layouts/component/StudentMarketplace';
import StudentCheckout from '~/layouts/component/StudentCheckout';
import Student from '~/pages/Student/ManagementStudent';
import Classes from '~/pages/Student/StudentClasses';

// ============================
// CÁC TRANG CÔNG KHAI (Ai cũng truy cập được)
// ============================
const publicRoutes = [
    { path: '/', component: Login, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Logup, layout: null },
    { path: '/admin', component: Admin, layout: HeaderOnly },
    { path: '/student', component: Student, layout: HeaderAndNavbar },
    { path: '/student/space', component: StudentSpace, layout: HeaderAndNavbar },
    { path: '/student/space/user', component: StudentUser, layout: HeaderAndNavbar },
    { path: '/student/space/classes', component: Classes, layout: HeaderAndNavbar },
    { path: '/student/space/classes/:id', component: StudentClassItem, layout: HeaderAndNavbar },
    { path: '/student/space/people/calendar', component: FullCalendarItem, layout: HeaderAndNavbar },
    { path: '/student/space/marketplace', component: StudentMarketplace, layout: HeaderAndNavbar },
    { path: '/student/space/course/:id', component: StudentCourseItem, layout: HeaderAndNavbar },
    { path: '/student/space/checkout', component: StudentCheckout, layout: HeaderAndNavbar },
];

// ============================
// CÁC TRANG YÊU CẦU ĐĂNG NHẬP
// ============================
const privateRoutes = [
    {
        path: '/home',
        component: Home,
        layout: DefaultLayout,
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

