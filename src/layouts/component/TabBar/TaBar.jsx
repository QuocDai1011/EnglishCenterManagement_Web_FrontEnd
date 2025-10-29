import style from './TabBar.module.scss';
import ClassName from 'classnames/bind';
import { FaEllipsisH } from 'react-icons/fa';

const cx = ClassName.bind(style);

function TabBar({ tabs, activeTab, onTabChange }) {
    return (
        <div className={cx('tabsWrapper')}>
            <div className={cx('tabsHeader')}>
                <div className={cx('tabsList')}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cx('tabButton', activeTab === tab.id && 'active')}
                        >
                            {tab.label}
                            {activeTab === tab.id && <div className={cx('tabIndicator')} />}
                        </button>
                    ))}
                </div>

                <button className={cx('menuButton')}>
                    <FaEllipsisH size={24} className={cx('menuIcon')} />
                </button>
            </div>
        </div>
    );
}
export default TabBar;