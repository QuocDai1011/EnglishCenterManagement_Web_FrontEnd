import Login from '~/pages/Login';
import Admin from '~/pages/Admin';
import Logup from '~/pages/Logup';
import Home from '~/pages/Home/HomePage';
import { DefaultLayout, HeaderOnly } from '~/layouts';
import { Student, Classes } from '~/pages/Student';
import HeaderAndNavbar from '~/layouts/HeaderAndNavbar';
import StudentClassItem from '~/layouts/component/StudentClassItem';
import FullCalendarItem from '~/layouts/component/FullCalendarItem';
import StudentSpace from '~/layouts/component/StudentSpace';
import StudentUser from '~/pages/Student/StudentUser';

// CÁC TRANG CÔNG KHAI (Ai cũng truy cập được)
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
];

// CÁC TRANG YÊU CẦU ĐĂNG NHẬP
const privateRoutes = [
  {
    path: '/home',
    component: Home,
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
