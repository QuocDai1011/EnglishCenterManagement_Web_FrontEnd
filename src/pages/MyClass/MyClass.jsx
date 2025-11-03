import { useState, useEffect } from 'react';
import ClassName from 'classnames/bind';
import style from './MyClass.module.scss';
import SideBar from '~/layouts/component/Sidebar';
import MyClassService from '~/api/MyClassService';
import ClassDetailDialog from '~/layouts/component/Popup/DetailDiaLog/ClassDetailDialog';
import UpdateClassDiaLog from '~/layouts/component/Popup/UpdateDiaLog/UpdateClassDiaLog';
import { Users, MapPin, Loader2, AlertCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { CiCircleCheck } from 'react-icons/ci';
import { IoCloseCircleOutline } from 'react-icons/io5';

const cx = ClassName.bind(style);

function MyClass() {
    const [MyClass, setMyClass] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await MyClassService.getAll();
            setMyClass(res);
            setLoading(false);
            setError(null);
        } catch (e) {
            setError(e.message);
            setLoading(false);
            console.error('Error' + e);
        }
    };

    // Handler functions
    const handleViewDetail = (classData) => {
        console.log('Xem chi tiết lớp:', classData);
        setSelectedClass(classData);
        setIsOpenDetail(true);
    };

    const handleViewUpdate = (classData) => {
        console.log('Cập nhật lớp học:', classData);
        setSelectedClass(classData);
        setIsOpenUpdate(true);
    };

    const handleSave = async (updatedClass) => {
        console.log('Updated class:', updatedClass);
        fetchData();
    };

    const SortClasses = MyClass.sort((a,b) => new Date(b.startDate) - new Date(a.startDate));
    const cardColors = ['bg-blue-100', 'bg-pink-100', 'bg-red-100', 'bg-orange-100', 'bg-purple-100', 'bg-green-100'];

    // Format ngày tháng
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date
            .toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })
            .replace(/\//g, '-');
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <SideBar />

            <div className={cx('min-h-scree p-6', 'main')}>
                <div className="max-w-[116rem] w-[93%] mx-auto mt-28">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="items-center gap-3">
                            <h1 className="text-[3.2rem] font-bold text-gray-800">Danh sách lớp học</h1>
                        
                        </div>

                        {/* Nút refresh */}
                        <button
                            onClick={fetchData}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            Làm mới
                        </button>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-yellow-800 font-medium">Không thể kết nối đến server</p>
                                <p className="text-yellow-700 text-xl mt-1">Lỗi: {error}</p>
                            </div>
                        </div>
                    )}

                    {/* Grid các lớp học */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SortClasses.map((cls, index) => (
                            <div
                                key={cls.classId}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Hình ảnh header */}
                                <div
                                    className={`${
                                        cardColors[index % cardColors.length]
                                    } h-24 flex items-center justify-center p-5 relative`}
                                >
                                    <div className="absolute top-4 left-4">
                                        {cls.status ? (
                                            <CiCircleCheck size={30} className="text-green-600" />
                                        ) : (
                                            <IoCloseCircleOutline size={30} className="text-red-600" />
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{cls.classCode}</h3>
                                        <p className="text-xl text-black-600">{formatDate(cls.startDate)}</p>
                                    </div>
                                </div>

                                {/* Nội dung */}
                                <div className="p-6">
                                    <h4 className="text-[1.6rem] font-semibold text-gray-800 mb-4 line-clamp-2 min-h-[3.5rem]">
                                        {cls.className}
                                    </h4>

                                    <div className="space-y-3 mb-4">
                                        {/* Địa điểm */}
                                        <div className="flex items-start gap-2 text-sm text-gray-600">
                                            <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                            <span className="line-clamp-1 text-xl ">TRUNG TÂM NGOẠI NGỮ TRE...</span>
                                        </div>

                                        {/* Số học viên */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl text-gray-600">Học viên:</span>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-6 h-6 text-gray-600" />
                                                <span className="font-semibold text-black text-xl">
                                                    {cls.currentStudent}/{cls.maxStudent}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => handleViewDetail(cls)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                                            title="Xem chi tiết"
                                        >
                                            <Eye size={18} />
                                            <span className="text-xl font-medium">Chi tiết</span>
                                        </button>

                                        <button
                                            onClick={() => handleViewUpdate(cls)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200"
                                            title="Chỉnh sửa"
                                        >
                                            <Edit size={18} />
                                            <span className="text-xl font-medium">Sửa</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Thông báo nếu không có lớp */}
                    {MyClass.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-2xl">Không có lớp học đang hoạt động</p>
                        </div>
                    )}
                <div className="mt-12 flex w-[50%] justify-around items-center">
                    <p className="text-3xl">Ghi chú: </p>
                    <div className="flex gap-4 items-center">
                        <CiCircleCheck size={30} className="text-green-600"/>
                    <p className="text-green-600">Lớp học đang diễn ra</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <IoCloseCircleOutline size={30} className="text-red-600"/>
                    <p className="text-red-600">Lớp học đã kết thúc</p>
                    </div>
                </div>
                </div>
            </div>
            <ClassDetailDialog open={isOpenDetail} onClose={() => setIsOpenDetail(false)} classData={selectedClass} />
            <UpdateClassDiaLog
                open={isOpenUpdate}
                onClose={() => setIsOpenUpdate(false)}
                classData={selectedClass}
                onSave={handleSave}
            />
        </div>
    );
}

export default MyClass;
