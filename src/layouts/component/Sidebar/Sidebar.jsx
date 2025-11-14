import MenuItem from '../MenuItem/MenuItem';
import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Sidebar() {
    const MenuItems = [
        {
            id: 1,
            image: '/images/logo2019_png_1.png',
            label: 'Quản Lý',
            link: '/user',
        },
        {
            id: 2,
            image: '/images/speaker.png',
            label: 'Tường nhà trường',
            link: '/groups',
        },
        {
            id: 3,
            image: '/images/marketplace.png',
            label: 'Marketplace',
            link: '/marketplace',
        },
        {
            id: 4,
            image: '/images/group.png',
            label: 'Nhóm',
            link: '/groups',
        },
        {
            id: 5,
            image: '/images/calendar-star.png',
            label: 'Sự kiện',
            link: '/events',
        },
        {
            id: 6,
            image: '/images/myClass.png',
            label: 'Lớp học của tôi',
            link: '/class',
        },
        {
            id: 7,
            image: '/images/group.png',
            label: 'Danh sách sinh viên',
            link: '/student',
        },
    ];


    const MenuItemShortCut = [
        {
            id: 1,
            image: '/images/myCalendar.png',
            label: 'Lịch cá nhân',
            link: '/people/calendar',
        },
        {
            id: 2,
            image: '/images/task.png',
            label: 'Nhiệm vụ cá nhân',
            link: '/tasks',
        },
        {
            id: 3,
            image: '/images/Receipt.png',
            label: 'Hóa đơn',
            link: '/invoices',
        },
        {
            id: 4,
            image: '/images/order.png',
            label: 'Đơn hàng',
            link: '/orders',
        },
        {
            id: 5,
            image: '/images/takeOff.png',
            label: 'Xin nghỉ',
            link: '/absenteeism',
        },
        {
            id: 6,
            image: '/images/game.png',
            label: 'Game',
            link: '/Game',
        },

        {
            id: 7,
            image: '/images/timeSheet.png',
            label: 'Bảng chấm công',
            link: '/timesheets',
        }
    ]
    return (
        <>
            <div className={cx('sidebar')}>
                <div className={cx('sidebar-inner')}>
                    {MenuItems.map((item) => (
                        <MenuItem key={item.id} image={item.image} label={item.label} link={item.link} />
                    ))}
                </div>
                <p className={cx('shortcut-label')}>Lối tắt của bạn</p>
                <div className={cx('shortcut-sidebar')}>
                    {MenuItemShortCut.map((item) => (
                        <MenuItem key={item.id} image={item.image} label={item.label} link={item.link} />

                    ))}
                </div>
            </div>
        </>
    );
}
export default Sidebar;
