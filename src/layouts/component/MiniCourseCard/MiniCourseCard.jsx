import styles from './MiniCourseCard.module.scss';

function MiniCourseCard({ courseData }) {
    return (
        <div className={styles.MiniCourseCard}>
            <div className={styles.MiniCourseCard__main}>
                <div className={styles.MiniCourseCard__img}>
                    <img src={courseData.avatarLink || '/images/defaultBanner3.jpg'} alt="" />
                </div>
                <div className={styles.MiniCourseCard__info}>
                    <h3>{courseData.courseName}</h3>
                    <p>Level: {courseData.level}</p>
                    <p>Học phí: {courseData.tuitionFee} VNĐ</p>
                </div>
            </div>
        </div>
    );
}

export default MiniCourseCard;
