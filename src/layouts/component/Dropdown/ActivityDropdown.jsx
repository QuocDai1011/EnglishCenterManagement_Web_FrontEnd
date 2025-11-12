import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import styles from './Dropdown.module.scss';
import { BsPlusLg } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa6';

function ActivityDropdown({ label = 'Activity', links = [] }) {
    const [openSub, setOpenSub] = useState(null);

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
        <Menu as="div" className={styles.ActivityDropdown}>
            <Menu.Button className={styles.ActivityDropdown__button}>
                {label} <BsPlusLg className={styles.ActivityDropdown__icon} />
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
                <Menu.Items className={styles.ActivityDropdown__items}>
                    {links.map((link, idx) => (
                        <div key={link.href || idx}>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        type="button"
                                        onClick={(e) => handleClick(e, link, idx)}
                                        className={`${styles.ActivityDropdown__item} ${active ? styles.active : ''}`}
                                    >
                                        <div className={styles.ActivityDropdown__iconItem}>
                                            {link.icon && <link.icon className={styles.ActivityDropdown__iconLink} />}
                                        </div>
                                        <div className={styles.ActivityDropdown__content}>
                                            <p className={styles.ActivityDropdown__title}>{link.title}</p>
                                            {link.description && (
                                                <p className={styles.ActivityDropdown__desc}>{link.description}</p>
                                            )}
                                        </div>

                                        {link.elements && (
                                            <span
                                                className={`${styles.ActivityDropdown__caret} ${
                                                    openSub === idx ? styles.open : ''
                                                }`}
                                            >
                                                <FaAngleDown size={16} />
                                            </span>
                                        )}
                                    </button>
                                )}
                            </Menu.Item>

                            {link.elements && openSub === idx && (
                                <div className={styles.ActivityDropdown__SubItems}>
                                    {link.elements.map((sub) => (
                                        <a
                                            key={sub.href}
                                            href={sub.href}
                                            onClick={(e) => e.stopPropagation()}
                                            className={styles.ActivityDropdown__SubItem}
                                        >
                                            <div className={styles.ActivityDropdown__iconSubItem}>
                                                <sub.icon className={styles.ActivityDropdown__iconSubLink} />
                                            </div>
                                            <div className={styles.ActivityDropdown__SubItemContent}>
                                                <p className={styles.ActivityDropdown__SubItemTitle}>{sub.title}</p>
                                                {sub.description && (
                                                    <p className={styles.ActivityDropdown__SubItemDesc}>
                                                        {sub.description}
                                                    </p>
                                                )}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default ActivityDropdown;
