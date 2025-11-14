import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import 'antd/dist/reset.css';
import { Modal, Tag, Divider } from 'antd';
import styles from './StudentMarketplace.module.scss';
import { IoSearchSharp, IoTime } from 'react-icons/io5';
import { LuListFilter } from 'react-icons/lu';
import { PiWarningCircleFill } from 'react-icons/pi';
import { FaCircleCheck, FaStar } from 'react-icons/fa6';
import { FaCheckSquare } from 'react-icons/fa';
function StudentMarketplace() {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleQuickView = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        filterCourses();
    }, [searchQuery, courseData]);

    const API_BASE = 'https://localhost:7069/';
    const fetchCourses = async () => {
        try {
            const response = await fetch(API_BASE + 'api/Course');
            const data = await response.json();
            setCourseData(data);
            setFilteredCourses(data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };
    const filterCourses = () => {
        if (!searchQuery.trim()) {
            setFilteredCourses(courseData);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = courseData.filter((course) => {
            return (
                course.courseCode?.toLowerCase().includes(query) ||
                course.courseName?.toLowerCase().includes(query) ||
                course.level?.toString().includes(query)
            );
        });
        setFilteredCourses(filtered);
    };

    const handleCardClick = (courseId) => {
        navigate(`/student/space/course/${courseId}`);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    console.log('Fetched classes:', courseData);
    return (
        <div className={styles.StudentMarketplace}>
            <div className={styles.StudentMarketplace__main}>
                <div className={styles.StudentMarketplace__header}>
                    <div className={styles.StudentMarketplace__headerContainer}>
                        <div className={styles.StudentMarketplace__headerSearch}>
                            <input
                                type="text"
                                className={styles.StudentMarketplace__headerSearchInput}
                                placeholder="Tìm kiếm khóa học"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <IoSearchSharp className={styles.StudentMarketplace__headerSearchInputIcon} />
                        </div>
                        <div className={styles.StudentMarketplace__headerFilter}>
                            <LuListFilter />
                        </div>
                    </div>
                </div>
                <div className={styles.StudentMarketplace__body}>
                    <div className={styles.StudentMarketplace__cardItems}>
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((courseItem) => (
                                <div
                                    className={styles.StudentMarketplace__cardItem}
                                    key={courseItem.courseId}
                                    onClick={() => handleCardClick(courseItem.courseId)}
                                >
                                    <div className={styles.StudentMarketplace__cardItemImg}>
                                        <img src={courseItem.avatarLink} alt="" />
                                        <div className={styles.StudentMarketplace__cardItemBuy}>
                                            <button
                                                className={styles.StudentMarketplace__cardItemDetailView}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleQuickView(courseItem);
                                                }}
                                            >
                                                Xem nhanh
                                            </button>
                                            <button
                                                className={styles.StudentMarketplace__cardItemBuyNow}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate('/student/space/checkout', {
                                                        state: { courseData: courseItem },
                                                    });
                                                }}
                                            >
                                                Mua ngay
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.StudentMarketplace__cardItemContent}>
                                        <div className={styles.StudentMarketplace__cardItemLeft}>
                                            <div className={styles.StudentMarketplace__cardItemTitleAndDescription}>
                                                <p className={styles.StudentMarketplace__cardItemTitle}>
                                                    {courseItem.courseCode} - {courseItem.courseName}
                                                </p>
                                            </div>
                                            <div className={styles.StudentMarketplace__cardItemTitleSupplement}>
                                                <p className={styles.StudentMarketplace__cardItemLevel}>
                                                    <PiWarningCircleFill
                                                        className={styles.StudentMarketplace__cardItemLevelIcon}
                                                    />
                                                    Level {courseItem.level}
                                                </p>
                                                <p className={styles.StudentMarketplace__cardItemTime}>
                                                    <IoTime className={styles.StudentMarketplace__cardItemTimeIcon} />
                                                    {courseItem.numberSessions} buổi học
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.StudentMarketplace__cardItemRight}>
                                            <p className={styles.StudentMarketplace__cardItemPrice}>
                                                {courseItem.tutitionFee} VNĐ
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.StudentMarketplace__noResults}>
                                <p>Không tìm thấy khóa học nào phù hợp với "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                title="Thông tin khóa học"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
                styles={{
                    header: { fontSize: 24 },
                    body: { fontSize: 16 },
                }}
            >
                {selectedCourse && (
                    <div style={{ lineHeight: '1.8' }}>
                        <h3 style={{ marginBottom: 8, fontSize: 16 }}>
                            {selectedCourse.courseCode} - {selectedCourse.courseName}
                        </h3>
                        <div className={styles.StudentMarketplace__feedbackRightSide}>
                            <span>5.0</span>
                            <div className={styles.StudentMarketplace__starGroupRightSide}>
                                <FaStar className={styles.StudentMarketplace__starIcon} />
                                <FaStar className={styles.StudentMarketplace__starIcon} />
                                <FaStar className={styles.StudentMarketplace__starIcon} />
                                <FaStar className={styles.StudentMarketplace__starIcon} />
                                <FaStar className={styles.StudentMarketplace__starIcon} />
                            </div>
                        </div>
                        <div className={styles.StudentMarketplace__contentBodyLeftSide1}>
                            <p className={styles.StudentMarketplace__contentBodyTitle}>Mô tả khóa học</p>
                            <p>{selectedCourse.description}</p>
                        </div>
                        <div className={styles.StudentMarketplace__contentBodyLeftSide1}>
                            <ul className={styles.StudentMarketplace__contentBodyTitle}>Dịch vụ</ul>
                            <li>
                                <FaCircleCheck className={styles.icon} /> Hỗ trợ học viên 24/7
                            </li>
                            <li>
                                <FaCircleCheck className={styles.icon} /> Hỗ trợ tài liệu học tập
                            </li>
                            <li>
                                <FaCircleCheck className={styles.icon} /> Các kênh hỗ trợ học tập
                            </li>
                            <li>
                                <FaCircleCheck className={styles.icon} /> Chương trình kiểm tra năng lực thường xuyên
                            </li>
                        </div>
                        <div>
                            <p
                                className={`${styles.StudentMarketplace__contentBodyLeftSide1} ${styles.StudentMarketplace__contentBodyTitle}`}
                            >
                                Level: {selectedCourse.level}
                            </p>
                            <p
                                className={`${styles.StudentMarketplace__contentBodyLeftSide1} ${styles.StudentMarketplace__contentBodyTitle}`}
                            >
                                Số buổi học: {selectedCourse.numberSessions} buổi
                            </p>
                            <p
                                className={`${styles.StudentMarketplace__contentBodyLeftSide1} ${styles.StudentMarketplace__contentBodyTitle}`}
                            >
                                Học phí: <Tag color="blue"> {selectedCourse.tutitionFee} VNĐ</Tag>
                            </p>
                        </div>
                    </div>
                )}
            </Modal>
            ;
        </div>
    );
}
export default StudentMarketplace;
