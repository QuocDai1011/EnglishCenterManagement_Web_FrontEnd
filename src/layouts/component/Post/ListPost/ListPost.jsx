import style from './ListPost.module.scss'
import ClassName from 'classnames/bind'

const cx = ClassName.bind(style)

function ListPost() {

    return (
        <>
            <div className={cx('section-banner')}>
                <img src='/images/EmptyData.414b4c87.png' alt='No-image' />
            </div>
        </>
    )

}

export default ListPost;