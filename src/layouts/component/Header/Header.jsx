
import React from 'react';
import { FaHome, FaUsers, FaMoon } from 'react-icons/fa';
import { FaUsersBetweenLines } from 'react-icons/fa6';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import {
    BiSolidCalendarStar,
    BiSolidCalendarEdit,
    BiSolidCalendarPlus,
    BiSolidCalendarCheck,
    BiSolidEdit,
} from 'react-icons/bi';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { ImBooks } from 'react-icons/im';
import { PiSealWarning } from 'react-icons/pi';
import { MenuDropdown, ActivityDropdown, DifferentDropdown, NotificationDropdown, MessageDropdown } from '../Dropdown';
function Header() {
    const accountLinks = [
        { href: '/profile', icon: BiSolidEdit, title: 'Đăng', description: 'Chia sẻ bài viết lên bảng tin' },
        {
            href: '/settings',
            icon: BiSolidCalendarCheck,
            title: 'Đăng kí lịch học',
            description: '',
            elements: [
                {
                    href: '/settings/teacher',
                    icon: BiSolidCalendarPlus,
                    title: 'Đăng kí học',
                    description: 'Bạn có thể chủ động đăng ký giáo viên và thời gian học phù hợp',
                },
                {
                    href: '/settings/join',
                    icon: BiSolidCalendarEdit,
                    title: 'Tham gia lịch học',
                    description: 'Tham gia vào các lịch học được thiết lập sẵn',
                },
            ],
        },
        { href: '/logout', icon: PiSealWarning, title: 'Xin nghỉ', description: '' },
    ];
    const MenuLinks = [
        {
            href: '/profile',
            icon: '/images/LogoStudentHeader.png',
            title: 'Easy Space (Không gian chung)',
            description: 'Không gian tương tác chung cho mọi thành viên trong Nhà trường',
        },
        {
            href: '/logoutr',
            icon: '/images/EasyOmnicchanel.png',
            title: 'Easy Omnichannel (Tương tác đa kênh)',
            description: 'Chat real time nội bộ, quản lý tương tác qua Facebook, Zalo',
        },
        {
            href: '/logoutt',
            icon: '/images/EasyEducation.png',
            title: 'Easy Education (Đào tạo)',
            description: 'Dễ dàng vận hành mọi nghiệp vụ, mô hình đào tạo tùy biến, linh hoạt',
        },
        {
            href: '/logouta',
            icon: '/images/HoaDonStudent.png',
            title: 'Easy Finance (Tài chính)',
            description: 'Dễ dàng kiểm soát sức khỏe tài chính thông qua quản lý thu chi, công nợ, quỹ...',
        },
        {
            href: '/logoutw',
            icon: '/images/DriverStudent.png',
            title: 'Easy Drive (Tài liệu)',
            description: 'Không gian lưu trữ File, Tài liệu, dễ dàng chia sẻ',
        },
        {
            href: '/logoutv',
            icon: '/images/GamesStudent.png',
            title: 'Easy Games (Trò chơi)',
            description: 'Hơn 30 Games giáo dục hiệu quả, hấp dẫn cho học sinh',
        },
    ];
    const MessageLinks = [
        {
            href: '/profile',
            icon: '/images/ChatStudent.png',
            title: 'Chat',
            description: '',
        },
    ];
    const differentLinks = [
        { href: '/profile', icon: BsFillQuestionCircleFill, title: 'Hỗ trợ', description: 'Hãy liên hệ với chúng tôi' },
        {
            href: '/logout',
            icon: ImBooks,
            title: 'Tài liệu hướng dẫn',
            description: 'Wiki Easyedu Platform',
        },
        {
            href: '/logout/sign',
            icon: FaMoon,
            title: 'Chế độ tối',
            description: 'Chuyển sang chế độ tối',
        },
        {
            href: '/logout/signs',
            icon: '/images/VN-flag.png',
            title: 'Tiếng Việt',
            description: '',
            elements: [
                {
                    href: '#',
                    icon: '/images/VN-flag.png',
                    title: 'Tiếng Việt',
                    description: '',
                },
                {
                    href: '#',
                    icon: '/images/US-flag.png',
                    title: 'English',
                    description: '',
                },
                {
                    href: '#',
                    icon: '/images/China-flag.png',
                    title: '简体中文',
                    description: '',
                },
            ],
        },
    ];
    return (
        <header className={styles.HeaderStudent}>
            <div className={styles.HeaderStudent__SearchLogo}>
                <div className={styles.HeaderStudent__Logo}>
                    <img src="/images/LogoStudentHeader.png" alt="English Center Header Logo" />
                </div>
                <div className={styles.HeaderStudent__Search}>
                    <div className={styles.HeaderStudent__SearchIcon}>
                        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                        </svg>
                    </div>
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className={styles.HeaderStudent__MainFeature}>
                <div className={styles.HeaderStudent__Feature}>
                    <NavLink to="/student/space">
                        <FaHome className={styles.HeaderStudent__LinkIcon} />
                    </NavLink>
                </div>
                <div className={styles.HeaderStudent__Feature}>
                    <NavLink to="/space/groups">
                        <FaUsers className={styles.HeaderStudent__LinkIcon} />
                    </NavLink>
                </div>
                <div className={styles.HeaderStudent__Feature}>
                    <NavLink to="/space/events">
                        <BiSolidCalendarStar className={styles.HeaderStudent__LinkIcon} />
                    </NavLink>
                </div>
                <div className={styles.HeaderStudent__Feature}>
                    <NavLink to="/space/classes">
                        <FaUsersBetweenLines className={styles.HeaderStudent__LinkIcon} />
                    </NavLink>
                </div>
            </div>
            <div className={styles.HeaderStudent__SupportFeature}>
                <NavLink to="/student/space/user" className={styles.HeaderStudent__AvatarUser}>
                    <div className={styles.HeaderStudent__Avatar}>
                        <img src="/images/avatarStudent.jpg" alt="Ảnh đại diện" />
                    </div>
                    <span className={styles.HeaderStudent__Name}>Đại</span>
                </NavLink>
                <ActivityDropdown label="" links={accountLinks} />
                <MenuDropdown label="" links={MenuLinks} />
                <MessageDropdown label="" links={MessageLinks} />
                <NotificationDropdown label="" links={accountLinks} />
                <DifferentDropdown label="" links={differentLinks} />
            </div>
        </header>
    );
}

export default Header;
