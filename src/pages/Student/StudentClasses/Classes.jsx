import React, { useEffect, useState } from 'react';
import styles from './Classes.module.scss';
import { FaUsersBetweenLines, FaLocationDot } from 'react-icons/fa6';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Classes() {
    const navigate = useNavigate();
    const [classesData, setClassesData] = useState([]);
    //Set userId ở cookie
    const idStudent = 1;
    useEffect(() => {
        fetchClasses();
    }, []);

    const API_BASE = 'https://localhost:7069/';
    const fetchClasses = async () => {
        try {
            const response = await fetch(API_BASE + 'api/Student/get-classes/' + idStudent);
            const data = await response.json();
            const activeAndPaidClasses = data.classes.filter((classItem) => classItem.status === true);
            setClassesData(activeAndPaidClasses);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };
    console.log('Fetched classes:', classesData);
    return (
        <div className={styles.Classes}>
            <div className={styles.Classes__main}>
                <div className={styles.Classes__header}>
                    <div className={styles.Classes__headerContainer}>
                        <div className={styles.Classes__headerIcon}>
                            <FaUsersBetweenLines className={styles.Classes__headerIconSvg} />
                        </div>
                        <p className={styles.Classes__headerTitle}>Lớp học của tôi</p>
                    </div>
                </div>
                <div className={styles.Classes__body}>
                    <div className={styles.Classes__items}>
                        {classesData.map((classItem) => (
                            <div
                                className={styles.Classes__item}
                                key={classItem.classItemId}
                                onClick={() => navigate(`/student/space/classes/${classItem.classId}`)}
                            >
                                <div className={styles.Classes__containerItem}>
                                    <div className={styles.Classes__itemImage}>
                                        <img src="/images/defaultBanner3.jpg" alt="Class WE3" />
                                    </div>
                                    <div className={styles.Classes__contentContainer}>
                                        <p className={styles.Classes__contentTitle}>{classItem.className}</p>
                                        <p className={styles.Classes__contentDescription}>{classItem.createAt}</p>
                                    </div>
                                </div>
                                <div className={styles.Classes__itemSupplement}>
                                    <div className={styles.Classes__supplementCenter}>
                                        <FaLocationDot className={styles.Classes__supplementIcon} />
                                        <span>TRUNG TÂM NGOẠI NGỮ TRE XANH</span>
                                    </div>
                                    <div className={styles.Classes__supplementClass}>
                                        <HiOutlineUserGroup className={styles.Classes__supplementIcon} />
                                        <span>{classItem.currentStudent}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Classes;
