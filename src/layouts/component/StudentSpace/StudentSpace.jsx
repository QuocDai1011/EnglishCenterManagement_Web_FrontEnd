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

                {/* <div className={styles.StudentSpace__subSide}>
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
                </div> */}

                <StudentChatBot />

                <div className={styles.StudentSpace__rightBar}>
                    <div className={styles.StudentSpace__rightBarInner}>
                        <div className={styles.StudentSpace__scrollBar}>

                            <div className={styles.StudentSpace__birthdayToday}>
                                <p>Sinh nhật hôm nay</p>
                                <img src='/images/birthday.dbd23cbf.svg' alt='birthday' />
                                <p className={styles.StudentSpace__label}>No one</p>
                            </div>

                            <div className={styles.StudentSpace__upcomingBirthday}>
                                <p>Sinh nhật sắp tới</p>
                                <div className={styles.StudentSpace__birthdayInMonth}></div>
                                <p className={styles.StudentSpace__label}>Không có sinh nhật trong tuần tới</p>
                            </div>

                            <div className={styles.StudentSpace__socialMedia}>
                                <p>Mạng xã hội</p>
                                <div className={styles.StudentSpace__socialMediaBody}></div>
                            </div>

                            <div className={styles.StudentSpace__events}>
                                <p>Sự kiện</p>
                                <div className={styles.StudentSpace__eventsBody}></div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default StudentSpace;
