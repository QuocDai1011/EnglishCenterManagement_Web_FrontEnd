import CreateBlog from '../CreateBlog';
import { FaLock } from 'react-icons/fa';
import styles from './StudentClassItem.module.scss';
import FullCalendar from '../FullCalendarItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StudentClassMember from '../StudentClassMember';
import { IoImagesSharp } from 'react-icons/io5';
function StudentClassItem() {
    const [handleAction, setHandleAction] = useState(1);
    const idClass = useParams().id;
    const [classData, setClassData] = useState({});
    useEffect(() => {
        fetchClass();
    }, []);

    const fetchClass = async () => {
        try {
            const response = await fetch('https://localhost:7069/api/Class/' + idClass);
            const data = await response.json();
            setClassData(data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };
    console.log('Fetched class:', classData);
    return (
        <div className={styles.StudentClassItem}>
            <div className={styles.StudentClassItem__main}>
                <div className={styles.StudentClassItem__header}>
                    <div className={styles.StudentClassItem__headerImage}>
                        <img src="/images/StudentClassItem-background.jpg" alt="Class WE3" />
                    </div>
                    <div className={styles.StudentClassItem__headerContainer}>
                        <div className={styles.StudentClassItem__headerTitle}>
                            <h2>{classData.className}</h2>
                            <div className={styles.StudentClassItem__headerSupplement}>
                                <div className={styles.StudentClassItem__headerSupplementIcon}>
                                    <FaLock />
                                </div>
                                <p>Nhóm riêng tư</p>
                            </div>
                        </div>
                        <div className={styles.StudentClassItem__headerActions}>
                            <button
                                className={handleAction === 1 ? styles.active : ''}
                                onClick={() => setHandleAction(1)}
                            >
                                Thảo luận
                            </button>
                            <button
                                className={handleAction === 2 ? styles.active : ''}
                                onClick={() => setHandleAction(2)}
                            >
                                Bài tập về nhà
                            </button>
                            <button
                                className={handleAction === 3 ? styles.active : ''}
                                onClick={() => setHandleAction(3)}
                            >
                                Thành viên
                            </button>
                            <button
                                className={handleAction === 4 ? styles.active : ''}
                                onClick={() => setHandleAction(4)}
                            >
                                Lịch học
                            </button>
                            <button
                                className={handleAction === 5 ? styles.active : ''}
                                onClick={() => setHandleAction(5)}
                            >
                                File phương tiện
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.StudentClassItem__body}>
                    {handleAction === 1 && (
                        <div className={styles.StudentClassItem__blogs}>
                            <CreateBlog />
                        </div>
                    )}
                    {handleAction === 2 && (
                        <div className={styles.StudentClassItem__homework}>
                            <img src="/images/Content-nodata.png" alt="Không có bài tập nào" />
                        </div>
                    )}
                    {handleAction === 3 && (
                        <div className={styles.StudentClassItem__members}>
                            <StudentClassMember classId={idClass} />
                        </div>
                    )}
                    {handleAction === 4 && (
                        <div className={styles.StudentClassItem__calendar}>
                            <FullCalendar />
                        </div>
                    )}
                    {handleAction === 5 && (
                        <div className={styles.StudentClassItem__files}>
                            <h2>File phương tiện</h2>
                            <div className={styles.StudentClassItem__noFile}>
                                <IoImagesSharp className={styles.StudentClassItem__filesIcon} />
                                <h2>Không có ảnh/video</h2>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentClassItem;
