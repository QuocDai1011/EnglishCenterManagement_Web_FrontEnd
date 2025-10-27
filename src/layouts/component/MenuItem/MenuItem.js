import { Link } from 'react-router-dom'
import className from 'classnames/bind'
import styles from './MenuItem.module.scss'

const cx = className.bind(styles)

const MenuItem = ({ image, label, link, isActive = false, onClick }) => {


    const MenuItemWrapper = link ? Link : 'div';
    const wrapperProps = link ? { to: link } : {};

    return (
        <MenuItemWrapper className={cx('menu-item', { 'menu-item__active': isActive })} onClick={onClick} {...wrapperProps}>
            <div className={cx('menu-item__wrap')}>
                <div className={cx('menu-item__icon')}>

                    <div className={cx('icon-wrap')}>
                        <img src={image} alt={label} className={cx('menu-item__image')} />

                    </div>

                </div>
                <span className={cx('menu-item__label')}>{label}</span>
            </div>
        </MenuItemWrapper>
    );
}

export default MenuItem
