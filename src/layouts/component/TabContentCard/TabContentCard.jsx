import style from './TabContentCard.module.scss';
import className from 'classnames/bind';
import { FaGift, FaPhone } from 'react-icons/fa';
import { BsImageAlt } from 'react-icons/bs';

const cx = className.bind(style);

const IconMap = {
    gift: FaGift,
    phone: FaPhone,
};

const TabContentCard = ({ title, infoItems, type, customCard, mediaItems }) => {
    return (
        <div className={cx('container')}>
            {type === 'introduction' && (
                <div className={cx('card', { customCard })}>
                    <h2 className={cx('cardTitle')}>{title}</h2>
                    {infoItems && infoItems.length > 0 && (
                        <div className={cx('infoList')}>
                            {infoItems.map((item, index) => {
                                const IconComponent = IconMap[item.icon];
                                return (
                                    <ul key={index} className={cx('infoItem')}>
                                        <li>
                                            <IconComponent className={cx('icon')} />
                                            <span className={cx('infoText')}>{item.value}</span>
                                        </li>
                                    </ul>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {type === 'filemedia' && (
                <div className={cx('filemedia-card', { customCard })}>
                    <h2 className={cx('cardTitle')}>{title}</h2>

                    {mediaItems && mediaItems.length === 0 && (
                        <div className={cx('no-data')}>
                            <div className={cx('wrapper')}>
                                <div className={cx('wrap-icon')}>
                                    <span>
                                        <BsImageAlt className={cx('icon')} size={100} />
                                    </span>
                                </div>
                                <div className={cx('title')}>
                                    <h2>Không có ảnh/video nào</h2>
                                </div>
                            </div>
                        </div>
                    )}

                    {mediaItems && mediaItems.length > 0 && (
                        <div className={cx('wrap-content')}>
                            <ul className={cx('list-item')}>{/* render danh sách media ở đây */}</ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TabContentCard;
