import React, { useState, useEffect } from 'react';
import style from './DropdownAdmin.module.scss'
import className from 'classnames/bind'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import PropTypes from 'prop-types';
const cx = className.bind(style);

function Dropdown({ 
    button, 
    items, 
    className,
    menuClassName,
    position = 'bottom-end',
    width = 'medium',
    onOpenChange  // Callback khi dropdown open/close
}) {
    const [openSubmenu, setOpenSubmenu] = useState(null);

    return (
        <Menu as="div" className={cx('dropdown-wrapper', className)}>
            {({ open }) => {
                // Gọi callback khi trạng thái thay đổi
                // Sử dụng setTimeout để tránh update state trong render
                if (onOpenChange) {
                    setTimeout(() => onOpenChange(open), 0);
                }

                return (
                    <>
                        {/* Button trigger */}
                        <MenuButton as="div" className={cx('dropdown-button')}>
                            {button}
                        </MenuButton>

                        {/* Dropdown Menu */}
                        <MenuItems 
                            anchor={position}
                            className={cx('dropdown-menu', `width-${width}`, menuClassName)}
                        >
                            {items.map((item, index) => {
                                // Nếu là divider
                                if (item.divider) {
                                    return <div key={`divider-${index}`} className={cx('dropdown-divider')} />;
                                }

                                // Nếu là header
                                if (item.header) {
                                    console.log(item.justify);
                                    
                                    return (
                                        <div
                                         key={`header-${index}`}
                                         
                                          style={{ justifyContent: item.justify || 'center' }} id={`header${index}`} className={cx('dropdown-header')} >
                                            {item.header}
                                        </div>
                                    );
                                }
                                // Nếu có submenu
                                if (item.submenu && item.submenu.length > 0) {
                                    const isOpen = openSubmenu === item.id;
                                    
                                    return (
                                        <div key={item.id || index} className={cx('submenu-container')} id={`submenu-${item.id}`}>
                                            <MenuItem >
                                                {({ focus }) => (
                                                    <button 
                                                        className={cx('dropdown-item', { 
                                                            focused: focus,
                                                            'has-submenu': true,
                                                            'submenu-open': isOpen
                                                        })}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setOpenSubmenu(isOpen ? null : item.id);
                                                        }}
                                                    >
                                                        {item.icon && <div className={cx('item-icon')}>{item.icon}</div>}
                                                        <div className={cx('item-content')}>
                                                            {item.title && <div className={cx('item-title')}>{item.title}</div>}
                                                            {item.description && (
                                                                <div className={cx('item-description')}>{item.description}</div>
                                                            )}
                                                        </div>
                                                        {item.rightIcon && (
                                                            <div className={cx('item-right-icon', { 'rotated': isOpen })}>
                                                                {item.rightIcon}
                                                            </div>
                                                        )}
                                                    </button>
                                                )}
                                            </MenuItem>

                                            {isOpen && (
                                                <div className={cx('submenu-items', `width-${width}`)}>
                                                    {item.submenu.map((subitem, subindex) => {
                                                        if (subitem.divider) {
                                                            return <div key={`sub-divider-${subindex}`} className={cx('dropdown-divider')} />;
                                                        }

                                                        return (
                                                            <button
                                                                key={subitem.id || subindex}
                                                                className={cx('dropdown-item', 'submenu-item', { 
                                                                    'has-description': subitem.description 
                                                                })}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    subitem.onClick?.();
                                                                    setOpenSubmenu(null);
                                                                }}
                                                            >
                                                                {subitem.icon && <div className={cx('item-icon')}>{subitem.icon}</div>}
                                                                <div className={cx('item-content')}>
                                                                    {subitem.title && <div className={cx('item-title')}>{subitem.title}</div>}
                                                                    {subitem.description && (
                                                                        <div className={cx('item-description')}>{subitem.description}</div>
                                                                    )}
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                            
                                        </div>
                                    );
                                }

                                // Nếu item bị disabled
                                if (item.disabled) {
                                    return (
                                        <div key={item.id || index} className={cx('dropdown-item', 'disabled')}>
                                            {item.icon && <div className={cx('item-icon')}>{item.icon}</div>}
                                            <div className={cx('item-content')}>
                                                {item.title && <div className={cx('item-title')}>{item.title}</div>}
                                                {item.description && (
                                                    <div className={cx('item-description')}>{item.description}</div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }

                                // Item thường
                                return (
                                    <MenuItem key={item.id || index}>
                                        {({ focus }) => (
                                            <button
                                                className={cx('dropdown-item', { 
                                                    focused: focus,
                                                    'has-description': item.description 
                                                })}
                                                onClick={item.onClick}
                                            >
                                                {item.icon && <div className={cx('item-icon')}>{item.icon}</div>}
                                                <div className={cx('item-content')}>
                                                    {item.title && <div className={cx('item-title')}>{item.title}</div>}
                                                    {item.description && (
                                                        <div className={cx('item-description')}>{item.description}</div>
                                                    )}
                                                </div>
                                                {item.badge && <div className={cx('item-badge')}>{item.badge}</div>}
                                                {item.rightIcon && <div className={cx('item-right-icon')}>{item.rightIcon}</div>}
                                            </button>
                                        )}
                                    </MenuItem>
                                );
                            })}
                        </MenuItems>
                    </>
                );
            }}
        </Menu>
    );
}

Dropdown.propTypes = {
    button: PropTypes.node.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            icon: PropTypes.node,
            title: PropTypes.string,
            description: PropTypes.string,
            onClick: PropTypes.func,
            disabled: PropTypes.bool,
            divider: PropTypes.bool,
            header: PropTypes.node,
            badge: PropTypes.node,
            rightIcon: PropTypes.node,
        })
    ).isRequired,
    className: PropTypes.string,
    menuClassName: PropTypes.string,
    position: PropTypes.oneOf([
        'bottom-start', 'bottom', 'bottom-end',
        'top-start', 'top', 'top-end',
        'left-start', 'left', 'left-end',
        'right-start', 'right', 'right-end'
    ]),
    width: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    onOpenChange: PropTypes.func
};

export default Dropdown;