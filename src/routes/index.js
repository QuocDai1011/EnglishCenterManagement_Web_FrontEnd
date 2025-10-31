import Login from '~/pages/Login';
import Admin from '~/pages/Admin';
import User from '~/pages/User';
import MyClass from '~/pages/MyClass';
import { DefaultLayout, HeaderOnly } from '~/layouts';
import Student from '~/pages/Student';
import Groups from '~/pages/Groups'
const publicRoutes = [
    { path: '/', component: Login, layout: null},
    { path: '/admin', component: Admin, layout: HeaderOnly},
    { path: '/user', component: User, layout: HeaderOnly},
    { path: '/groups', component: Groups, layout: HeaderOnly},
    { path: '/student', component: Student, layout: HeaderOnly},
    { path: '/class', component: MyClass, layout: HeaderOnly},
    // { path: '/events', component: Events, layout: HeaderOnly},
    // { path: '/my-drive', component: MyDrive, layout: HeaderOnly},
    // { path: '/calendar', component: Calendar, layout: HeaderOnly},
    // { path: '/tasks', component: Task, layout: HeaderOnly},
    // { path: '/invoices', component: Invoices, layout: HeaderOnly},
    // { path: '/orders', component: Orders, layout: HeaderOnly},
    // { path: '/absenteeism', component: Absenteeism, layout: HeaderOnly},
    // { path: '/timesheets', component: TimeSheets, layout: HeaderOnly},

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
