import style from './Groups.module.scss'
import className from 'classnames/bind'
import Header from '~/layouts/component/Header/Header'
import SideBar from '~/layouts/component/Sidebar/Sidebar'
import TabBar from '~/layouts/component/TabBar'
import {useState} from 'react'
const cx = className.bind(style);

function Groups (){
    const [activeTab, setActiveTab] = useState(0);
        // Dữ liệu tabs có thể thay đổi
        const tabs = [
            { id: 0, label: 'Bài viết' },
            { id: 1, label: 'Giới thiệu' },
            { id: 2, label: 'File phương tiện' },
        ];
    return(
        <>
         <Header />
            
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('tab-bar')}>
                    <TabBar tabs = {tabs}
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                />
                </div>
            </div>
        </>
    )
}
export default Groups;