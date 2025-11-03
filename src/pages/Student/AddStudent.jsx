import React, { useState, useEffect } from 'react';
import { X, Plus, RefreshCw } from 'lucide-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function AddStudentForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Thông tin chung
    avatar: null,
    fullName: '',
    branch: 'TRUNG TÂM NGOẠI NGỮ TRE XANH',
    department: 'Khách hàng',
    role: 'Học viên',
    userId: 'HV-0000138',
    email: '',
    status: 'Hoạt động',
    relationshipLevel: 'Lead',
    password: '',
    phone1: '',
    phone2: '',
    phone3: '',
    phone4: '',
    
    // Thông tin lớp học
    classRoom: '',
    course: '',
    subject: '',
    level: '',
    
    // Thông tin khách hàng
    birthDate: '',
    gender: 'Nữ',
    school: '',
    major: '',
    parentName: '',
    parentRelation: 'Phụ huynh',
    address: '',
    country: 'Quốc gia',
    city: '',
    district: '',
    facebook: '',
    exportOrigin: '',
    joinDate: '',
    customerSource: '',
    customerQuality: '',
    group: '',
    companyName: '',
    website: '',
    marketingCampaign: '',
    stopReason: '',
    salesStaff: 'QL-0000001 ...',
    manager: 'Quản lý',
    teacher: 'Giáo viên',
    career: 'Nghề nghiệp',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    alert('Đã lưu thông tin học viên!');
  };

  const generateUserId = () => {
    const newId = `HV-${Math.floor(Math.random() * 9999999).toString().padStart(7, '0')}`;
    handleInputChange('userId', newId);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const password = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    handleInputChange('password', password);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
          <h1 className="text-3xl font-semibold">Thêm học viên</h1>
          <button className="px-6 py-2 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700">
            Lưu
          </button>
        </div>

        {/* Progress Steps */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <div className="ml-2 text-2xl font-medium">Thông tin</div>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <div className="ml-2 text-2xl font-medium">Hồ sơ</div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {step === 1 && (
            <>
              {/* Thông tin chung */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Thông tin chung</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Avatar Upload */}
                  <div className="col-span-1">
                    <label className="block text-2xl mb-2">Ảnh đại diện</label>
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500">
                      <Plus size={32} className="text-gray-400" />
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-2xl mb-2">Họ và tên <span className="text-red-600">*</span></label>
                      <input
                        type="text"
                        placeholder="Họ và tên"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-2xl mb-2">Cơ sở <span className="text-red-600">*</span></label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.branch}
                          onChange={(e) => handleInputChange('branch', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">×</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-2xl mb-2">Phòng ban <span className="text-red-600">*</span></label>
                      <select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Khách hàng</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-2xl mb-2">Vai trò <span className="text-red-600">*</span></label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.role}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          readOnly
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">×</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-2xl mb-2">Mã người dùng <span className="text-red-600">*</span></label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.userId}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          readOnly
                        />
                        <button
                          onClick={generateUserId}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <RefreshCw size={20} className="text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* <div>
                      <label className="block text-2xl mb-2">Thư điện tử *</label>
                      <input
                        type="email"
                        placeholder="Thu điện tử"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div> */}

                    <div>
                      <label className="block text-2xl mb-2">Trạng thái</label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Hoạt động</option>
                        <option>Không hoạt động</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-2xl mb-2">Mối quan hệ</label>
                      <select
                        value={formData.relationshipLevel}
                        onChange={(e) => handleInputChange('relationshipLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Lead</option>
                        <option>Prospect</option>
                        <option>Customer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-2xl mb-2">Email <span className="text-red-600">*</span></label>
                      <input
                        type="text"
                        placeholder="example@gmail.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
/>
                    </div>

                    <div>
                      <label className="block text-2xl mb-2">Mật khẩu <span className="text-red-600">*</span></label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Mật khẩu"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={generatePassword}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <RefreshCw size={20} className="text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-2xl mb-2">Số điện thoại<span className="text-red-600">*</span> </label>
                      <input
                        type="tel"
                        placeholder="Số điện thoại 1"
                        value={formData.phone1}
                        onChange={(e) => handleInputChange('phone1', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    
                  </div>
                </div>
              </div>

              {/* Thông tin lớp học */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">Thông tin lớp học</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-2xl mb-2">Lớp học</label>
                    <select
                      value={formData.classRoom}
                      onChange={(e) => handleInputChange('classRoom', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Lớp học</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Khóa học</label>
                    <select
                      value={formData.course}
                      onChange={(e) => handleInputChange('course', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Khóa học</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Bộ môn</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Bộ môn</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Trình độ</label>
                    <select
                      value={formData.level}
                      onChange={(e) => handleInputChange('level', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Trình độ</option>
                    </select>
                  </div>
                </div>

                <button className="mt-4 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Plus size={16} />
                  Thêm lớp học
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Tiếp theo
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Thông tin khách hàng */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">Thông tin khách hàng</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-2xl mb-2">Sinh nhật</label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Giới tính</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Nữ</option>
                      <option>Nam</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Trường học</label>
                    <select
                      value={formData.school}
                      onChange={(e) => handleInputChange('school', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Trường học</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Trình độ chuyên môn</label>
                    <input
                      type="text"
                      placeholder="Trình độ chuyên môn"
                      value={formData.major}
                      onChange={(e) => handleInputChange('major', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Phụ huynh</label>
                    <select
                      value={formData.parentRelation}
                      onChange={(e) => handleInputChange('parentRelation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Phụ huynh</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Tên phụ huynh</label>
                    <input
                      type="text"
                      placeholder="Tên phụ huynh"
                      value={formData.parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Địa chỉ</label>
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Quốc gia</label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Quốc gia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Thành phố</label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Thành phố</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Quận</label>
                    <input
                      type="text"
                      placeholder="Quận"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Facebook</label>
                    <input
                      type="text"
                      placeholder="Facebook"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange('facebook', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Đề xuất bởi</label>
                    <select
                      value={formData.exportOrigin}
                      onChange={(e) => handleInputChange('exportOrigin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Đề xuất bởi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Ngày tham gia</label>
                    <input
                      type="date"
                      value={formData.joinDate}
                      onChange={(e) => handleInputChange('joinDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Nguồn khách hàng</label>
                    <select
                      value={formData.customerSource}
                      onChange={(e) => handleInputChange('customerSource', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Nguồn khách hàng</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Chất lượng nguồn khách hàng</label>
                    <select
                      value={formData.customerQuality}
                      onChange={(e) => handleInputChange('customerQuality', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chất lượng nguồn khách hàng</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Nhóm</label>
                    <select
                      value={formData.group}
                      onChange={(e) => handleInputChange('group', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Nhóm</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Tên công ty</label>
                    <input
                      type="text"
                      placeholder="Tên công ty"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Trang web</label>
                    <input
                      type="text"
                      placeholder="Trang web"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Chiến dịch marketing</label>
                    <select
                      value={formData.marketingCampaign}
                      onChange={(e) => handleInputChange('marketingCampaign', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chiến dịch marketing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Lý do ngừng chăm sóc</label>
                    <select
                      value={formData.stopReason}
                      onChange={(e) => handleInputChange('stopReason', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Lý do ngừng chăm sóc</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Nghề nghiệp</label>
                    <select
                      value={formData.career}
                      onChange={(e) => handleInputChange('career', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Nghề nghiệp</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Nhân viên kinh doanh</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.salesStaff}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                      <span className="absolute right-3 top-2.5 text-gray-400">×</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Quản lý</label>
                    <select
                      value={formData.manager}
                      onChange={(e) => handleInputChange('manager', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Quản lý</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-2xl mb-2">Giáo viên</label>
                    <select
                      value={formData.teacher}
                      onChange={(e) => handleInputChange('teacher', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Giáo viên</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mô tả with CKEditor */}
              <div className="mb-8">
                <label className="block text-2xl mb-2">Mô tả</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      handleInputChange('description', data);
                    }}
                    config={{
                      toolbar: [
                        'heading', '|',
                        'bold', 'italic', 'link', '|',
                        'bulletedList', 'numberedList', '|',
                        'outdent', 'indent', '|',
                        'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', '|',
                        'undo', 'redo'
                      ],
                      placeholder: 'Mô tả...'
                    }}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <button
                  onClick={handlePrev}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Quay lại
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

