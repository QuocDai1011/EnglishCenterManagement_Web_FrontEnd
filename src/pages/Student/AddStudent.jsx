import React, { useState, useEffect } from 'react';
import { X, Plus, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';
import StudentService from '~/api/StudentService';

// Reusable Input Component
const InputField = ({ label, required, value, onChange, type = 'text', placeholder, disabled = false, className = '' }) => (
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
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
            } ${className}`}
        />
    </div>
);

// Reusable Select Component
const SelectField = ({ label, required, value, onChange, options, disabled = false, placeholder = '-- Chọn --' }) => (
    <div>
        <label className="block text-2xl mb-2">
            {label} {required && <span className="text-red-600">*</span>}
        </label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
            }`}
        >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
                <option value={opt.value} key={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);

export default function AddStudentForm() {
    const [step, setStep] = useState(1);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [formData, setFormData] = useState({
        avatar: null,
        fullName: '',
        userId: 'HV-0000138',
        email: '',
        status: 'Hoạt động',
        password: '',
        phone: '',
        username: '',
        birthDate: '',
        gender: '1',
        parentPhone: '',
        parentRelation: 'Phụ huynh',
        city: '',
        district: '',
        wards: '',
        address: '',
        joinDate: new Date().toISOString().split('T')[0],
        description: '',
    });

    // Fetch functions
    const fetchCities = async () => {
        try {
            const res = await fetch('https://provinces.open-api.vn/api/v1');
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

    // Helper function
    const getNameByCode = (list, code) => {
        const item = list.find((i) => i.code === parseInt(code));
        return item ? item.name : '';
    };

    // Handle input changes with address logic
    const handleInputChange = (field, value) => {
        setFormData((prev) => {
            const updated = { ...prev, [field]: value };

            // Handle cascading address selects
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

            // Update complete address
            const cityName = getNameByCode(cities, updated.city);
            const districtName = getNameByCode(districts, updated.district);
            const wardName = getNameByCode(wards, updated.wards);

            updated.address = [wardName, districtName, cityName].filter(Boolean).join(', ');

            return updated;
        });
    };

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const password = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        handleInputChange('password', password);
    };

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
      try{
        const res = await StudentService.create(formData);
        if(res){
          Swal.fire("Thêm học viên", "Thêm học viên thành công !", "success")
        }
      }catch(e){
        console.error("Error exception: " + e);
        
        Swal.fire("Thêm học viên", "Đã có lôi xảy ra! Vui lòng thử lại", "warning")
      }
        console.log('Form Data:', formData);
        alert(`Đã lưu thông tin học viên!\nĐịa chỉ: ${formData.address}`);
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
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'
                                }`}
                            >
                                1
                            </div>
                            <div className="ml-2 text-2xl font-medium">Thông tin</div>
                        </div>
                        <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        <div className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
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
                                        <InputField
                                            label="Họ và tên"
                                            required
                                            value={formData.fullName}
                                            onChange={(val) => handleInputChange('fullName', val)}
                                            placeholder="Họ và tên"
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
                                        />

                                        <InputField
                                            label="Số điện thoại"
                                            required
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(val) => handleInputChange('phone', val)}
                                            placeholder="Số điện thoại"
                                        />

                                        <InputField
                                            label="Tài khoản"
                                            required
                                            value={formData.username}
                                            onChange={(val) => handleInputChange('username', val)}
                                            placeholder="trungle05"
                                        />

                                        <div>
                                            <label className="block text-2xl mb-2">
                                                Mật khẩu <span className="text-red-600">*</span>
                                            </label>
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
                                                    title="Tạo mật khẩu ngẫu nhiên"
                                                >
                                                    <RefreshCw size={20} className="text-gray-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                            {/* Thông tin học viên */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-6">Thông tin học viên</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Sinh nhật"
                                        type="date"
                                        value={formData.birthDate}
                                        onChange={(val) => handleInputChange('birthDate', val)}
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
                                        label="Phụ huynh"
                                        value={formData.parentRelation}
                                        onChange={(val) => handleInputChange('parentRelation', val)}
                                        options={[{ value: 'Phụ huynh', label: 'Phụ huynh' }]}
                                    />

                                    <InputField
                                        label="SĐT phụ huynh"
                                        type="tel"
                                        value={formData.parentPhone}
                                        onChange={(val) => handleInputChange('parentPhone', val)}
                                        placeholder="097xxxxxxx"
                                    />

                                    {/* Address Selection */}
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
                                </div>

                                {/* Display Complete Address */}
                                {formData.address && (
                                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <span className="font-semibold text-blue-900">Địa chỉ đầy đủ:</span>{' '}
                                        <span className="text-blue-800">{formData.address}</span>
                                    </div>
                                )}
                            </div>

                            {/* Mô tả */}
                            <div className="mb-8">
                                <label className="block text-2xl mb-2">Mô tả</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Mô tả..."
                                    rows={6}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
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