import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import {
    FaSearch,
    FaUsers,
    FaTrophy,
    FaPlus,
    FaFacebookMessenger,
    FaBell,
    FaCaretDown,
    FaQuestionCircle,
    FaBook,
    FaMoon,
    FaSignOutAlt,
    FaCalendarPlus,
    FaCalendarCheck,
    FaEdit,
    FaFileInvoiceDollar,
    FaBookMedical,
    FaRegPaperPlane,
} from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import { BiSolidCalendarStar, BiSolidCalendarEdit } from 'react-icons/bi';
import { BsFillGrid3X3GapFill, BsCartPlus } from 'react-icons/bs';
import { PiWarningCircleBold } from 'react-icons/pi';
import { FiUserPlus } from 'react-icons/fi';
import { CiReceipt } from 'react-icons/ci';
import { FaRegEnvelope } from 'react-icons/fa6';
import React, { useState } from 'react'; // Thêm useState
import Dropdown from '~/layouts/component/Dropdown/Dropdown';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { Link,useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const iconBtn = [
    {
        id: 1,
        icon: ImHome,
        href: '/admin',
    },
    {
        id: 2,
        icon: FaUsers,
        href: '/groups',
    },
    {
        id: 3,
        icon: BiSolidCalendarStar,
        href: '/events',
    },
    {
        id: 4,
        icon: FaTrophy,
        href: '/task-management-new',
    },
];
function Header() {
    const handleClick = (id) => {
        setIsActive(id);
    };
    const [isActive, setIsActive] = useState(1);
    const location = useLocation();

    // ====================
    // DATA CHO DROPDOWN CREATE
    // ====================
    const iconPlusItems = [
        {
            id: 'post',
            icon: <FaEdit size={26} style={{ color: '#828282' }} />,
            title: 'Tạo bài viết',
            description: 'Chia sẻ bài viết lên bảng tin',
            onClick: () => console.log('Create post'),
        },
        {
            id: 'event',
            icon: <FaCalendarPlus size={26} style={{ color: '#828282' }} />,
            title: 'Sự kiện',
            description: 'Gắn kết mọi người thông qua sự kiện công khai',
            onClick: () => console.log('Create story'),
        },
        {
            id: 'group',
            icon: <FaUsers size={26} style={{ color: '#828282' }} />,
            title: 'Nhóm',
            description: 'Kết nối những người chung sở thích',
            onClick: () => console.log('Create room'),
        },
        {
            id: 'register-class',
            icon: <FaCalendarCheck size={26} style={{ color: '#828282' }} />,
            title: 'Đăng kí lịch học',
            rightIcon: <ChevronDown size={20} />,
            submenu: [
                {
                    id: 'register-schedule',
                    icon: <FaCalendarPlus size={26} style={{ color: '#828282' }} />,
                    title: 'Đăng ký lịch học',
                    description: 'Bạn có thể chủ động đăng ký giáo viên và thời gian học phù hợp',
                    onClick: () => console.log('Register schedule'),
                },
                {
                    id: 'join-schedule',
                    icon: <BiSolidCalendarEdit size={26} style={{ color: '#828282' }} />,
                    title: 'Tham gia lịch học',
                    description: 'Tham gia vào các lịch học được thiết lập sẵn',
                    onClick: () => console.log('Join schedule'),
                },
            ],
        },
        {
            id: 'take-off',
            icon: <PiWarningCircleBold size={26} style={{ color: '#828282' }} />,
            title: 'Xin nghỉ',
            onClick: () => console.log('Create room'),
        },
    ];
    // ====================
    // DATA CHO DROPDOWN MENU CHÍNH (như ảnh 2)
    // ====================
    const iconChevronRightItems = [
        {
            id: 'add-user',
            title: 'Thêm học viên',
            icon: <FiUserPlus size={26} style={{ color: '#828282' }} />,
        },
        {
            id: 'add-HR',
            title: 'Thêm mới nhân sự',
            icon: <FiUserPlus size={26} style={{ color: '#828282' }} />,
        },
        {
            id: 'add-receipt',
            title: 'Thêm mới phiếu thu',
            icon: <CiReceipt size={26} style={{ color: '#828282' }} />,
        },

        {
            id: 'add-invoice',
            title: 'Thêm mới phiếu chi',
            icon: <FaFileInvoiceDollar size={26} style={{ color: '#828282' }} />,
        },
        {
            id: 'add-order',
            title: 'Tạo đơn hàng',
            icon: <BsCartPlus size={26} style={{ color: '#828282' }} />,
        },
        {
            id: 'add-schedule',
            title: 'Thêm lịch học',
            icon: <FaBookMedical size={26} style={{ color: '#828282' }} />,
        },
        {
            id: 'add-classroom',
            title: 'Thêm lớp học',
            icon: <FaUsers size={26} style={{ color: '#828282' }} />,
        },
        {
            id: 'add-email',
            title: 'Thêm mới chiến dịch Email',
            icon: <FaRegEnvelope size={26} style={{ color: '#828282' }} />,
        },
        {
            id: 'add-SMS',
            title: 'Thêm mới chiến dịch SMS',
            icon: <FaRegPaperPlane size={26} style={{ color: '#828282' }} />,
        },
    ];
    const [showQuickAdd, setShowQuickAdd] = useState(false);
    console.log('showQuickAdd:', showQuickAdd);
    const [isGridMenuOpen, setIsGridMenuOpen] = useState(false);
    const quickAddItems = [
        {
            header: (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 16px',
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowQuickAdd(false);
                            setIsGridMenuOpen(true);
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '6px',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f2f5')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                    ></button>
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '20px',
                            fontWeight: 600,
                            flex: 1,
                            textAlign: 'center',
                            marginRight: '28px',
                        }}
                    >
                        Thêm nhanh
                    </h3>
                </div>
            ),
        },
        {
            id: 'add-user',
            icon: <FiUserPlus size={26} style={{ color: '#828282' }} />,
            title: 'Thêm học viên',
            onClick: () => console.log('Add user'),
        },
        {
            id: 'add-HR',
            icon: <FiUserPlus size={26} style={{ color: '#828282' }} />,
            title: 'Thêm mới nhân sự',
            onClick: () => console.log('Add HR'),
        },
        {
            id: 'add-receipt',
            icon: <CiReceipt size={26} style={{ color: '#828282' }} />,
            title: 'Thêm mới phiếu thu',
            onClick: () => console.log('Add receipt'),
        },
        {
            id: 'add-invoice',
            icon: <FaFileInvoiceDollar size={26} style={{ color: '#828282' }} />,
            title: 'Thêm mới phiếu chi',
            onClick: () => console.log('Add invoice'),
        },
        {
            id: 'add-order',
            icon: <BsCartPlus size={26} style={{ color: '#828282' }} />,
            title: 'Tạo đơn hàng',
            onClick: () => console.log('Add order'),
        },
        {
            id: 'add-schedule',
            icon: <FaBookMedical size={26} style={{ color: '#828282' }} />,
            title: 'Thêm lịch học',
            onClick: () => console.log('Add schedule'),
        },
        {
            id: 'add-classroom',
            icon: <FaUsers size={26} style={{ color: '#828282' }} />,
            title: 'Thêm lớp học',
            onClick: () => console.log('Add classroom'),
        },
        {
            id: 'add-email',
            icon: <FaRegEnvelope size={26} style={{ color: '#828282' }} />,
            title: 'Thêm mới chiến dịch Email',
            onClick: () => console.log('Add email'),
        },
        {
            id: 'add-SMS',
            icon: <FaRegPaperPlane size={26} style={{ color: '#828282' }} />,
            title: 'Thêm mới chiến dịch SMS',
            onClick: () => console.log('Add SMS'),
        },
    ];

    const iconGridItems = [
        {
            header: (
                <div
                    className={cx('wrap-menu')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start !important',
                        padding: '12px 16px 12px 0px',
                        width: '100%',
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowQuickAdd(!showQuickAdd); // Toggle instead of just true
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'none',
                            border: '1px solid rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            // padding: '4px',
                            borderRadius: '50%',
                            fontSize: '14px',
                            color: '#65676b',
                            backgroundColor: '##e9e9e9',
                            marginRight: 10,
                        }}
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>Menu</h3>
                    <div style={{ width: '100px' }}></div>
                </div>
            ),
        },
        {
            header: (
                <div
                    className={cx('wrap-input')}
                    style={{
                        padding: '0px 16px',
                        display: 'flex',
                        justifyContent: 'space-between ',
                        width: '90%',
                        border: '1px solid #ccc',
                        borderRadius: 30,
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            // border: '1px solid #e4e6e9',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none',
                            border: 'none',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <FaSearch className={cx('icon-search')} size={24} style={{ color: '#828282', marginTop: 5 }} />
                </div>
            ),
            jusitfy: 'left',
        },
        {
            id: 'easy-space',
            icon: <img src="/images/logo2019_png_1.png" alt="Easy Space" />,
            title: 'Easy Space (Không gian chung)',
            description: 'Không gian tương tác chung cho mọi thành viên trong Nhà trường',
            onClick: () => console.log('Open Easy Space'),
        },
        {
            id: 'easy-order',
            icon: <img src="/images/EasyOrder.png" alt="Easy Order" />,
            title: 'Easy Order (Đơn hàng)',
            description: 'Bán hàng tiện lợi, dễ dàng, hiệu quả, nhanh chóng',
            onClick: () => console.log('Open Easy Order'),
        },
        {
            id: 'easy-omnichannel',
            icon: <img src="/images/EasySocial.png" alt="Easy Social" />,
            title: 'Easy Omnichannel (Tương tác đa kênh)',
            description: 'Chat real time nói bộ, quản lý tương tác qua Facebook, Zalo',
            onClick: () => console.log('Open Easy Omnichannel'),
        },
        {
            id: 'easy-store',
            icon: <img src="/images/EasyStore.png" alt="Easy Store" />,
            title: 'Easy Store (Kho hàng)',
            description: 'Quản lý xuất - nhập - tồn kho nhanh chóng, đơn giản, hiệu quả',
            onClick: () => console.log('Open Easy Store'),
        },
        {
            id: 'easy-goal',
            icon: <img src="/images/EasyGoal.png" alt="Easy Goal" />,
            title: 'Easy Goal (Mục tiêu)',
            description: 'Dễ dàng quản trị mục tiêu nhất quán trong doanh nghiệp qua công cụ OKRs, KPI và BSC',
            onClick: () => console.log('Open easy goal'),
        },
        {
            id: 'easy-drive',
            icon: <img src="/images/EasyDrive.png" alt="Easy Drive" />,
            title: 'Easy Drive (Tài liệu)',
            description: 'Không gian lưu trữ File, Tài liệu, dễ dàng chia sẻ',
            onClick: () => console.log('Open easy goal'),
        },
        {
            id: 'easy-crm',
            icon: <img src="/images/EasyCRM.png" alt="Easy CRM" />,
            title: 'Easy CRM (Khách hàng)',
            description: 'Tối ưu quy trình trước, trong và sau bán hàng hiệu quả',
            onClick: () => console.log('Open easy goal'),
        },
        {
            id: 'easy-game',
            icon: <img src="/images/EasyGames.png" alt="Easy Games" />,
            title: 'Easy Games (Trò chơi)',
            description: 'Hơn 30 Games giáo dục hiệu quả, hấp dẫn cho học sinh',
            onClick: () => console.log('Open easy goal'),
        },
        {
            id: 'easy-education',
            icon: <img src="/images/EasyEducation.png" alt="Easy Education" />,
            title: 'Easy Education (Đào tạo)',
            description: 'Dễ dàng vận hành mọi nghiệp vụ, mô hình đào tạo tùy biến, linh hoạt',
            onClick: () => console.log('Open easy goal'),
        },
        {
            id: 'easy-report',
            icon: <img src="/images/EasyReport.png" alt="Easy Report" />,
            title: 'Easy Report (Báo cáo)',
            description: 'Báo cáo chi tiết cho mọi chỉ số trong Doanh nghiệp',
            onClick: () => console.log('Open easy goal'),
        },
        {
            id: 'easy-finance',
            icon: <img src="/images/EasyFinance.png" alt="Easy Finance" />,
            title: 'Easy Finance (Tài chính)',
            description: 'Dễ dàng kiểm soát sức khỏe tài chính thông qua quản lý thu chi, công nợ, quỹ...',
            onClick: () => console.log('Open easy goal'),
        },
        {
            id: 'easy-Setting',
            icon: <img src="/images/Settings.png" alt="Easy Settings" />,
            title: 'Cấu hình',
            description: 'Cấu hình cho Easy Platform, Phân quyền vai trò nhân sự',
            onClick: () => console.log('Open easy goal'),
        },
        {
            id: 'easy-marketing',
            icon: <img src="/images/EasyMarketing.png" alt="Easy Marketing" />,
            title: 'Easy Marketing (Tiếp thị)',
            description: 'Thiết lập và Quản lý các chiến dịch Marketing (SMS, Email, Optin Form)',
            onClick: () => console.log('Open easy goal'),
        },
        { divider: true },
        {
            id: 'easy-HRM',
            icon: <img src="/images/EasyHR.png" alt="Easy HR" />,
            title: 'Easy HRM (Nhân sự)',
            description: 'Dễ dàng xây dựng cơ chế, tối ưu nguồn lực nhân sự trong Doanh nghiệp',
            onClick: () => console.log('Open easy goal'),
        },
    ];

    const iconMessageItems = [
        {
            id: 'message',
            icon: <img src="/images/chat.9322c9dc.png" alt="Chat" />,
            title: 'Chat',
            onClick: () => console.log('open chat'),
        },
    ];

    // ====================
    // DATA CHO DROPDOWN USER/ACCOUNT (như ảnh 1)
    // ====================
    const iconCaretDownItems = [
        {
            id: 'manager',
            icon: <img src="/images/logo2019_png_1.png" alt="logo" style={{ color: '#828282' }} />,
            title: 'Quản lý',
            onClick: () => console.log('click manager item'),
        },
        { divider: true },

        {
            id: 'support',
            icon: <FaQuestionCircle size={26} style={{ color: '#828282' }} />,
            title: 'Hỗ trợ',
            description: 'Hãy liên hệ với chúng tôi',
            onClick: () => console.log('click support item'),
        },
        {
            id: 'book-guide',
            icon: <FaBook size={26} style={{ color: '#828282' }} />,
            title: 'Tài liệu hướng dẫn',
            description: 'Wiki EasyEdu Platform',
            onClick: () => console.log('Click book guide item'),
        },
        {
            id: 'dark-mode',
            icon: <FaMoon size={26} style={{ color: '#828282' }} />,
            title: 'Chế độ tối',
            description: 'Chuyển sang chế độ tối',
            onClick: () => console.log('Click dark mode item'),
        },
        {
            id: 'language-mode',
            icon: <img src="/images/flagVietNam.png" alt="flag-VietNam" />,
            title: 'Tiếng Việt',
            rightIcon: <FaCaretDown size={20} />,
            onClick: () => console.log('Click dark mode language'),
            submenu: [
                {
                    id: 'VietNamese',
                    icon: <img src="/images/flagVietNam.png" alt="flag-VietNam" />,
                    title: 'Tiếng Việt',
                },
                {
                    id: 'English',
                    icon: <img src="/images/English.png" alt="English" />,
                    title: 'English',
                },
                {
                    id: 'Chinese',
                    icon: <img src="/images/Chinese.png" alt="Chinese" />,
                    title: '简体中文',
                },
            ],
        },
        { divider: true },
        {
            id: 'sign out',
            icon: <FaSignOutAlt size={26} style={{ color: '#828282' }} />,
            title: 'Đăng xuất',
            onClick: () => console.log('Click sign out item'),
        },
        {
            header: (
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Phiên bản: 7.10.15</div>
                    <div style={{ color: '#666' }}>
                        <a
                            style={{
                                fontSize: '10px',
                                textDecoration: 'underline',
                                marginRight: '10px',
                                fontWeight: 400,
                            }}
                            href="/product-policy"
                        >
                            Chính sách sản phẩm
                        </a>

                        <a style={{ fontSize: '10px', textDecoration: 'underline', fontWeight: 400 }} href="/terms">
                            Điều khoản dịch vụ
                        </a>
                    </div>
                    <div style={{ fontSize: '11px', marginTop: '4px' }}>Copyright by EMSO Việt Nam, JSC.</div>
                </div>
            ),
        },
    ];

    const notificationItems = [
        { header: <h3 style={{ padding: 10 }}>Thông báo</h3> },
        {
            id: 'notif-1',
            icon: <img src="/images/default_user.png" alt="User" />,
            title: 'Khánh Hà đã thích bài viết của bạn',
            description: '5 phút trước',
            onClick: () => console.log('Open notification 1'),
        },
        {
            id: 'notif-2',
            icon: <img src="/images/default_user.png" alt="User" />,
            title: 'Đại đã bình luận về ảnh của bạn',
            description: '1 giờ trước',
            onClick: () => console.log('Open notification 2'),
        },
        {
            id: 'notif-3',
            icon: <img src="/images/default_user.png" alt="User" />,
            title: 'Nhân đã gửi cho bạn một tin nhắn',
            description: '2 giờ trước',
            onClick: () => console.log('Open notification 3'),
        },
    ];

    return (
        <>
            <header className={cx('header')}>
                <div className={cx('header-container')}>
                    {/* Left section */}
                    <div className={cx('header-left')}>
                        <div className={cx('header-logo')}>
                            <img src="/images/logo2019_png_1.png" alt="header-logo"></img>
                        </div>
                        <div className={cx('header-search')}>
                            <div className={cx('search-icon')}>
                                <FaSearch size={20} />
                            </div>
                            <input className={cx('text-search')} type="text" placeholder="Search..." />
                        </div>
                    </div>

                    {/* Center section */}

                    <div className={cx('header-nav')}>
                        {iconBtn.map((item) => {
                            return (
                                <Link
                                    to={item.href}
                                    key={item.id}
                                    style={{
                                        borderBottom: location.pathname === item.href ? '3px solid #007bff' : 'none',
                                    }}
                                >
                                    <button className={cx('action-btn')} onClick={() => handleClick(item.id)}>
                                        <span className={cx('wrap-icon')}>
                                            <item.icon size={26} />
                                        </span>
                                    </button>
                                </Link>
                            );
                        })}
                        {/* <Link to="/admin" onClick={handleClick}>
                        <button className={cx('action-btn')}>
                            <span className={cx('wrap-icon')}>
                                <ImHome size={26} />
                            </span>
                        </button>
                        </Link>
                        <button className={cx('action-btn')}>
                            <span className={cx('wrap-icon')}>
                                <FaUsers size={26} />
                            </span>
                        </button>
                        <button className={cx('action-btn')}>
                            <span className={cx('wrap-icon')}>
                                <BiSolidCalendarStar size={26} />
                            </span>
                        </button>
                        <button className={cx('action-btn')}>
                            <span className={cx('wrap-icon')}>
                                <FaTrophy size={26} />
                            </span>
                        </button> */}
                    </div>

                    <div className={cx('header-right')}>
                        {/* USER BUTTON */}
                        <button className={cx('header-user')}>
                            <span>
                                <div className={cx('wrap-avatar')}>
                                    <img src="/images/logo2019_png_1.png" alt="avatar" />
                                </div>
                                <p className={cx('name')}>Lý</p>
                            </span>
                        </button>

                        {/* CREATE DROPDOWN */}
                        <Dropdown
                            button={
                                <button className={cx('action-btn')}>
                                    <span>
                                        <FaPlus size={26} />
                                    </span>
                                </button>
                            }
                            items={iconPlusItems}
                            width="medium"
                        />

                        {/* Container cho Grid Dropdown và Quick Add */}
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            {/* Quick Add Dropdown */}
                            {showQuickAdd && isGridMenuOpen && (
                                <div className={cx('quick-add-menu')}>
                                    <div className={cx('scroll-bar')}>
                                        {quickAddItems.map((item, index) => {
                                            if (item.header) {
                                                return (
                                                    <div
                                                        key={`header-${index}`}
                                                        style={{
                                                            borderBottom: index === 0 ? '1px solid #e4e6e9' : 'none',
                                                        }}
                                                    >
                                                        {item.header}
                                                    </div>
                                                );
                                            }

                                            return (
                                                <button
                                                    className={cx('item-btn')}
                                                    key={item.id || index}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        item.onClick?.();
                                                    }}
                                                    onMouseEnter={(e) =>
                                                        (e.currentTarget.style.backgroundColor = '#f0f2f5')
                                                    }
                                                    onMouseLeave={(e) =>
                                                        (e.currentTarget.style.backgroundColor = 'transparent')
                                                    }
                                                >
                                                    {item.icon && (
                                                        <div className={cx('icon')} style={{ flexShrink: 0 }}>
                                                            {item.icon}
                                                        </div>
                                                    )}
                                                    <div style={{ flex: 1 }}>
                                                        {item.title && (
                                                            <div style={{ fontWeight: 600, fontSize: '15px' }}>
                                                                {item.title}
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* MENU DROPDOWN (Grid) */}
                            <Dropdown
                                button={
                                    <button className={cx('action-btn')}>
                                        <span>
                                            <BsFillGrid3X3GapFill size={26} />
                                        </span>
                                    </button>
                                }
                                items={iconGridItems}
                                width="xlarge"
                                position="bottom-end"
                                onOpenChange={(open) => {
                                    setIsGridMenuOpen(open);
                                    if (!open) {
                                        setShowQuickAdd(false); // Reset Quick Add khi Grid đóng
                                    }
                                }}
                            />
                        </div>

                        {/* MESSENGER BUTTON (không có dropdown) */}
                        <Dropdown
                            button={
                                <button className={cx('action-btn')}>
                                    <span>
                                        <FaFacebookMessenger size={26} />
                                    </span>
                                </button>
                            }
                            items={iconMessageItems}
                            width="small"
                            position="bottom-end"
                        />

                        {/* <button className={cx('action-btn')} onClick={() => console.log('Open messenger')}>
                            <span><FaFacebookMessenger size={26} /></span>
                        </button> */}

                        {/* NOTIFICATION DROPDOWN */}
                        <Dropdown
                            button={
                                <button className={cx('action-btn')}>
                                    <span>
                                        <FaBell size={26} />
                                    </span>
                                </button>
                            }
                            items={notificationItems}
                            width="large"
                        />

                        {/* ACCOUNT MENU DROPDOWN (ảnh 1) */}
                        <Dropdown
                            button={
                                <button className={cx('action-btn')}>
                                    <span>
                                        <FaCaretDown size={26} />
                                    </span>
                                </button>
                            }
                            items={iconCaretDownItems}
                            width="medium"
                        />
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
