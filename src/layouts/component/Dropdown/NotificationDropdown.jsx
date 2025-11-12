import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import styles from './Dropdown.module.scss';
import { FaBell } from 'react-icons/fa6';
import { LuListFilter } from 'react-icons/lu';
import { TbBellRingingFilled } from 'react-icons/tb';
function NotificationDropdown({ label = 'Options', links = [] }) {
    const [activeBtn, setActiveBtn] = useState('all');
    const [showType, setShowType] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const handleClick = (btnKey) => {
        setActiveBtn(btnKey);
    };
    const handleTypeClick = (type) => {
        setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
    };
    return (
        <Menu as="div" className={styles.NotificationDropdown}>
            <Menu.Button className={styles.NotificationDropdown__button}>
                {label} <FaBell className={styles.NotificationDropdown__icon} />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="enter"
                enterFrom="enter-from"
                enterTo="enter-to"
                leave="leave"
                leaveFrom="leave-from"
                leaveTo="leave-to"
            >
                <Menu.Items className={styles.NotificationDropdown__items}>
                    <div className="NotificationDropdown__item">
                        <div className={styles.NotificationDropdown__header}>
                            <div className={styles.NotificationDropdown__headerTitle}>
                                <p>Thông báo</p>
                                <LuListFilter
                                    size={24}
                                    className={styles.NotificationDropdown__headerIcon}
                                    onClick={() => setShowType(!showType)}
                                />
                                <div
                                    className={`${styles.NotificationDropdown__type}  ${
                                        showType ? styles.show : styles.hide
                                    }`}
                                >
                                    <button
                                        onClick={() => handleTypeClick('daotao')}
                                        className={selectedTypes.includes('daotao') ? styles.active : ''}
                                    >
                                        Đào tạo
                                    </button>
                                    <button
                                        onClick={() => handleTypeClick('khachhang')}
                                        className={selectedTypes.includes('khachhang') ? styles.active : ''}
                                    >
                                        Khách hàng
                                    </button>
                                    <button
                                        onClick={() => handleTypeClick('nhiemvu')}
                                        className={selectedTypes.includes('nhiemvu') ? styles.active : ''}
                                    >
                                        Nhiệm vụ
                                    </button>
                                    <button
                                        onClick={() => handleTypeClick('lichhen')}
                                        className={selectedTypes.includes('lichhen') ? styles.active : ''}
                                    >
                                        Lịch hẹn
                                    </button>
                                    <button
                                        onClick={() => handleTypeClick('quanly')}
                                        className={selectedTypes.includes('quanly') ? styles.active : ''}
                                    >
                                        Quản lý
                                    </button>
                                </div>
                            </div>
                            <div className={styles.NotificationDropdown__headerBtns}>
                                <button
                                    type="button"
                                    className={`${styles.NotificationDropdown__headerBtn} ${
                                        activeBtn === 'all' ? styles.active : ''
                                    }`}
                                    onClick={() => handleClick('all')}
                                >
                                    Tất cả
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.NotificationDropdown__headerBtn} ${
                                        activeBtn === 'unread' ? styles.active : ''
                                    }`}
                                    onClick={() => handleClick('unread')}
                                >
                                    Chưa đọc
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.NotificationDropdown__headerBtn} ${
                                        activeBtn === 'read' ? styles.active : ''
                                    }`}
                                    onClick={() => handleClick('read')}
                                >
                                    Đã đọc
                                </button>
                            </div>
                        </div>
                        <div className={styles.NotificationDropdown__main}>
                            <svg
                                className={styles.NotificationDropdown__mainIcon}
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                data-testid="NotificationsActiveIcon"
                            >
                                <path d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42zM18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-6 11c.14 0 .27-.01.4-.04.65-.14 1.18-.58 1.44-1.18.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2z"></path>
                            </svg>
                            <p className={styles.NotificationDropdown__mainText}>Bạn không có thông báo mới</p>
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default NotificationDropdown;
