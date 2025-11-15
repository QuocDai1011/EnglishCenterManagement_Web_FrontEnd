import Login from '~/pages/Login';
import Logup from '~/pages/Logup';
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
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Logup, layout: null },
];

// ============================
// CÁC TRANG YÊU CẦU ĐĂNG NHẬP
// ============================
const privateRoutes = [
    // Admin
    { path: '/admin', component: Admin, layout: HeaderOnly, roles: ['Admin'] },
    { path: '/admin/user', component: User, layout: HeaderOnly, roles: ['Admin'] },
    { path: '/admin/groups', component: Groups, layout: HeaderOnly, roles: ['Admin'] },
    { path: '/admin/class', component: MyClass, layout: HeaderOnly, roles: ['Admin'] },
    { path: '/admin/people/calendar', component: Calendar, layout: HeaderOnly, roles: ['Admin'] },
    { path: '/admin/hr/add', component: AddTeacher, layout: null, roles: ['Admin'] },
    { path: '/admin/student', component: ManagementStudent, layout: DefaultLayout, roles: ['Admin'] },
    { path: '/admin/student/add', component: AddStudentForm, layout: null, roles: ['Admin'] },

    // Student
    { path: '/student/space', component: StudentSpace, layout: HeaderAndNavbar, roles: ['Student'] },
    { path: '/student/space/user', component: StudentUser, layout: HeaderAndNavbar, roles: ['Student'] },
    { path: '/student/space/classes', component: Classes, layout: HeaderAndNavbar, roles: ['Student'] },
    { path: '/student/space/classes/:id', component: StudentClassItem, layout: HeaderAndNavbar, roles: ['Student'] },
    {
        path: '/student/space/people/calendar',
        component: FullCalendarItem,
        layout: HeaderAndNavbar,
        roles: ['Student'],
    },
    { path: '/student/space/marketplace', component: StudentMarketplace, layout: HeaderAndNavbar, roles: ['Student'] },
    { path: '/student/space/checkout', component: StudentCheckout, layout: HeaderAndNavbar, roles: ['Student'] },

    // Teacher (nếu có)
    { path: '/admin', component: Admin, layout: DefaultLayout, roles: ['Admin'] },
];

export { publicRoutes, privateRoutes };
