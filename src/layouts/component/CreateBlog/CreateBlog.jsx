import styles from './CreateBlog.module.scss';
import { IoMdImages } from 'react-icons/io';
import PostDialog from '../DiaLog/PostDialog';
import { useState } from 'react';
function CreateBlog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.CreateBlog}>
            <div className={styles.CreateBlog__createBlog}>
                <div className={styles.CreateBlog__btnCreate}>
                    <div className={styles.CreateBlog__img}>
                        <img src="/images/avatarStudent.jpg" alt="Ảnh đại diện của " />
                    </div>
                    <button onClick={() => setIsOpen(true)} className={styles.CreateBlog__btn}>Tạo bài viết</button>
                </div>
                <div className={styles.CreateBlog__contentDescription}>
                    <button className="flex gap-2" onClick={() => setIsOpen(true)}>
                    <IoMdImages size={22} className={styles.CreateBlog__icon} />
                    <span>Ảnh/video</span>

                    </button>
                </div>
            </div>
            <div className={styles.CreateBlog__previewBlog}>
                <img src="/images/CreateBlog-nodata.png" alt="" />
            </div>
            {isOpen && (
            <PostDialog open={isOpen} onClose={ () => setIsOpen(false)}/>
            )}
        </div>
        
    );
}

export default CreateBlog;
