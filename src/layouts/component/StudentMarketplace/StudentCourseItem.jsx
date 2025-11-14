import React, { useEffect, useState } from 'react';
import styles from './StudentCourseItem.module.scss';
import { FaStar } from 'react-icons/fa6';
import { LuTimer, LuWallet } from 'react-icons/lu';
import { useParams, useNavigate } from 'react-router-dom';
import MiniCourseCard from '../MiniCourseCard';
function StudentCourseItem() {
    const [courseData, setCourseData] = useState({});
    const [coursesData, setCoursesData] = useState([]);
    const { id: idCourse } = useParams();
    const navigate = useNavigate();
    const API_BASE = 'https://localhost:7069/';

    useEffect(() => {
        const fetchCourses = async () => {
            if (!idCourse) {
                console.error('Course ID is missing from URL params');
                return;
            }

            try {
                console.log('Fetching course with ID:', idCourse);
                const response = await fetch(`${API_BASE}api/Course/${idCourse}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched course data:', data);
                setCourseData(data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        const fetchAllCourses = async () => {
            if (!idCourse) {
                console.error('Course ID is missing from URL params');
                return;
            }

            try {
                const response = await fetch(`${API_BASE}api/Course`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setCoursesData(data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourses();
        fetchAllCourses();
    }, [idCourse, courseData]);

    console.log('Current course ID from params:', idCourse);
    return (
        <div className={styles.StudentCourseItem}>
            <div className={styles.StudentCourseItem__main}>
                <div className={styles.StudentCourseItem__leftSide}>
                    <div className={styles.StudentCourseItem__headerLeftSide}>
                        <div className={styles.StudentCourseItem__headerLeftSideImg}>
                            <img src={courseData.avatarLink} alt="" />
                        </div>
                        <h2>{courseData.courseName}</h2>
                        <div className={styles.StudentCourseItem__headerActions}>
                            <button className={styles.StudentCourseItem__headerActionButton}>Mô tả khóa học</button>
                            <button className={styles.StudentCourseItem__headerActionButton}>Bình luận</button>
                            <button className={styles.StudentCourseItem__headerActionButton}>Đánh giá</button>
                        </div>
                    </div>
                    <div className={styles.StudentCourseItem__bodyLeftSide}>
                        <div className={styles.StudentCourseItem__bodyLeftSide1}>
                            <div className={styles.StudentCourseItem__contentBodyLeftSide1}>
                                {/* <p className={styles.StudentCourseItem__contentBodyTitle}>Mô tả khóa học</p> */}
                                <p>{courseData.description}</p>
                            </div>
                            <div className={styles.StudentCourseItem__contentBodyLeftSide1}>
                                <ul className={styles.StudentCourseItem__contentBodyTitle}>Dịch vụ</ul>
                                <li>Hỗ trợ học viên 24/7</li>
                                <li>Hỗ trợ tài liệu học tập</li>
                                <li>Các kênh hỗ trợ học tập</li>
                                <li>Chương trình kiểm tra năng lực thường xuyên</li>
                            </div>
                            <div className={styles.StudentCourseItem__contentBodyLeftSide1}>
                                <p className={styles.StudentCourseItem__contentBodyTitle}>
                                    Số buổi học: <span>{courseData.numberSessions}</span>
                                </p>
                                <p className={styles.StudentCourseItem__contentBodyTitle}>
                                    Kết quả học tập: <span>{courseData.level}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.StudentCourseItem__rightSide}>
                    <div className={styles.StudentCourseItem__rightSideItem}>
                        <div className={styles.StudentCourseItem__headerRightSide}>
                            <div className={styles.StudentCourseItem__titleRightSide}>
                                <h3>Tổng quan khóa học</h3>
                                <div className={styles.StudentCourseItem__feedbackRightSide}>
                                    <span>5.0</span>
                                    <div className={styles.StudentCourseItem__starGroupRightSide}>
                                        <FaStar className={styles.StudentCourseItem__starIcon} />
                                        <FaStar className={styles.StudentCourseItem__starIcon} />
                                        <FaStar className={styles.StudentCourseItem__starIcon} />
                                        <FaStar className={styles.StudentCourseItem__starIcon} />
                                        <FaStar className={styles.StudentCourseItem__starIcon} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.StudentCourseItem__contentRightSide}>
                            <span className={styles.StudentCourseItem__contentBodyTitle}>
                                <LuWallet />
                                Học phí: <span>{courseData.tutitionFee} VNĐ</span>
                            </span>
                            <p>
                                <span className={styles.StudentCourseItem__contentBodyTitle}>
                                    <LuTimer /> Hạn đăng ký: <span>{courseData.createAt}</span>
                                </span>
                                <span className={styles.StudentCourseItem__contentBodyTitle}>
                                    <LuWallet /> Ngày bế giảng: <span>30/06/2026</span>
                                </span>
                            </p>
                        </div>
                        <div className={styles.StudentCourseItem__bodyRightSide}>
                            <button className={styles.StudentCourseItem__bodyRightSideButton}>Đặt lịch tư vấn</button>
                            <button
                                className={styles.StudentCourseItem__bodyRightSideButton}
                                onClick={() => {
                                    navigate('/student/space/checkout', { state: { courseData } });
                                }}
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                    <div
                        className={
                            styles.StudentCourseItem__rightSideItem + ' ' + styles.StudentCourseItem__rightSideItem2
                        }
                    >
                        {coursesData.length > 0 &&
                            coursesData.map((courseItem) => (
                                <MiniCourseCard key={courseItem.courseId} courseData={courseItem} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default StudentCourseItem;
