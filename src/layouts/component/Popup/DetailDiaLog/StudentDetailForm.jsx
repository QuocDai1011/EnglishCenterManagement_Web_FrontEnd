import React from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle } from 'lucide-react';

const StudentDetailForm = ({ open, onClose, student }) => {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="mb-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-blue-600">
          {Icon && <Icon size={18} />}
        </div>
        <div className="flex-1">
          <p className="text-xl font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-xl text-gray-800">
            {value || <span className="italic text-gray-400">Chưa cập nhật</span>}
          </p>
        </div>
      </div>
    </div>
  );

  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center gap-3">
            <User className="text-white" size={24} />
            <h2 className="text-2xl font-bold text-white">Thông tin sinh viên</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
          {/* Status Badge */}
          <div className="mb-6 flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-lg font-medium ${
              student.isActive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {student.isActive ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {student.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
            </div>
          </div>

          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
              Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InfoRow
                icon={User}
                label="Mã sinh viên"
                value={student.studentId}
              />
              <InfoRow
                icon={User}
                label="Tên đăng nhập"
                value={student.userName}
              />
              <InfoRow
                icon={User}
                label="Họ và tên"
                value={student.fullName}
              />
              <InfoRow
                icon={User}
                label="Giới tính"
                value={student.gender !== null && student.gender !== undefined 
                  ? (student.gender ? 'Nam' : 'Nữ') 
                  : null}
              />
              <InfoRow
                icon={Calendar}
                label="Ngày sinh"
                value={formatDate(student.dateOfBirth)}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
              Thông tin liên hệ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InfoRow
                icon={Mail}
                label="Email"
                value={student.email}
              />
              <InfoRow
                icon={Phone}
                label="Số điện thoại"
                value={student.phoneNumber}
              />
              <InfoRow
                icon={Phone}
                label="Số điện thoại phụ huynh"
                value={student.phoneNumberOfParents}
              />
              <InfoRow
                icon={MapPin}
                label="Địa chỉ"
                value={student.address}
              />
            </div>
          </div>

          {/* System Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
              Thông tin hệ thống
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InfoRow
                icon={Calendar}
                label="Ngày tạo"
                value={formatDate(student.creatAt)}
              />
              <InfoRow
                icon={Calendar}
                label="Ngày cập nhật"
                value={formatDate(student.updateAt)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Đóng
          </button>
      
        </div>
      </div>
    </div>
  );
};

export default StudentDetailForm;

