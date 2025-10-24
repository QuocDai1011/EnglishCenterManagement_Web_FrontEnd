import styles from './Student.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Student() {
    return <h1 className={cx('heading')}>This is Student Page</h1>;
}

export default Student;
