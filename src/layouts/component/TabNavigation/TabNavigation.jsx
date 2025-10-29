import style from './TabNavigation.module.scss';
import ClassName from 'classnames/bind';
import { useState } from 'react';
import Post from '~/layouts/component/Post';
import TabContentCard from '../TabContentCard';
import TabBar from '~/layouts/component/TabBar'
const cx = ClassName.bind(style);

const TabNavigation = () => {
    const [activeTab, setActiveTab] = useState(0);
    // Dữ liệu tabs có thể thay đổi
    const tabs = [
        { id: 0, label: 'Bài viết' },
        { id: 1, label: 'Giới thiệu' },
        { id: 2, label: 'File phương tiện' },
    ];

    const mediaItems = [];
    const mediaItemsData = [{ id: 1 }, { id: 2 }];
    return (
        <div className={cx('container')}>
            {/* Thanh tabs */}
            {/* <div className={cx('tabsWrapper')}>
                <div className={cx('tabsHeader')}>
                    <div className={cx('tabsList')}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
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
            </div> */}
            <TabBar tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            {/* Nội dung tab */}
            <div className={cx('tabContent')}>
                {activeTab === 0 && (
                    <div className={cx('wrapper-tabContent')}>
                        <Post margin />

                        <div className={cx('contentCard')}>
                            <TabContentCard
                                activeTab={1}
                                type="introduction"
                                title="Giới thiệu"
                                infoItems={[
                                    { icon: 'gift', value: '2020-01-01' },
                                    { icon: 'phone', value: '0914779655' },
                                ]}
                            />
                            <TabContentCard
                                activeTab={1}
                                type="filemedia"
                                title="File phương tiện"
                                mediaItems={mediaItemsData}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 1 && (
                    <div className={cx('tab-introduction')}>
                        <div className={cx('tab-introduction__wrapper')}>
                            <div className={cx('tab-introductionw__inner')}>
                                <TabContentCard
                                    style={{ margin: '15px 0px' }}
                                    activeTab={1}
                                    customCard
                                    type="introduction"
                                    title="Giới thiệu"
                                    infoItems={[
                                        { icon: 'gift', value: '2020-01-01' },
                                        { icon: 'phone', value: '0914779655' },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className={cx('media')}>
                            <TabContentCard
                                activeTab={1}
                                type="filemedia"
                                title="File phương tiện"
                                mediaItems={mediaItemsData}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 2 && (
                    <div className={cx('tab-filemedia')}>
                        <div className={cx('wrapper')}>
                            <div className={cx('inner')}>
                                <TabContentCard
                                    customCard
                                    activeTab={1}
                                    type="filemedia"
                                    title="File phương tiện"
                                    mediaItems={mediaItems}
                                />
                            </div>
                        </div>

                        <div className={cx('introduction')}>
                            <TabContentCard
                                style={{ margin: '15px 0px' }}
                                activeTab={1}
                                type="introduction"
                                title="Giới thiệu"
                                infoItems={[
                                    { icon: 'gift', value: '2020-01-01' },
                                    { icon: 'phone', value: '0914779655' },
                                ]}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabNavigation;
