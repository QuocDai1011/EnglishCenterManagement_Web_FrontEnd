import styles from './CreateBlog.module.scss';
import { IoMdImages } from 'react-icons/io';
function CreateBlog() {
    return (
        <div className={styles.CreateBlog}>
            <div className={styles.CreateBlog__createBlog}>
                <div className={styles.CreateBlog__btnCreate}>
                    <div className={styles.CreateBlog__img}>
                        <img src="/images/avatarStudent.jpg" alt="Ảnh đại diện của " />
                    </div>
                    <button className={styles.CreateBlog__btn}>Tạo bài viết</button>
                </div>
                <div className={styles.CreateBlog__contentDescription}>
                    <IoMdImages size={22} className={styles.CreateBlog__icon} />
                    <span>Ảnh/video</span>
                </div>
            </div>
            <div className={styles.CreateBlog__previewBlog}>
                <img src="/images/CreateBlog-nodata.png" alt="" />
            </div>
        </div>
    );
}

export default CreateBlog;
