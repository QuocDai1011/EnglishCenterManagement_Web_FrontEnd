import styles from './Student.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SideBar from '~/layouts/component/Sidebar';
import { Search, UserCircle, Mail, Phone, MapPin, Calendar, User, Eye, Edit } from 'lucide-react';

const cx = classNames.bind(styles);

function Student() {
    const [students, setStudents] = useState([]);
    const [displayedStudents, setDisplayedStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGender, setFilterGender] = useState('all');
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const ITEMS_PER_PAGE = 12;

    const observerTarget = useRef(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://localhost:7069/api/Student');
            const data = await response.json();
            setStudents(data);
            setDisplayedStudents(data.slice(0, ITEMS_PER_PAGE));
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.userName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGender =
            filterGender === 'all' ||
            (filterGender === 'male' && student.gender) ||
            (filterGender === 'female' && !student.gender);
        return matchesSearch && matchesGender;
    });

    const displayedFilteredStudents = filteredStudents.slice(0, displayedStudents.length);

    const loadMore = useCallback(() => {
        const currentLength = displayedStudents.length;
        const hasMore = currentLength < filteredStudents.length;

        if (hasMore && !loadingMore) {
            setLoadingMore(true);

            setTimeout(() => {
                const nextLength = Math.min(currentLength + ITEMS_PER_PAGE, filteredStudents.length);
                setDisplayedStudents(filteredStudents.slice(0, nextLength));
                setLoadingMore(false);
            }, 500); // Simulate loading delay
        }
    }, [displayedStudents.length, filteredStudents, loadingMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && !loadingMore) {
                    loadMore();
                }
            },
            { threshold: 0.1 },
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [loadMore, loading, loadingMore]);

    useEffect(() => {
        setDisplayedStudents(filteredStudents.slice(0, ITEMS_PER_PAGE));
    }, [searchTerm, filterGender]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.2,
            },
        },
    };

    const loadingVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
            },
        },
    };

    if (loading) {
        return (
            <motion.div
                className={cx('loadingContainer')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className={cx('loadingWrapper')}>
                    <motion.div className={cx('spinner')} variants={loadingVariants} animate="animate" />
                    <motion.p
                        className={cx('loadingText')}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Đang tải dữ liệu...
                    </motion.p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className={cx('container')} style={{ width: '83%', margin: '0 auto' }}>
            <SideBar />

            <div className={cx('content')}>
                {/* Header */}
                <motion.div
                    className={cx('heading')}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className={cx('headingTitle')}>Danh sách sinh viên</h1>
                    <p className={cx('headingSubtitle')}>
                        Quản lý và theo dõi thông tin {filteredStudents.length} sinh viên
                    </p>
                </motion.div>

                {/* Search and Filter Bar */}
                <motion.div
                    className={cx('filterBar')}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className={cx('searchWrapper')}>
                        <Search className={cx('searchIcon')} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email, username..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={cx('searchInput')}
                        />
                    </div>

                    <div className={cx('genderFilter')}>
                        <span className={cx('genderLabel')}>Giới tính:</span>
                        {['all', 'male', 'female'].map((gender, index) => (
                            <motion.button
                                key={gender}
                                onClick={() => setFilterGender(gender)}
                                className={cx('genderButton', { active: filterGender === gender })}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                {gender === 'all' ? 'Tất cả' : gender === 'male' ? 'Nam' : 'Nữ'}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Students Grid */}
                <AnimatePresence mode="wait">
                    {filteredStudents.length === 0 ? (
                        <motion.div
                            className={cx('emptyState')}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <UserCircle className={cx('emptyIcon')} />
                            <h3 className={cx('emptyTitle')}>Không tìm thấy sinh viên</h3>
                            <p className={cx('emptyText')}>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                        </motion.div>
                    ) : (
                        <>
                            <motion.div
                                className={cx('studentsGrid')}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <AnimatePresence>
                                    {displayedFilteredStudents.map((student, index) => (
                                        <motion.div
                                            key={student.studentId}
                                            className={cx('studentCard')}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            layout
                                            whileHover={{
                                                y: -8,
                                                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                                                transition: { duration: 0.3 },
                                            }}
                                        >
                                            {/* Status Badge */}
                                            <motion.div
                                                className={cx('statusBadge', {
                                                    active: student.isActive,
                                                    inactive: !student.isActive,
                                                })}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: index * 0.05, type: 'spring' }}
                                            >
                                                {student.isActive ? 'Đang học' : 'Nghỉ học'}
                                            </motion.div>

                                            {/* Avatar and Name */}
                                            <div className={cx('studentHeader')}>
                                                <motion.div
                                                    className={cx('avatar', {
                                                        male: student.gender,
                                                        female: !student.gender,
                                                    })}
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <User />
                                                </motion.div>
                                                <div className={cx('studentInfo')}>
                                                    <h3 className={cx('studentName')}>{student.fullName}</h3>
                                                    <p className={cx('studentUsername')}>
                                                        <span className={cx('usernameBadge')}>@{student.userName}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Info Items */}
                                            <div className={cx('infoList')}>
                                                <motion.div className={cx('infoItem')} whileHover={{ x: 5 }}>
                                                    <Mail />
                                                    <span>{student.email}</span>
                                                </motion.div>

                                                <motion.div className={cx('infoItem')} whileHover={{ x: 5 }}>
                                                    <Phone />
                                                    <span>{student.phoneNumber}</span>
                                                </motion.div>

                                                <motion.div className={cx('infoItem')} whileHover={{ x: 5 }}>
                                                    <MapPin />
                                                    <span>{student.address}</span>
                                                </motion.div>

                                                <motion.div className={cx('infoItem')} whileHover={{ x: 5 }}>
                                                    <Calendar />
                                                    <span>{formatDate(student.dateOfBirth)}</span>
                                                </motion.div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className={cx('actionButtons')}>
                                                <motion.button
                                                    className={cx('actionButton', 'view')}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Eye />
                                                    Chi tiết
                                                </motion.button>

                                                <motion.button
                                                    className={cx('actionButton', 'edit')}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Edit />
                                                    Sửa
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>

                            {/* Observer target & Loading more indicator */}
                            {displayedFilteredStudents.length < filteredStudents.length && (
                                <motion.div
                                    ref={observerTarget}
                                    className={cx('loadingMore')}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <motion.div
                                        className={cx('spinner')}
                                        variants={loadingVariants}
                                        animate="animate"
                                    />
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Đang tải thêm...
                                    </motion.p>
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Student;
