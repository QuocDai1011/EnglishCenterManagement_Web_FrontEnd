import React from 'react';
import { useAuth } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';

// Định nghĩa component Button đơn giản ngay trong file để đảm bảo tính tự chạy
const Button = ({ children, ...props }) => (
    <button
        {...props}
        className={
            'px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 disabled:opacity-50 ' +
            props.className
        }
    >
        {children}
    </button>
);

const Home = () => {
    // 1. Lấy hàm logout và thông tin user từ AuthContext
    const { user, logout } = useAuth();
    // 2. Lấy hook navigate để có thể chuyển hướng thủ công nếu cần
    const navigate = useNavigate();

    // 3. Định nghĩa hàm xử lý đăng xuất
    const handleLogout = async () => {
        try {
            // Hàm logout sẽ gửi yêu cầu API đến endpoint /api/Auth/logout
            // và xóa thông tin người dùng khỏi state/cookie.
            await logout();

            // Thông báo đã được hiển thị trong useAuth.
            console.log('Đã đăng xuất thành công.');

            // Tùy chọn: Chuyển hướng về trang đăng nhập ngay lập tức.
            navigate('/login');
        } catch (error) {
            console.error('Đăng xuất thất bại:', error);
            // useAuth() đã hiển thị thông báo lỗi (toast)
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full text-center">
                <h1 className="text-3xl font-extrabold mb-2 text-gray-800">Trang Chủ Hệ Thống</h1>
                <p className="text-xl font-semibold mb-6 text-indigo-700">
                    Chào mừng, {user ? user.username : 'Khách'}!
                </p>
                <p className="mb-10 text-gray-600">
                    Bạn đã đăng nhập thành công vào hệ thống. Nhấn nút dưới đây để kết thúc phiên làm việc.
                </p>

                <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200">
                    Đăng xuất
                </Button>
            </div>
        </div>
    );
};

export default Home;
