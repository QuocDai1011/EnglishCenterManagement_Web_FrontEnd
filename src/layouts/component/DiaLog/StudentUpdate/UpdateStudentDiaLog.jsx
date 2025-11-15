import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle, Save, AlertCircle } from 'lucide-react';
import { CiLock } from 'react-icons/ci';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import StudentService from '~/api/StudentService';
import Swal from 'sweetalert2';

// Move InputField outside to prevent re-creation on each render
const InputField = ({
    icon: Icon,
    label,
    type = 'text',
    required = false,
    isReadOnly,
    isPassword = false,
    value,
    onChange,
    error,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4">
            <div className="flex items-start gap-3">
                <div className="mt-7 text-blue-600">{Icon && <Icon size={24} />}</div>
                <div className="flex-1 relative">
                    <label className="text-xl font-semibold text-gray-600 uppercase tracking-wide mb-1 block">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        readOnly={isReadOnly}
                        type={isPassword ? (showPassword ? 'text' : 'password') : type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className={`w-full text-xl text-gray-800 p-2 border ${
                            error ? 'border-red-500' : 'border-gray-300'
                        } relative rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                            isReadOnly ? 'bg-gray-100' : ''
                        }`}
                        placeholder={`Nhập ${label.toLowerCase()}`}
                    />
                    {isPassword &&
                        (showPassword ? (
                            <BsEyeSlash
                                onClick={() => setShowPassword(false)}
                                size={20}
                                className="absolute top-24px right-4 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
                            />
                        ) : (
                            <BsEye
                                onClick={() => setShowPassword(true)}
                                size={20}
                                className="absolute top-24px right-4 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
                            />
                        ))}
                    {error && (
                        <div className="flex items-center gap-1 mt-1 text-red-500 text-xl">
                            <AlertCircle size={14} />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Move SelectField outside as well
const SelectField = ({ icon: Icon, label, field, options, required = false, value, onChange }) => (
    <div className="mb-4">
        <div className="flex items-start gap-3">
            <div className="mt-7 text-blue-600">{Icon && <Icon size={24} />}</div>
            <div className="flex-1">
                <label className="text-xl font-semibold text-gray-600 uppercase tracking-wide mb-1 block">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <select
                    value={value ? 'true' : 'false'}
                    onChange={(e) => onChange(field, e.target.value === 'true')}
                    className="w-full text-xl text-gray-800 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    </div>
);

const UpdateStudentDiaLog = ({ open, onClose, student, onSave }) => {
    const [formData, setFormData] = useState({
        studentId: 0,
        userName: '',
        password: '',
        fullName: '',
        email: '',
        gender: true,
        address: '',
        dateOfBirth: '',
        phoneNumber: '',
        phoneNumberOfParents: '',
        creatAt: '', // Note: Backend uses CreatAt (capital C, no 'e')
        updateAt: '',
        isActive: true,
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cities, setCities] = useState([])

    const fetchCitites = () => {
        try{
            fetch("https://provinces.open-api.vn/api/v1/")
        .then((res) => {
            if(!res.ok){
                Swal.fire("Error", "Lỗi khi lấy dữ liệu Thành phố", "error")
            }
            return res.json();
        })
        .then((data) => setCities(data))
        }catch(e){
            console.log("Error: " + e);
            Swal.fire("Error", "Đã xảy ra lỗi khi get API", "error")
        }
    }

    useEffect(() => {
        fetchCitites();
    },[])


    useEffect(() => {
        if (student) {
            setFormData({
                studentId: student.studentId || 0,
                userName: student.userName || '',
                password: '',
                fullName: student.fullName || '',
                email: student.email || '',
                gender: student.gender !== undefined ? student.gender : true,
                address: student.address || '',
                dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '',
                phoneNumber: student.phoneNumber || '',
                phoneNumberOfParents: student.phoneNumberOfParents || '',
                creatAt: student.creatAt ? student.creatAt.split('T')[0] : '',
                updateAt: student.updateAt || '',
                isActive: student.isActive !== undefined ? student.isActive : true,
            });
            setConfirmPassword('');
            setErrors({});
        }
    }, [student]);

    const handleChange = (field, value) => {
        
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        // Clear error when user types
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.userName.trim()) {
            newErrors.userName = 'Tên đăng nhập không được để trống';
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ và tên không được để trống';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (formData.phoneNumber && !/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Số điện thoại phải có 10-11 chữ số';
        }

        if (formData.phoneNumberOfParents && !/^[0-9]{10,11}$/.test(formData.phoneNumberOfParents)) {
            newErrors.phoneNumberOfParents = 'Số điện thoại phải có 10-11 chữ số';
        }

        // Validate password only if user entered something
        if (formData.password || confirmPassword) {
            if (formData.password.length < 6) {
                newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
            }
            if (formData.password !== confirmPassword) {
                newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        const now = new Date().toISOString().split('T')[0];
        try {
            // Build payload with proper formatting
            const dataToSave = {
                studentId: formData.studentId,
                userName: formData.userName.trim(),
                fullName: formData.fullName.trim(),
                email: formData.email.trim() || null,
                gender: formData.gender,
                address: formData.address || null,
                dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth : null,
                phoneNumber: formData.phoneNumber.trim() || null,
                phoneNumberOfParents: formData.phoneNumberOfParents.trim() || null,
                creatAt: formData.creatAt ? formData.creatAt : now,
                updateAt: now,
                isActive: formData.isActive,
                password: formData.password || ''
            };

            // Only include password if user entered a new one
            if (formData.password && formData.password.trim()) {
                dataToSave.password = formData.password.trim();
            }

            console.log('📤 Data to send:', dataToSave);

            await StudentService.update(dataToSave.studentId, dataToSave);
            await onSave(dataToSave);
            onClose();
            Swal.fire({
                icon: 'success',
                title: 'Đã cập nhật thành công',
                timer: 1000,
                showConfirmButton:false
            })
        } catch (error) {
            console.error('❌ Error updating student:', error);
            Swal.fire({
                    icon: 'warning',
                    title: error,
                    timer: 1000,
                    showConfirmButton: false
                  })
            // Enhanced error handling
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                
                // Log detailed validation errors
                if (error.response.data?.errors) {
                    console.error('Validation errors:', error.response.data.errors);
                    Object.keys(error.response.data.errors).forEach(key => {
                        console.error(`  ${key}:`, error.response.data.errors[key]);
                    });
                }
                
                const errorMessage = error.response.data?.title
                    || error.response.data?.message 
                    || JSON.stringify(error.response.data)
                    || 'Có lỗi xảy ra khi cập nhật';
                
                setErrors({ submit: `Lỗi ${error.response.status}: ${errorMessage}` });
            } else if (error.request) {
                setErrors({ submit: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối.' });
            } else {
                setErrors({ submit: `Có lỗi xảy ra: ${error.message}` });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!open || !student) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-1000">
            <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-linear-to-r from-blue-600 to-blue-700">
                    <div className="flex items-center gap-3">
                        <User className="text-white" size={24} />
                        <h2 className="text-2xl font-bold text-white">Cập nhật thông tin sinh viên</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-blue-400 hover:bg-opacity-20 rounded-full p-1 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
                    {/* Submit Error */}
                    {errors.submit && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                            <AlertCircle size={20} />
                            <span className="text-xl">{errors.submit}</span>
                        </div>
                    )}

                    {/* Basic Information */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                            Thông tin cơ bản
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <InputField
                                icon={User}
                                label="Mã sinh viên"
                                field="studentId"
                                type="text"
                                required
                                isReadOnly
                                value={formData.studentId}
                                onChange={(value) => handleChange('studentId', value)}
                            />
                            <InputField
                                icon={User}
                                label="Tên đăng nhập"
                                field="userName"
                                required
                                value={formData.userName}
                                onChange={(value) => handleChange('userName', value)}
                                error={errors.userName}
                            />
                            <InputField
                                icon={User}
                                label="Họ và tên"
                                field="fullName"
                                required
                                value={formData.fullName}
                                onChange={(value) => handleChange('fullName', value)}
                                error={errors.fullName}
                            />
                            <SelectField
                                icon={User}
                                label="Giới tính"
                                field="gender"
                                options={[
                                    { value: 'true', label: 'Nam' },
                                    { value: 'false', label: 'Nữ' },
                                ]}
                                required
                                value={formData.gender}
                                onChange={handleChange}
                            />
                            <InputField
                                icon={Calendar}
                                label="Ngày sinh"
                                field="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(value) => handleChange('dateOfBirth', value)}
                            />
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                            Đổi mật khẩu (để trống nếu không muốn đổi)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <InputField
                                icon={CiLock}
                                label="Mật khẩu mới"
                                field="password"
                                type="password"
                                isPassword
                                value={formData.password}
                                onChange={(value) => handleChange('password', value)}
                                error={errors.password}
                            />
                            <InputField
                                icon={CiLock}
                                label="Nhập lại mật khẩu mới"
                                field="confirmPassword"
                                isPassword
                                type="password"
                                value={confirmPassword}
                                onChange={(value) => {
                                    setConfirmPassword(value);
                                    if (errors.confirmPassword) {
                                        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                                    }
                                }}
                                error={errors.confirmPassword}
                            />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                            Thông tin liên hệ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <InputField
                                icon={Mail}
                                label="Email"
                                field="email"
                                type="email"
                                value={formData.email}
                                onChange={(value) => handleChange('email', value)}
                                error={errors.email}
                            />
                            <InputField
                                icon={Phone}
                                label="Số điện thoại"
                                field="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={(value) => handleChange('phoneNumber', value)}
                                error={errors.phoneNumber}
                            />
                            <InputField
                                icon={Phone}
                                label="Số điện thoại phụ huynh"
                                field="phoneNumberOfParents"
                                value={formData.phoneNumberOfParents}
                                onChange={(value) => handleChange('phoneNumberOfParents', value)}
                                error={errors.phoneNumberOfParents}
                            />
                            <div className="md:col-span-2">
                                <div className="mb-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-7 text-blue-600">
                                            <MapPin size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xl font-semibold text-gray-600 uppercase tracking-wide mb-1 block">
                                                Địa chỉ
                                            </label>
                                            <select
                                                value={formData.address}
                                                onChange={(e) => handleChange('address', e.target.value)}
                                                className="w-full text-xl text-gray-800 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            >
                                                <option value="">-- Tỉnh/Thành phố --</option>
                                                {cities.map((opt) => (
                                                    <option key={opt.code} value={opt.name}>
                                                        {opt.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Information */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                            Thông tin hệ thống
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <InputField
                                icon={Calendar}
                                label="Ngày tạo"
                                field="creatAt"
                                type="date"
                                isReadOnly
                                value={formData.creatAt}
                                onChange={(value) => handleChange('creatAt', value)}
                            />
                            <InputField
                                icon={CheckCircle}
                                label="Trạng thái hoạt động"
                                field="isActive"
                                value={formData.isActive === true ? 'Đang hoạt động' : ''}
                                onChange={handleChange}
                                isReadOnly={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Đang cập nhật...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Cập nhật
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateStudentDiaLog;