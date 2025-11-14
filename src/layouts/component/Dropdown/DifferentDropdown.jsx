import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaCaretDown } from 'react-icons/fa6';
import styles from './Dropdown.module.scss';
import { FaSignOutAlt } from "react-icons/fa";
function DifferentDropdown({ label = 'More', links = [] }) {
    const [openSub, setOpenSub] = useState(null);
    const [selectedSubItems, setSelectedSubItems] = useState(() => {
        const defaults = {};
        links.forEach((link, idx) => {
            if (link.elements && link.elements.length > 0) {
                defaults[idx] = link.elements[0];
            }
        });
        return defaults;
    });

    const handleClick = (e, link, idx) => {
        e.preventDefault();
        e.stopPropagation();
        if (link.elements) {
            setOpenSub(openSub === idx ? null : idx);
        } else if (link.href) {
            window.location.assign(link.href);
        }
    };

    const handleSubItemSelect = (e, sub, parentIdx) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedSubItems((prev) => ({
            ...prev,
            [parentIdx]: sub,
        }));
        setOpenSub(null);
    };

    return (
        <Menu as="div" className={styles.DifferentDropdown}>
            <Menu.Button type="button" className={styles.DifferentDropdown__button}>
                {label} <FaCaretDown className={styles.DifferentDropdown__icon} />
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
                <Menu.Items className={styles.DifferentDropdown__items}>
                    <button className={styles.DifferentDropdown__user}>
                        <img
                            className={styles.DifferentDropdown__userImg}
                            src="/images/avatarStudent.jpg"
                            alt="English Center Header Logo"
                        />
                        <p className={styles.DifferentDropdown__userName}>Quốc Đại</p>
                    </button>

                    <hr />

                    {links.map((link, idx) => {
                        const selectedSub = selectedSubItems[idx];
                        return (
                            <div key={link.href || idx}>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            onClick={(e) => handleClick(e, link, idx)}
                                            className={`${styles.DifferentDropdown__item} ${
                                                active ? styles.active : ''
                                            }`}
                                        >
                                            <div className={styles.DifferentDropdown__iconItem}>
                                                {selectedSub && typeof selectedSub.icon === 'string' ? (
                                                    <img
                                                        src={selectedSub.icon}
                                                        alt={selectedSub.title}
                                                        className={styles.DifferentDropdown__iconLink}
                                                    />
                                                ) : link.icon && typeof link.icon === 'string' ? (
                                                    <img
                                                        src={link.icon}
                                                        alt={link.title}
                                                        className={styles.DifferentDropdown__iconLink}
                                                    />
                                                ) : link.icon ? (
                                                    <link.icon className={styles.DifferentDropdown__iconLink} />
                                                ) : null}
                                            </div>

                                            <div className={styles.DifferentDropdown__content}>
                                                <p className={styles.DifferentDropdown__title}>
                                                    {selectedSub ? selectedSub.title : link.title}
                                                </p>
                                                {(selectedSub?.description || link.description) && (
                                                    <p className={styles.DifferentDropdown__desc}>
                                                        {selectedSub?.description || link.description}
                                                    </p>
                                                )}
                                            </div>

                                            {link.elements && (
                                                <span
                                                    className={`${styles.DifferentDropdown__caret} ${
                                                        openSub === idx ? styles.open : ''
                                                    }`}
                                                >
                                                    <FaCaretDown size={16} />
                                                </span>
                                            )}
                                        </button>
                                    )}
                                </Menu.Item>

                                {link.elements && openSub === idx && (
                                    <div className={styles.DifferentDropdown__SubItems}>
                                        {link.elements.map((sub) => {
                                            const isSelected = openSub === idx && selectedSub?.href === sub.href;
                                            return (
                                                <button
                                                    key={sub.href}
                                                    onClick={(e) => handleSubItemSelect(e, sub, idx)}
                                                    className={`${styles.DifferentDropdown__SubItem} ${
                                                        isSelected ? styles.selected : ''
                                                    }`}
                                                >
                                                    <div className={styles.DifferentDropdown__iconSubItem}>
                                                        <img
                                                            src={sub.icon}
                                                            alt={sub.title}
                                                            className={styles.DifferentDropdown__iconSubLink}
                                                        />
                                                    </div>
                                                    <div className={styles.DifferentDropdown__SubItemContent}>
                                                        <p className={styles.DifferentDropdown__SubItemTitle}>
                                                            {sub.title}
                                                        </p>
                                                        {sub.description && (
                                                            <p className={styles.DifferentDropdown__SubItemDesc}>
                                                                {sub.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <hr />

                    <button className={styles.DifferentDropdown__item + ' ' + styles.DifferentDropdown__logout}>
                        <div className={styles.DifferentDropdown__iconItem}>
                            <FaSignOutAlt className={styles.DifferentDropdown__iconLink} />
                        </div>
                        <p className={styles.DifferentDropdown__title}>Đăng xuất</p>
                    </button>

                    <div className={styles.DifferentDropdown__footer}>
                        <span>Phiên bản: 7.10.15</span>
                        <span>
                            <a href="#">Chính sách sản phẩm</a> · <a href="#">Điều khoản dịch vụ</a>
                        </span>
                        <span>Copyright © EMSO Việt Nam, JSC.</span>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default DifferentDropdown;
