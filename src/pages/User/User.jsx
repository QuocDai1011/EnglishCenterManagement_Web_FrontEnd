import style from './User.module.scss';
import ClassName from 'classnames/bind';
import Header from '~/layouts/component/HeaderAdmin'
import SideBar from '~/layouts/component/Sidebar'
import Post from '~/layouts/component/Post'
import ProfileCard from '~/layouts/component/ProfileCard';
import TabNavigation from '~/layouts/component/TabNavigation'
const cx = ClassName.bind(style)

function User() {


    return (
        <>

            <Header />
            
            <div className={cx('container')}>
                <SideBar />

                <div className={cx('main')}>
                    {/* cover photo and avatar  */}
                    <div className={cx("profile-card")}>
                        <div className={cx('profile-card__inner')}> 
                            <ProfileCard 
                            coverImage="/images/sach.jpg"
                            avatarImage="/images/logo2019_png_1.png"
                            name="Quản Lý"
                            editable={true}
                        />
                        </div>
                    </div>
                    {/* tab navigation  */}
                        <TabNavigation />
                    {/* section main  */}
                    {/* <Post /> */}

                    {/*right bar contact*/}
                </div>
            </div>
        </>
    )

}

export default User;