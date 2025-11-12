import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaFacebookMessenger } from 'react-icons/fa6';
import styles from './Dropdown.module.scss';
import { FaAngleDown } from 'react-icons/fa6';
function MessageDropdown({ label = 'More', links = [] }) {
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
        <Menu as="div" className={styles.MessageDropdown}>
            <Menu.Button className={styles.MessageDropdown__button}>
                {label} <FaFacebookMessenger className={styles.MessageDropdown__icon} />
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
                <Menu.Items className={styles.MessageDropdown__items}>
                    <div className={styles.MessageDropdown__main}>
                        {links.map((link, idx) => (
                            <Menu.Item key={link.href || idx}>
                                {({ active }) => (
                                    <button
                                        type="button"
                                        onClick={(e) => handleClick(e, link, idx)}
                                        className={`${styles.MessageDropdown__item} ${active ? styles.active : ''}`}
                                    >
                                        <div className={styles.MessageDropdown__iconItem}>
                                            {link.icon && <img src={link.icon} className={styles.MessageDropdown__iconLink} />}
                                        </div>
                                        <div className={styles.MessageDropdown__content}>
                                            <p className={styles.MessageDropdown__title}>{link.title}</p>
                                            {link.description && (
                                                <p className={styles.MessageDropdown__desc}>{link.description}</p>
                                            )}
                                        </div>
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default MessageDropdown;
