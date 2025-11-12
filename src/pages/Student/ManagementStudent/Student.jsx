import styles from './Student.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef, useCallback } from 'react';
import SideBar from '~/layouts/component/Sidebar';
import {
    Search,
    UserCircle,
    Mail,
    Phone,
    MapPin,
    Calendar,
    User,
    Eye,
    Edit,
    Delete,
    RotateCcw,
    CircleQuestionMark,
} from 'lucide-react';
import StudentDetailForm from '~/layouts/component/DiaLog/StudentDetail/StudentDetailForm';
import UpdateForm from '~/layouts/component/DiaLog/StudentUpdate/UpdateStudentDiaLog';
import StudentService from '~/api/StudentService';
import Swal from 'sweetalert2';
import { Header } from '~/layouts/component';
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
            filterGender === 'all'
                ? student.isActive // Chỉ hiển thị sinh viên đang hoạt động
                : filterGender === 'deleted'
                ? !student.isActive // Hiển thị sinh viên đã xóa
                : filterGender === 'male'
                ? student.gender && student.isActive
                : filterGender === 'female'
                ? !student.gender && student.isActive
                : false;

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
            }, 500);
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

        if (observerTarget.current) observer.observe(observerTarget.current);

        return () => {
            if (observerTarget.current) observer.unobserve(observerTarget.current);
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

    // State cho dialog
    const [dialogDetailOpen, setDialogDetailOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [dialogUpdateOpen, setDialogUpdateOpen] = useState(false);

    // Handler để mở dialog chi tiết
    const handleViewDetail = (student) => {
        setSelectedStudent(student);
        setDialogDetailOpen(true);
    };

    const handleViewUpdate = (student) => {
        setSelectedStudent(student);
        setDialogUpdateOpen(true);
    };

    // Handler để đóng dialog
    const handleCloseDialog = () => {
        setDialogUpdateOpen(false);
        setDialogDetailOpen(false);
        setSelectedStudent(null);
    };

    const handleSave = (selectedStudent) => {
        console.log(selectedStudent);
        fetchStudents();
    };

    // Xóa mềm sinh viên (deactivate)
    const handleSoftDelete = async (studentId) => {
        Swal.fire({
            icon: 'warning',
            title: 'Cảnh báo!',
            text: 'Bạn có chắc muốn xóa mục này?',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            customClass: {
                title: 'text-3xl font-bold',
                htmlContainer: 'text-xl text-gray-700',
                confirmButton: 'text-xl px-4 py-2 ',
                cancelButton: 'text-xl px-4 py-2',
            },
        }).then(async (res) => {
            if (res.isDismissed) {
                return;
            }
            try {
                await StudentService.deactivate(studentId);
                Swal.fire({
                    icon: 'success',
                    title: 'Đã xóa thành công!',
                    timer: 1000,
                    showConfirmButton: false,
                });
                fetchStudents();
            } catch (error) {
                console.error('Error soft deleting student:', error);
                const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi xóa sinh viên!';
                Swal.fire({
                    icon: 'error',
                    title: errorMsg,
                    timer: 1000,
                    showConfirmButton: false,
                });
            }
        });
    };

    // Khôi phục sinh viên (activate)
    const handleRestore = async (studentId) => {
        Swal.fire({
            icon: 'question',
            title: 'Thông báo!',
            text: 'Bạn có chắc muốn khôi phục học viên này không?',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            customClass: {
                title: 'text-3xl font-bold',
                htmlContainer: 'text-xl text-gray-700',
                confirmButton: 'text-xl px-4 py-2 ',
                cancelButton: 'text-xl px-4 py-2',
            },
        }).then(async (res) => {
            if (res.isDismissed) return;
            try {
                await StudentService.activate(studentId);
                Swal.fire({
                    icon: 'success',
                    title: 'Khôi phục sinh viên thành công!',
                    timer: 1000,
                    showConfirmButton: false,
                });
                fetchStudents();
            } catch (error) {
                console.error('Error restoring student:', error);
                const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi khôi phục sinh viên!';
                Swal.fire({
                    icon: 'error',
                    title: errorMsg,
                    timer: 1000,
                    showConfirmButton: false,
                });
            }
        });
    };

    // Xóa vĩnh viễn sinh viên
    const handlePermanentDelete = async (studentId) => {
        Swal.fire({
            icon: 'warning',
            title: 'Cảnh báo!',
            text: 'Bạn có chắc chắn muốn xóa VĨNH VIỄN sinh viên này? Hành động này không thể hoàn tác!',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            customClass: {
                title: 'text-3xl font-bold',
                htmlContainer: 'text-xl text-gray-700',
                confirmButton: 'text-xl px-4 py-2 ',
                cancelButton: 'text-xl px-4 py-2',
            },
        }).then(async (res) => {
            if (res.isDismissed) return;
            try {
                await StudentService.delete(studentId);
                Swal.fire({
                    icon: 'success',
                    title: 'Xóa vĩnh viễn sinh viên thành công!',
                    timer: 1000,
                    showConfirmButton: false,
                });
                fetchStudents();
            } catch (error) {
                console.error('Error permanently deleting student:', error);
                const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi xóa vĩnh viễn sinh viên!';
                Swal.fire({
                    icon: 'error',
                    title: errorMsg,
                    timer: 1000,
                    showConfirmButton: false,
                });
            }
        });
    };

    if (loading) {
        return (
            <div className={cx('loadingContainer')}>
                <div className={cx('loadingWrapper')}>
                    <div className={cx('spinner')} />
                    <p className={cx('loadingText')}>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cx('container')}>
            {/* <Header /> */}
            <SideBar />

            <div className={cx('content')}>
                {/* Header */}
                <div className={cx('heading')}>
                    <h1 className={cx('headingTitle', 'flex justify-center')}>Danh sách sinh viên</h1>
                    <p className={cx('headingSubtitle', 'flex justify-center')}>
                        Quản lý và theo dõi thông tin {filteredStudents.length} sinh viên
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className={cx('filterBar')}>
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

                    <div className={cx('Filter')}>
                        <span className={cx('Label')}>Lọc:</span>
                        {['all', 'male', 'female', 'deleted'].map((gender) => (
                            <button
                                key={gender}
                                onClick={() => setFilterGender(gender)}
                                className={cx('Button', { active: filterGender === gender })}
                            >
                                {gender === 'all'
                                    ? 'Tất cả'
                                    : gender === 'male'
                                    ? 'Nam'
                                    : gender === 'female'
                                    ? 'Nữ'
                                    : 'Đã xóa'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Students Grid */}
                {filteredStudents.length === 0 ? (
                    <div className={cx('emptyState')}>
                        <UserCircle className={cx('emptyIcon')} />
                        <h3 className={cx('emptyTitle')}>Không tìm thấy sinh viên</h3>
                        <p className={cx('emptyText')}>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                    </div>
                ) : (
                    <>
                        <div className={cx('studentsGrid', 'pb-20')}>
                            {displayedFilteredStudents.map((student) => (
                                <div key={student.studentId} className={cx('studentCard')}>
                                    <div
                                        className={cx('statusBadge', {
                                            active: student.isActive,
                                            inactive: !student.isActive,
                                        })}
                                    >
                                        {student.isActive ? 'Đang học' : 'Đã xóa'}
                                    </div>

                                    <div className={cx('studentHeader')}>
                                        <div
                                            className={cx('avatar', {
                                                male: student.gender,
                                                female: !student.gender,
                                            })}
                                        >
                                            <User />
                                        </div>
                                        <div className={cx('studentInfo')}>
                                            <h3 className={cx('studentName')}>{student.fullName}</h3>
                                            <p className={cx('studentUsername')}>
                                                <span className={cx('usernameBadge')}>@{student.userName}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className={cx('infoList')}>
                                        <div className={cx('infoItem')}>
                                            <Mail />
                                            <span>{student.email}</span>
                                        </div>
                                        <div className={cx('infoItem')}>
                                            <Phone />
                                            <span>{student.phoneNumber}</span>
                                        </div>
                                        <div className={cx('infoItem')}>
                                            <MapPin />
                                            <span>{student.address}</span>
                                        </div>
                                        <div className={cx('infoItem')}>
                                            <Calendar />
                                            <span>{formatDate(student.dateOfBirth)}</span>
                                        </div>
                                    </div>

                                    <div className={cx('actionButtons')}>
                                        {student.isActive ? (
                                            // Nút cho sinh viên đang hoạt động
                                            <>
                                                <button
                                                    className={cx('actionButton', 'view')}
                                                    onClick={() => handleViewDetail(student)}
                                                >
                                                    <Eye /> Chi tiết
                                                </button>
                                                <button
                                                    className={cx('actionButton', 'edit')}
                                                    onClick={() => handleViewUpdate(student)}
                                                >
                                                    <Edit /> Sửa
                                                </button>
                                                <button
                                                    className={cx('actionButton', 'delete')}
                                                    onClick={() => handleSoftDelete(student.studentId)}
                                                >
                                                    <Delete /> Xóa
                                                </button>
                                            </>
                                        ) : (
                                            // Nút cho sinh viên đã bị xóa
                                            <>
                                                <button
                                                    className={cx('actionButton', 'view')}
                                                    onClick={() => handleViewDetail(student)}
                                                >
                                                    <Eye /> Chi tiết
                                                </button>
                                                <button
                                                    className={cx('actionButton', 'edit')}
                                                    onClick={() => handleRestore(student.studentId)}
                                                >
                                                    <RotateCcw /> Khôi phục
                                                </button>
                                                <button
                                                    className={cx('actionButton', 'delete')}
                                                    onClick={() => handlePermanentDelete(student.studentId)}
                                                >
                                                    <Delete /> Xóa vĩnh viễn
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {displayedFilteredStudents.length < filteredStudents.length && (
                            <div ref={observerTarget} className={cx('loadingMore')}>
                                <div className={cx('spinner')} />
                                <p>Đang tải thêm...</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Student Detail Dialog */}
            <StudentDetailForm open={dialogDetailOpen} onClose={handleCloseDialog} student={selectedStudent} />

            <UpdateForm
                open={dialogUpdateOpen}
                onClose={handleCloseDialog}
                student={selectedStudent}
                onSave={handleSave}
            />

        </div>
    );
}

export default Student;
