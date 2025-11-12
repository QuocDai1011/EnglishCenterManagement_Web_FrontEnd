import LinkItem from '../LinkItem';
import styles from './NavbarStudent.module.scss';
import {
    FaHome,
    FaUser,
    FaBook,
    FaClipboard,
    FaBell,
    FaCog,
    FaQuestion,
    FaQuestionCircle,
    FaEnvelope,
    FaFileContract,
    FaUserShield,
    FaSignOutAlt,
    FaComment,
    FaLifeRing,
    FaBookOpen,
    FaUsers,
} from 'react-icons/fa';
function NavbarStudent() {
    return (
        <nav className={styles.NavbarStudent}>
            <LinkItem to="/student/space/user" icon="/images/avatarStudent.jpg" label="Quốc Đại" />
            <LinkItem
                to="/student/space/groups/ce30773d-3ea7-4024-b4de-d6be9fe02cfb"
                icon="/images/TuongNhaTruongStudent.png"
                label="Tường nhà trường"
            />
            <LinkItem to="/student/space/marketplace" icon="/images/MarketPlaceStudent.png" label="Marketplace" />
            <LinkItem to="/student/space/groups" icon="/images/GroupStudent.png" label="Nhóm" />
            <LinkItem to="/student/space/events" icon="/images/SuKienStudent.png" label="Sự kiện" />
            <LinkItem to="/student/space/classes" icon="/images/LopHocStudent.png" label="Lớp học của tôi" />
            <LinkItem to="/student/space/drive/my-drive" icon="/images/DriverStudent.png" label="Drive của tôi" />
            <hr></hr>
            <p>Lối tắt của bạn</p>
            <LinkItem to="/student/space/people/calendar" icon="/images/LichCaNhanStudent.png" label="Lịch cá nhân" />
            <LinkItem to="/student/space/people/tasks" icon="/images/NhiemVuStudent.png" label="Nhiệm vụ cá nhân" />
            <LinkItem to="/student/space/people/attendance" icon="/images/DiemDanhStudent.png" label="Điểm danh" />
            <LinkItem to="/student/space/people/homeworks" icon="/images/BTVNStudent.png" label="Bài tập về nhà" />
            <LinkItem to="/student/space/people/student-grade" icon="/images/BangDiemStudent.png" label="Bảng điểm" />
            <LinkItem to="/student/space/people/invoices" icon="/images/HoaDonStudent.png" label="Hóa đơn" />
            <LinkItem to="/student/space/people/orders" icon="/images/DonHangStudent.png" label="Đơn hàng" />
            <LinkItem to="/student/space/people/absenteeism" icon="/images/XinNghiStudent.png" label="Xin nghỉ" />
            <LinkItem to="https://easygames.vn/" icon="/images/GamesStudent.png" label="Games" />
        </nav>
    );
}

export default NavbarStudent;
