import CreatePost from './CreatePost/CreatePost';
import ListPost from './ListPost/ListPost';
import style from './Post.module.scss';
import ClassName from 'classnames/bind';

const cx = ClassName.bind(style)

function Post({margin}) {
    return (
        <>
            <div className={cx('section-main')} style={margin ? {margin: 0, width: '70%', maxWidth: '735px'} : undefined}>
                <div className={cx('main-inner')}>
                    {/* component Post */}
                        <CreatePost />
                        <ListPost />
                </div>
            </div>

        </>
    )
}

export default Post;