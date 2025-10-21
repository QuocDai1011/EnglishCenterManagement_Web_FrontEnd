import styles from './Admin.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Admin() {
    return ( <h1 className={cx('heading')}>This is Admin page.</h1> );
}

export default Admin;