import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import Header from '~/layouts/component/Header/Header'
import SideBar from '~/layouts/component/Sidebar/Sidebar'
import Post from '~/layouts/component/Post/Post';

const cx = classNames.bind(styles);

function Admin() {

    

    return (
        <>
            <Header />
            <div className={cx('container')}>
                <SideBar />

                <div className={cx('main')}>
                    {/* section main */}
                    <Post />
                    {/* right bar */}
                    <div className={cx('right-bar')}>
                        <div className={cx('right-bar__inner')}>
                            <div className={cx('scroll-bar')}>
                                <div className={cx('birthday-today')}>
                                    <p>Sinh nhật hôm nay</p>
                                    <img src='/images/birthday.dbd23cbf.svg' alt='birthday' />
                                    <p className={cx('label')}>No one</p>
                                </div>

                                <div className={cx('upcoming-birthday')}>
                                    <p>Sinh nhật sắp tới</p>
                                    <div className={cx('birthday-in-month')}></div>
                                    <p className={cx('label')}>Không có sinh nhật trong tuần tới</p>
                                </div>

                                <div className={cx('social-media')}>
                                    <p>Mạng xã hội</p>
                                    <div className={cx('social-media__body')}></div>
                                </div>

                                <div className={cx('events')}>
                                    <p>Sự kiện</p>
                                    <div className={cx('events-body')}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;