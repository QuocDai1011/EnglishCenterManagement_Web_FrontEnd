import React from 'react';
import { X, BookOpen, Users, Calendar, Clock, CheckCircle, XCircle, Link, User, FileText } from 'lucide-react';

const ClassDetailDialog = ({ open, onClose, classData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getShiftLabel = (shift) => {
    const shifts = {
      1: 'Sáng',
      2: 'Chiều',
      3: 'Tối'
    };
    return shifts[shift] || 'Chưa xác định';
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="mb-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-blue-600">
          {Icon && <Icon size={24} />}
        </div>
        <div className="flex-1">
          <p className="text-xl font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-gray-800 text-xl">
            {value || <span className="italic text-gray-400">Chưa cập nhật</span>}
          </p>
        </div>
      </div>
    </div>
  );

  if (!open || !classData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-1000">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-linear-to-r from-blue-600 to-blue-700">
          <div className="flex items-center gap-3">
            <BookOpen className="text-white" size={24} />
            <h2 className="text-3xl font-bold text-white">Thông tin lớp học</h2>
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
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xl font-medium ${
              classData.status 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {classData.status ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {classData.status ? 'Đang hoạt động' : 'Đã kết thúc'}
            </div>
          </div>

          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
              Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoRow
                icon={BookOpen}
                label="Mã lớp học"
                value={classData.classCode}
              />
              <InfoRow
                icon={BookOpen}
                label="Tên lớp học"
                value={classData.className}
              />
              <InfoRow
                icon={Clock}
                label="Ca học"
                value={getShiftLabel(classData.shift)}
              />
              <InfoRow
                icon={FileText}
                label="Ghi chú"
                value={classData.note}
              />
            </div>
          </div>

          {/* Student Information */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
              Thông tin học viên
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InfoRow
                icon={Users}
                label="Số học viên hiện tại"
                value={classData.currentStudent}
              />
              <InfoRow
                icon={Users}
                label="Số học viên tối đa"
                value={classData.maxStudent}
              />
              <div className="mb-4 md:col-span-2">
                {/* <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-600">
                    <Users size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Tỷ lệ lấp đầy
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${(classData.currentStudent / classData.maxStudent) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {((classData.currentStudent / classData.maxStudent) * 100).toFixed(1)}% ({classData.currentStudent}/{classData.maxStudent})
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
              Thông tin lịch học
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InfoRow
                icon={Calendar}
                label="Ngày bắt đầu"
                value={formatDate(classData.startDate)}
              />
              <InfoRow
                icon={Calendar}
                label="Ngày kết thúc"
                value={formatDate(classData.endDate)}
              />
              {classData.onlineMeetingLink && (
                <div className="mb-4 md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-blue-600">
                      <Link size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Link học online
                      </p>
                      <a 
                        href={classData.onlineMeetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl text-blue-600 hover:text-blue-700 hover:underline break-all"
                      >
                        {classData.onlineMeetingLink}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* System Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
              Thông tin hệ thống
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InfoRow
                icon={Calendar}
                label="Ngày tạo"
                value={formatDate(classData.createAt)}
              />
              <InfoRow
                icon={Calendar}
                label="Ngày cập nhật"
                value={formatDate(classData.updateAt)}
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

export default ClassDetailDialog;