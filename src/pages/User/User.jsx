import style from './User.module.scss';
import ClassName from 'classnames/bind';
import Header from '~/layouts/component/Header'
import SideBar from '~/layouts/component/Sidebar'
import Post from '~/layouts/component/Post'
const cx = ClassName.bind(style)

function User(){

    return (
        <>
        
            <Header/>
            <div className={cx('container')}>
                <SideBar/>

                 <div className={cx('main')}>
                    {/* cover photo and avatar  */}
                        
                    {/* tab navigation  */}

                        {/* section main  */}
                        <Post /> 

                    {/*right bar contact*/}
                 </div>
            </div>
        </>
    )

}

export default User;