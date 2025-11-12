import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CgMenuGridO } from 'react-icons/cg';
import styles from './Dropdown.module.scss';
import { FaAngleDown, FaUsersBetweenLines } from 'react-icons/fa6';
import { RiBookShelfLine } from 'react-icons/ri';

function MenuDropdown({ label = 'Options', links = [] }) {
    const [openSub, setOpenSub] = useState(null);
    const [showLeftSide, setShowLeftSide] = useState(true);
    const LeftSideLinks = [
        {
            href: '/profiles',
            icon: RiBookShelfLine,
            title: 'Thêm lịch học',
            description: '',
        },
        {
            href: '/profilez',
            icon: FaUsersBetweenLines,
            title: 'Thêm lớp học',
            description: '',
        },
    ];
    const handleClick = (e, link, idx) => {
        e.preventDefault();
        e.stopPropagation();
        if (link.elements) {
            setOpenSub(openSub === idx ? null : idx);
        } else if (link.href) {
            window.location.assign(link.href);
        }
    };
    return (
        <Menu as="div" className={styles.MenuDropdown}>
            <Menu.Button className={styles.MenuDropdown__button}>
                {label} <CgMenuGridO className={styles.MenuDropdown__icon} />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Menu.Items className={styles.MenuDropdown__items}>
                    <button
                        type="button"
                        onClick={() => setShowLeftSide(!showLeftSide)}
                        className={styles.MenuDropdown__headerBtn}
                    >
                        <FaAngleDown
                            size={17}
                            className={`${styles.MenuDropdown__arrow} ${showLeftSide ? styles.rotate : ''}`}
                        />
                    </button>
                    <div
                        className={`${styles.MenuDropdown__leftSide} ${
                            showLeftSide ? styles.showLeftSide : styles.hideLeftSide
                        }`}
                    >
                        <div className={styles.MenuDropdown__header}>
                            <p className={styles.MenuDropdown__headerTitle}>Thêm nhanh</p>
                            <div className={styles.MenuDropdown__headerSearch}>
                                <input
                                    type="text"
                                    className={styles.MenuDropdown__headerInput}
                                    placeholder="Tìm kiếm..."
                                />
                                <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 
                  16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 
                  0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 
                  19l-4.99-5zm-6 0C7.01 14 5 11.99 5 
                  9.5S7.01 5 9.5 5 14 7.01 14 9.5 
                  11.99 14 9.5 14z"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        <div className={styles.MenuDropdown__main}>
                            {LeftSideLinks.map((link, idx) => (
                                <Menu.Item key={link.href || idx}>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            onClick={(e) => handleClick(e, link, idx)}
                                            className={`${styles.MenuDropdown__item} ${active ? styles.active : ''}`}
                                        >
                                            <div className={styles.MenuDropdown__iconItem}>
                                                {link.icon && <link.icon className={styles.MenuDropdown__iconLink} />}
                                            </div>
                                            <div className={styles.MenuDropdown__content}>
                                                <p className={styles.MenuDropdown__title}>{link.title}</p>
                                                {link.description && (
                                                    <p className={styles.MenuDropdown__desc}>{link.description}</p>
                                                )}
                                            </div>
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </div>
                    <div className={styles.MenuDropdown__rightSide}>
                        <div className={styles.MenuDropdown__header}>
                            <p className={styles.MenuDropdown__headerTitle}>Menu</p>
                            <div className={styles.MenuDropdown__headerSearch}>
                                <input
                                    type="text"
                                    className={styles.MenuDropdown__headerInput}
                                    placeholder="Tìm kiếm..."
                                />
                                <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 
                  16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 
                  0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 
                  19l-4.99-5zm-6 0C7.01 14 5 11.99 5 
                  9.5S7.01 5 9.5 5 14 7.01 14 9.5 
                  11.99 14 9.5 14z"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        <div className={styles.MenuDropdown__main}>
                            {links.map((link, idx) => (
                                <Menu.Item key={link.href || idx}>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            onClick={(e) => handleClick(e, link, idx)}
                                            className={`${styles.MenuDropdown__item} ${active ? styles.active : ''}`}
                                        >
                                            <div className={styles.MenuDropdown__iconItem}>
                                                {link.icon && (
                                                    <img
                                                        src={link.icon}
                                                        className={styles.MenuDropdown__iconLink}
                                                        alt={link.title}
                                                    />
                                                )}
                                            </div>
                                            <div className={styles.MenuDropdown__content}>
                                                <p className={styles.MenuDropdown__title}>{link.title}</p>
                                                {link.description && (
                                                    <p className={styles.MenuDropdown__desc}>{link.description}</p>
                                                )}
                                            </div>
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default MenuDropdown;
