import React, { useState, useEffect } from 'react';
import { X, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import TeacherService from '~/api/TeacherService';

// Reusable Input Component with Error
const InputField = ({
    label,
    required,
    value,
    onChange,
    type = 'text',
    placeholder,
    disabled = false,
    className = '',
    error = '',
}) => (
    <div>
        <label className="block text-2xl mb-2">
            {label} {required && <span className="text-red-600">*</span>}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`w-full px-3 py-2 border ${
                error ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 ${
                error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
            } ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''} ${className}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

// Reusable Select Component with Error
const SelectField = ({ 
    label, 
    required, 
    value, 
    onChange, 
    options, 
    disabled = false, 
    placeholder = '-- Chọn --',
    error = ''
}) => (
    <div>
        <label className="block text-2xl mb-2">
            {label} {required && <span className="text-red-600">*</span>}
        </label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`w-full px-3 py-2 border ${
                error ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 ${
                error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
            } ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
        >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
                <option value={opt.value} key={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

export default function AddTeacherForm() {
    const [step, setStep] = useState(1);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        email: '',
        gender: '1',
        address: '',
        birthDate: '',
        phone: '',
        salary: '',
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Hoạt động',
        city: '',
        district: '',
        wards: '',
    });

    // Validation Rules
    const validateField = (fieldName, value) => {
        let error = '';

        switch (fieldName) {
            case 'fullName':
                if (!value || value.trim() === '') {
                    error = 'Họ và tên không được để trống';
                } else if (value.trim().length < 2) {
                    error = 'Họ và tên phải có ít nhất 2 ký tự';
                } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value)) {
                    error = 'Họ và tên chỉ được chứa chữ cái';
                }
                break;

            case 'email':
                if (!value || value.trim() === '') {
                    error = 'Email không được để trống';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Email không hợp lệ';
                }
                break;

            case 'phone':
                if (!value || value.trim() === '') {
                    error = 'Số điện thoại không được để trống';
                } else if (!/^(0|\+84)[0-9]{9}$/.test(value.replace(/\s/g, ''))) {
                    error = 'Số điện thoại không hợp lệ (VD: 0912345678)';
                }
                break;

            case 'username':
                if (!value || value.trim() === '') {
                    error = 'Tài khoản không được để trống';
                } else if (value.length < 4) {
                    error = 'Tài khoản phải có ít nhất 4 ký tự';
                } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                    error = 'Tài khoản chỉ được chứa chữ, số và dấu gạch dưới';
                }
                break;

            case 'password':
                if (!value || value.trim() === '') {
                    error = 'Mật khẩu không được để trống';
                } else if (value.length < 6) {
                    error = 'Mật khẩu phải có ít nhất 6 ký tự';
                }
                break;

            case 'salary':
                if (value && value !== '') {
                    const salaryNum = parseFloat(value);
                    if (isNaN(salaryNum)) {
                        error = 'Lương phải là số';
                    } else if (salaryNum < 0) {
                        error = 'Lương không được là số âm';
                    } else if (salaryNum > 10000000) {
                        error = 'Lương không hợp lệ (quá cao)';
                    }
                }
                break;

            case 'birthDate':
                if (value) {
                    const birthDate = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - birthDate.getFullYear();
                    
                    if (birthDate > today) {
                        error = 'Ngày sinh không được là ngày trong tương lai';
                    } else if (age < 18) {
                        error = 'Giảng viên phải từ 18 tuổi trở lên';
                    } else if (age > 100) {
                        error = 'Ngày sinh không hợp lệ';
                    }
                }
                break;

            default:
                break;
        }

        return error;
    };

    // Validate step
    const validateStep = (stepNumber) => {
        const newErrors = {};
        
        if (stepNumber === 1) {
            const step1Fields = ['fullName', 'email', 'phone', 'username', 'password'];
            
            step1Fields.forEach(field => {
                const error = validateField(field, formData[field]);
                if (error) {
                    newErrors[field] = error;
                }
            });
        }
        
        if (stepNumber === 2) {
            if (formData.salary) {
                const error = validateField('salary', formData.salary);
                if (error) newErrors.salary = error;
            }
            
            if (formData.birthDate) {
                const error = validateField('birthDate', formData.birthDate);
                if (error) newErrors.birthDate = error;
            }
        }

        return newErrors;
    };

    // Fetch functions
    const fetchCities = async () => {
        try {
            const res = await fetch('https://provinces.open-api.vn/api/p/');
            if (!res.ok) throw new Error('Error fetching cities');
            const data = await res.json();
            setCities(data);
        } catch (e) {
            console.error('Error Exception:', e);
        }
    };

    const fetchDistricts = async (cityCode) => {
        try {
            const res = await fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`);
            if (!res.ok) throw new Error('Error fetching districts');
            const data = await res.json();
            setDistricts(data.districts ?? []);
        } catch (e) {
            console.error('Error Exception:', e);
        }
    };

    const fetchWards = async (districtCode) => {
        try {
            const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            if (!res.ok) throw new Error('Error fetching wards');
            const data = await res.json();
            setWards(data.wards ?? []);
        } catch (e) {
            console.error('Error Exception:', e);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const getNameByCode = (list, code) => {
        const item = list.find((i) => i.code === parseInt(code));
        return item ? item.name : '';
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => {
            const updated = { ...prev, [field]: value };

            if (field === 'city') {
                updated.district = '';
                updated.wards = '';
                setDistricts([]);
                setWards([]);
                if (value) fetchDistricts(value);
            } else if (field === 'district') {
                updated.wards = '';
                setWards([]);
                if (value) fetchWards(value);
            }

            const cityName = getNameByCode(cities, updated.city);
            const districtName = getNameByCode(districts, updated.district);
            const wardName = getNameByCode(wards, updated.wards);

            updated.address = [wardName, districtName, cityName].filter(Boolean).join(', ');

            return updated;
        });

        // Clear error when typing
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }

        setTouched(prev => ({ ...prev, [field]: true }));

        // Real-time validation
        const error = validateField(field, value);
        if (error && touched[field]) {
            setErrors(prev => ({ ...prev, [field]: error }));
        }
    };

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        const password = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        handleInputChange('password', password);
    };

    const handleNext = () => {
        const stepErrors = validateStep(1);
        
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            
            Swal.fire({
                icon: 'warning',
                title: 'Thông tin chưa đầy đủ',
                text: 'Vui lòng kiểm tra và điền đầy đủ thông tin bắt buộc!',
            });
            
            return;
        }

        setStep(2);
    };

    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        // Validate all
        const step1Errors = validateStep(1);
        const step2Errors = validateStep(2);
        const allErrors = { ...step1Errors, ...step2Errors };

        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
            
            Swal.fire({
                icon: 'warning',
                title: 'Thông tin chưa hợp lệ',
                html: `
                    <div style="text-align: left;">
                        ${Object.values(allErrors).map(err => `<p>• ${err}</p>`).join('')}
                    </div>
                `,
            });
            
            return;
        }

        try {
            const payload = {
                adminId: 0,
                userName: formData.username + '@teacher',
                password: formData.password,
                fullName: formData.fullName,
                email: formData.email,
                gender: formData.gender === '1',
                address: formData.address,
                dateOfBirth: formData.birthDate || null,
                createAt: formData.joinDate || new Date().toISOString().split('T')[0],
                updateAt: new Date().toISOString().split('T')[0],
                isActive: formData.status === 'Hoạt động',
                phoneNumber: formData.phone,
                salary: formData.salary ? parseFloat(formData.salary) : 0,
            };

            console.log('Payload:', payload);
            
            const res = await TeacherService.create(payload);
            if (res) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Thêm giảng viên thành công!',
                });
                navigate("/admin");
            }
        } catch (e) {
            console.error('Error exception:', e);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã có lỗi xảy ra! Vui lòng thử lại',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <Link to="/admin">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                            <X size={20} />
                        </button>
                    </Link>
                    <h1 className="text-3xl font-semibold">Thêm Giảng Viên</h1>
                    <button 
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700 transition"
                    >
                        Lưu
                    </button>
                </div>

                {/* Progress Steps */}
                <div className="p-6">
                    <div className="flex items-center justify-center max-w-3xl mx-auto">
                        <div className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'
                                }`}
                            >
                                1
                            </div>
                            <div className="ml-2 text-2xl font-medium">Thông tin</div>
                        </div>
                        <div className={`flex-1 h-0.5 mx-4 transition ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        <div className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                                    step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'
                                }`}
                            >
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
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold mb-6">Thông tin chung</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Họ và tên"
                                        required
                                        value={formData.fullName}
                                        onChange={(val) => handleInputChange('fullName', val)}
                                        placeholder="Nguyễn Văn A"
                                        error={errors.fullName}
                                    />

                                    <InputField
                                        label="Trạng thái"
                                        value={formData.status}
                                        onChange={() => {}}
                                        disabled
                                    />

                                    <InputField
                                        label="Email"
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(val) => handleInputChange('email', val)}
                                        placeholder="example@gmail.com"
                                        error={errors.email}
                                    />

                                    <InputField
                                        label="Số điện thoại"
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(val) => handleInputChange('phone', val)}
                                        placeholder="0912345678"
                                        error={errors.phone}
                                    />

                                    <InputField
                                        label="Tài khoản"
                                        required
                                        value={formData.username}
                                        onChange={(val) => handleInputChange('username', val)}
                                        placeholder="nguyenvana"
                                        error={errors.username}
                                    />

                                    <div>
                                        <label className="block text-2xl mb-2">
                                            Mật khẩu <span className="text-red-600">*</span>
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Tối thiểu 6 ký tự"
                                                value={formData.password}
                                                onChange={(e) => handleInputChange('password', e.target.value)}
                                                className={`flex-1 px-3 py-2 border ${
                                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                                } rounded-lg focus:outline-none focus:ring-2 ${
                                                    errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                                                }`}
                                            />
                                            <button
                                                onClick={generatePassword}
                                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                                title="Tạo mật khẩu ngẫu nhiên"
                                            >
                                                <RefreshCw size={20} className="text-gray-600" />
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6">
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Tiếp theo
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-6">Thông tin giảng viên</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Sinh nhật"
                                        type="date"
                                        value={formData.birthDate}
                                        onChange={(val) => handleInputChange('birthDate', val)}
                                        error={errors.birthDate}
                                    />

                                    <SelectField
                                        label="Giới tính"
                                        value={formData.gender}
                                        onChange={(val) => handleInputChange('gender', val)}
                                        options={[
                                            { value: '0', label: 'Nữ' },
                                            { value: '1', label: 'Nam' },
                                        ]}
                                    />

                                    <SelectField
                                        label="Thành phố"
                                        value={formData.city}
                                        onChange={(val) => handleInputChange('city', val)}
                                        options={cities.map((c) => ({ value: c.code, label: c.name }))}
                                        placeholder="-- Chọn Thành phố --"
                                    />

                                    <SelectField
                                        label="Quận & Huyện"
                                        value={formData.district}
                                        onChange={(val) => handleInputChange('district', val)}
                                        options={districts.map((d) => ({ value: d.code, label: d.name }))}
                                        disabled={!formData.city}
                                        placeholder="-- Chọn Quận / Huyện --"
                                    />

                                    <SelectField
                                        label="Phường / Xã"
                                        value={formData.wards}
                                        onChange={(val) => handleInputChange('wards', val)}
                                        options={wards.map((w) => ({ value: w.code, label: w.name }))}
                                        disabled={!formData.district}
                                        placeholder="-- Chọn Phường / Xã --"
                                    />

                                    <InputField
                                        label="Ngày tham gia"
                                        type="date"
                                        value={formData.joinDate}
                                        onChange={(val) => handleInputChange('joinDate', val)}
                                    />

                                    <InputField
                                        label="Lương (/buổi)"
                                        type="number"
                                        value={formData.salary}
                                        onChange={(val) => handleInputChange('salary', val)}
                                        placeholder="VD: 200000"
                                        error={errors.salary}
                                    />
                                </div>

                                {formData.address && (
                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Địa chỉ đầy đủ:</p>
                                        <p className="font-medium text-blue-900">{formData.address}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between pt-6">
                                <button
                                    onClick={handlePrev}
                                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Quay lại
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}