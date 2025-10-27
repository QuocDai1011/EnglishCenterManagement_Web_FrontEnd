import CreatePost from './CreatePost/CreatePost';
import ListPost from './ListPost/ListPost';
import style from './Post.module.scss';
import ClassName from 'classnames/bind';

const cx = ClassName.bind(style)

function Post() {
    return (
        <>
            <div className={cx('section-main')}>
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