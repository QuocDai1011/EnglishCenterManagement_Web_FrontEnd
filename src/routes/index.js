import Login from '~/pages/Login';
import Logup from '~/pages/Logup';
import Home from '~/pages/Home/HomePage';
// Admin pages
import Admin from '~/pages/RoleAdmin/Admin';
import User from '~/pages/User';
import MyClass from '~/pages/RoleAdmin/MyClass';
import Groups from '~/pages/RoleAdmin/Groups';
import Calendar from '~/pages/RoleAdmin/PersonalCalendar';

import { DefaultLayout, HeaderOnly } from '~/layouts';

// Student pages
import ManagementStudent from '~/pages/RoleAdmin/ManagementStudent';
import AddStudentForm from '~/pages/RoleAdmin/AddStudent';
import Classes from '~/pages/Student/StudentClasses';
import StudentUser from '~/pages/Student/StudentUser';

// Layout components
import HeaderAndNavbar from '~/layouts/HeaderAndNavbar';
import StudentClassItem from '~/layouts/component/StudentClassItem';
import FullCalendarItem from '~/layouts/component/FullCalendarItem';
import StudentSpace from '~/layouts/component/StudentSpace';
import AddTeacher from '~/pages/RoleAdmin/AddTeacher';
import StudentMarketplace from '~/pages/Student/StudentMarketplace';
import StudentCheckout from '~/layouts/component/StudentCheckout';

// ============================
// CÁC TRANG CÔNG KHAI (Ai cũng truy cập được)
// ============================
const publicRoutes = [
    { path: '/', component: Login, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Logup, layout: null },

    // Admin routes
    { path: '/Admin/', component: Admin, layout: HeaderOnly },
    { path: '/Admin/user', component: User, layout: HeaderOnly },
    { path: '/Admin/groups', component: Groups, layout: HeaderOnly },
    { path: '/Admin/class', component: MyClass, layout: HeaderOnly },
    { path: '/Admin/people/calendar', component: Calendar, layout: HeaderOnly },
    { path: '/Admin/HR/Add', component: AddTeacher, layout: null },
    { path: '/Admin/student', component: ManagementStudent, layout: DefaultLayout },
    { path: '/Admin/student/add', component: AddStudentForm, layout: null },

    // Student routes - HÀ /student/....
    { path: '/student', component: ManagementStudent, layout: HeaderOnly },
    { path: '/student/add', component: AddStudentForm, layout: null },
    { path: '/student/space', component: StudentSpace, layout: HeaderAndNavbar },
    { path: '/student/space/user', component: StudentUser, layout: HeaderAndNavbar },
    { path: '/student/space/classes', component: Classes, layout: HeaderAndNavbar },
    { path: '/student/space/classes/:id', component: StudentClassItem, layout: HeaderAndNavbar },
    { path: '/student/space/people/calendar', component: FullCalendarItem, layout: HeaderAndNavbar }, 
    { path: '/student/space/marketplace', component: StudentMarketplace, layout: HeaderAndNavbar }, 
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
