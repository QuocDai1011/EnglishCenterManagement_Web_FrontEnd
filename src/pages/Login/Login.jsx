import styles from './Login.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Login() {
    return <h1 className={cx('heading')}>This is Login page.</h1>;
}

export default Login;
