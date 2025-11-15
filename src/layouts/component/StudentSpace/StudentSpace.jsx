import CreateBlog from '../CreateBlog';
import StudentChatBot from '../StudentChatBot';
import styles from './StudentSpace.module.scss';

function StudentSpace() {
    return (
        <div className={styles.StudentSpace}>
            <div className={styles.StudentSpace__main}>
                <div className={styles.StudentSpace__mainSide}>
                    <CreateBlog />
                </div>
                <div className={styles.StudentSpace__subSide}>
                    {/* Các thành phần phụ khác có thể được thêm vào đây */}
                    <div className={styles.StudentSpace__subSideItems}>
                        <div className={styles.StudentSpace__title}>
                            <p>Mạng xã hội</p>
                        </div>
                    </div>
                    <div className={styles.StudentSpace__subSideItems}>
                        <div className={styles.StudentSpace__title}>
                            <p>Sự kiện</p>
                        </div>
                    </div>
                </div>
                <StudentChatBot />
            </div>
        </div>
    );
}
export default StudentSpace;
