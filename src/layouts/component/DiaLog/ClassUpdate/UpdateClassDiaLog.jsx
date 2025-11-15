import React, { useState, useEffect } from 'react';
import { X, BookOpen, Save, AlertCircle } from 'lucide-react';
import MyClassService from '~/api/MyClassService';
import Swal from 'sweetalert2';

const UpdateClassDiaLog = ({ open, onClose, classData, onSave }) => {
  const [formData, setFormData] = useState({
    classCode: '',
    className: '',
    maxStudent: '',
    currentStudent: '',
    startDate: '',
    endDate: '',
    shift: '',
    status: true,
    note: '',
    onlineMeetingLink: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (classData) {
      setFormData({
        classCode: classData.classCode || '',
        className: classData.className || '',
        maxStudent: classData.maxStudent || '',
        currentStudent: classData.currentStudent || '',
        startDate: classData.startDate || '',
        endDate: classData.endDate || '',
        shift: classData.shift || '',
        status: classData.status !== undefined ? classData.status : true,
        note: classData.note || '',
        onlineMeetingLink: classData.onlineMeetingLink || ''
      });
    }
  }, [classData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(value);
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.classCode.trim()) {
      newErrors.classCode = 'Mã lớp học không được để trống';
    }

    if (!formData.className.trim()) {
      newErrors.className = 'Tên lớp học không được để trống';
    }

    if (!formData.maxStudent || formData.maxStudent <= 0) {
      newErrors.maxStudent = 'Số học viên tối đa phải lớn hơn 0';
    }

    if (!formData.currentStudent || formData.currentStudent < 0) {
      newErrors.currentStudent = 'Số học viên hiện tại không được âm';
    }

    if (parseInt(formData.currentStudent) > parseInt(formData.maxStudent)) {
      newErrors.currentStudent = 'Số học viên hiện tại không được vượt quá số tối đa';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Ngày bắt đầu không được để trống';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Ngày kết thúc không được để trống';
    }

    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
    }

    if (!formData.shift) {
      newErrors.shift = 'Vui lòng chọn ca học';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Gọi API update
      const updateData = {
        ...classData,
        ...formData,
        maxStudent: parseInt(formData.maxStudent),
        currentStudent: parseInt(formData.currentStudent),
        shift: parseInt(formData.shift),
        updateAt: new Date().toISOString().split('T')[0]
      };

      console.log(updateData);

      // API call
    await MyClassService.updateClass(updateData.classId, updateData);
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công!',
        showConfirmButton: false,
        timer: 1000
      })
      // Gọi callback onSave nếu có
      if (onSave) {
        onSave(updateData);
      }

      onClose();
    } catch (error) {
      console.error('Error updating class:', error);
      Swal.fire({
        icon: 'warning',
        title: 'Có lỗi xảy ra khi cập nhật lớp học',
        timer: 1000,
        showConfirmButton: false
      })
      setErrors({ submit: 'Có lỗi xảy ra khi cập nhật lớp học' });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, type = 'text', required = false, error, ...props }) => (
    <div className="mb-4">
      <label className="block text-xl font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );

  const SelectField = ({ label, name, options, required = false, error }) => (
    <div className="mb-4">
      <label className="block text-xl font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">-- Chọn --</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );

  const TextAreaField = ({ label, name, error, ...props }) => (
    <div className="mb-4">
      <label className="block text-xl font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        name={name}
        value={formData[name]}
        onChange={handleChange}
        rows={3}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );

  if (!open || !classData) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-1000">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-linear-to-r from-blue-600 to-blue-700">
          <div className="flex items-center gap-3">
            <BookOpen className="text-white" size={24} />
            <h2 className="text-2xl font-bold text-white">Cập nhật thông tin lớp học</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-400  hover:bg-opacity-20 rounded-full p-1 transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
            {/* Error message */}
            {errors.submit && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                <p className="text-red-700">{errors.submit}</p>
              </div>
            )}

            {/* Basic Information */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                Thông tin cơ bản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField
                  label="Mã lớp học"
                  name="classCode"
                  required
                  error={errors.classCode}
                  placeholder="Ví dụ: IELTS_C1"
                />
                <InputField
                  label="Tên lớp học"
                  name="className"
                  required
                  error={errors.className}
                  placeholder="Ví dụ: IELTS Advanced 7.0+"
                />
              </div>
            </div>

            {/* Student Information */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                Thông tin học viên
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField
                  label="Số học viên tối đa"
                  name="maxStudent"
                  type="number"
                  required
                  error={errors.maxStudent}
                  min="1"
                  placeholder="Ví dụ: 20"
                />
                <InputField
                  label="Số học viên hiện tại"
                  name="currentStudent"
                  type="number"
                  required
                  error={errors.currentStudent}
                  min="0"
                  placeholder="Ví dụ: 15"
                />
              </div>
            </div>

            {/* Schedule Information */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                Thông tin lịch học
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField
                  label="Ngày bắt đầu"
                  name="startDate"
                  type="date"
                  required
                  error={errors.startDate}
                />
                <InputField
                  label="Ngày kết thúc"
                  name="endDate"
                  type="date"
                  required
                  error={errors.endDate}
                />
                <SelectField
                  label="Ca học"
                  name="shift"
                  required
                  error={errors.shift}
                  options={[
                    { value: 1, label: 'Ca sáng' },
                    { value: 2, label: 'Ca chiều' },
                    { value: 3, label: 'Ca tối' }
                  ]}
                />
                <div className="mb-4">
                  <label className="block text-xl font-semibold text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Lớp đang hoạt động</span>
                  </label>
                </div>
              </div>
              <InputField
                label="Link học online"
                name="onlineMeetingLink"
                type="url"
                error={errors.onlineMeetingLink}
                placeholder="https://meet.google.com/xyz-789"
              />
              <TextAreaField
                label="Ghi chú"
                name="note"
                error={errors.note}
                placeholder="Nhập ghi chú về lớp học..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Lưu thay đổi
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClassDiaLog;