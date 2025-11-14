import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputOTPDemo } from '~/components/otp';
import { useAuth } from '../../context/authContext';
import { toast } from 'sonner';

const signUpSchema = z.object({
    firstname: z.string().min(1, 'Tên bắt buộc phải có'),
    lastname: z.string().min(1, 'Họ bắt buộc phải có'),
    email: z.email('Email không đúng định dạng'),
    gender: z.preprocess(
        (val) => val === 'true',
        z.boolean({
            required_error: 'Vui lòng chọn giới tính',
        }),
    ),
    address: z.string().min(1, 'Địa chỉ bắt buộc phải có'),
    date_of_birth: z.string().min(1, 'Ngày sinh bắt buộc phải có'),
    phone_number: z.string().min(10, 'Số điện thoại phải có ít nhất 10 chữ số'),
    phone_number_of_parents: z.string().min(10, 'Số điện thoại phụ huynh phải có ít nhất 10 chữ số'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Mật khẩu xác nhận phải có ít nhất 6 ký tự'),
});

const SignUpForm = () => {
    const { sendOTP } = useAuth(); // Get sendOTP from auth context
    const [showOtp, setShowOtp] = useState(false);
    const [data, setData] = useState(null);
    const {
        register, // Dùng để liên kết input với React Hook Form
        handleSubmit, // Dùng để xử lý sự kiện submit
        formState: { errors, isSubmitting }, // Dùng để lấy lỗi và trạng thái submit
    } = useForm({
        resolver: zodResolver(signUpSchema), // Áp dụng validation Zod
        defaultValues: {
            // Đặt giá trị mặc định cho form
            firstname: '',
            lastname: '',
            username: '',
            address: '',
            gender: '',
            date_of_birth: '',
            phone_number: '',
            phone_number_of_parents: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            if (data.password !== data.confirmPassword) {
                toast.error('Mật khẩu xác nhận không khớp!');
                return;
            }
            const payload = {
                firstName: data.firstname,
                lastName: data.lastname,
                username: data.email, // dùng email làm username
                email: data.email,
                address: data.address,
                gender: data.gender === 'Nam' ? true : false, // true nếu Nam, false nếu Nữ
                dateOfBirth: data.date_of_birth, // đúng kiểu yyyy-MM-dd
                phoneNumber: data.phone_number,
                phoneNumberOfParents: data.phone_number_of_parents,
                password: data.password,
                confirmPassword: data.confirmPassword,
            };

            // console.log('Dữ liệu gửi backend:', payload);
            // Lưu data để truyền vào InputOTPDemo
            setData(payload);
            // console.log('Dữ liệu đăng ký:', payload);

            // Gọi API gửi OTP
            await sendOTP(payload.email, 'register');

            // Nếu gửi OTP thành công, hiện form nhập OTP
            setShowOtp(true);
        } catch (error) {
            console.error('Lỗi khi gửi OTP:', error);
            toast.error('Gửi mã OTP thất bại, hoặc email đã được sử dụng.');
            // Toast error đã được xử lý trong authContext
        }
    };

    return (
        <>
            <div className="min-h-screen w-full relative bg-white">
                {/* Purple Glow Top */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: '#ffffff',
                        backgroundImage: `
                            radial-gradient(
                                circle at top center,
                                rgba(72, 187, 120, 0.5), /* xanh lục nhạt */
                                transparent 70%
                            )
                        `,
                        filter: 'blur(80px)',
                        backgroundRepeat: 'no-repeat',
                    }}
                />

                {/* Nội dung chính */}
                <div className="relative flex flex-col justify-center items-center min-h-screen w-full">
                    <div className="flex flex-col gap-[24px]">
                        <Card className="overflow-hidden p-0 border-border">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="p-[24px] md:p-[32px] flex flex-col gap-[16px]"
                                >
                                    {/* Header - logo */}
                                    <div className="flex flex-col items-center text-center gap-[8px]">
                                        <h1 className="text-[24px] font-bold">Tạo tài khoản</h1>
                                        <p className="text-[16px] text-muted-foreground text-balance">
                                            Chào mừng bạn, hãy đăng ký để bắt đầu
                                        </p>
                                    </div>

                                    {/* Họ và tên */}
                                    <div className="grid grid-cols-2 gap-[12px]">
                                        <div className="space-y-[8px]">
                                            <Label htmlFor="lastname" className="block text-[14px]">
                                                Họ
                                            </Label>
                                            <Input
                                                type="text"
                                                id="lastname"
                                                {...register('lastname')}
                                                className={`w-full h-[30px] m-0 p-0 ${
                                                    errors.lastname ? 'border-red-500' : ''
                                                }`}
                                            />
                                            {errors.lastname && (
                                                <p className="text-[14px] text-red-500 mt-[4px]">
                                                    {errors.lastname.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-[8px]">
                                            <Label htmlFor="firstname" className="block text-[14px]">
                                                Tên
                                            </Label>
                                            <Input
                                                type="text"
                                                id="firstName"
                                                {...register('firstname')}
                                                className={`w-full h-[30px] ${
                                                    errors.firstname ? 'border-red-500' : ''
                                                }`}
                                            />
                                            {errors.firstname && (
                                                <p className="text-[14px] text-red-500 mt-[4px]">
                                                    {errors.firstname.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col gap-[12px]">
                                        <div className="space-y-[8px]">
                                            <Label htmlFor="email" className="block text-[14px]">
                                                Email
                                            </Label>
                                            <Input
                                                type="text"
                                                id="email"
                                                placeholder="Nhập địa chỉ email của bạn"
                                                {...register('email')}
                                                className={`w-full h-[30px] ${errors.email ? 'border-red-500' : ''}`}
                                            />
                                            {errors.email && (
                                                <p className="text-[14px] text-red-500 mt-[4px]">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Địa chỉ */}
                                    <div className="flex flex-col gap-[12px]">
                                        <div className="space-y-[8px]">
                                            <Label htmlFor="address" className="block text-[14px]">
                                                Địa chỉ
                                            </Label>
                                            <Input
                                                type="text"
                                                id="address"
                                                {...register('address')}
                                                className={`w-full h-[30px] ${errors.address ? 'border-red-500' : ''}`}
                                            />
                                            {errors.address && (
                                                <p className="text-[14px] text-red-500 mt-[4px]">
                                                    {errors.address.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Giới tính và ngày sinh */}
                                    <div className="grid grid-cols-2 gap-[12px]">
                                        <div className="space-y-[8px]">
                                            <Label htmlFor="gender" className="block text-[14px]">
                                                Giới tính
                                            </Label>
                                            <select
                                                id="gender"
                                                {...register('gender')}
                                                className={`border rounded-md w-full h-[30px] ${
                                                    errors.gender ? 'border-red-500' : ''
                                                }`}
                                            >
                                                <option value="">-- Chọn giới tính --</option>
                                                <option value={true}>Nam</option>
                                                <option value={false}>Nữ</option>
                                            </select>
                                            {errors.gender && (
                                                <p className="text-[14px] text-red-500 mt-[4px]">
                                                    {errors.gender.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-[8px]">
                                            <Label htmlFor="date_of_birth" className="block text-[14px]">
                                                Ngày sinh
                                            </Label>
                                            <Input
                                                type="date"
                                                id="date_of_birth"
                                                {...register('date_of_birth')}
                                                className={`w-full h-[30px] ${
                                                    errors.date_of_birth ? 'border-red-500' : ''
                                                }`}
                                            />
                                            {errors.date_of_birth && (
                                                <p className="text-[14px] text-red-500 mt-[4px]">
                                                    {errors.date_of_birth.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Số điện thoại cá nhân và phụ huynh */}
                                    <div className="grid grid-cols-2 gap-[12px]">
                                        <div className="space-y-[8px]">
                                            <Label htmlFor="phone_number" className="block text-[14px]">
                                                Số điện thoại
                                            </Label>
                                            <Input
                                                type="tel"
                                                id="phone_number"
                                                {...register('phone_number')}
                                                className={`w-full h-[30px] ${
                                                    errors.phone_number ? 'border-red-500' : ''
                                                }`}
                                            />
                                            {errors.phone_number && (
                                                <p className="text-[14px] text-red-500 mt-[4px]">
                                                    {errors.phone_number.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-[8px]">
                                            <Label htmlFor="phone_number_of_parents" className="block text-[14px]">
                                                Số điện thoại phụ huynh
                                            </Label>
                                            <Input
                                                type="tel"
                                                id="phone_number_of_parents"
                                                {...register('phone_number_of_parents')}
                                                className={`w-full h-[30px] ${
                                                    errors.phone_number_of_parents ? 'border-red-500' : ''
                                                }`}
                                            />
                                            {errors.phone_number_of_parents && (
                                                <p className="text-[14px] text-red-500 mt-[4px]">
                                                    {errors.phone_number_of_parents.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="grid grid-cols-2 gap-[12px]">
                                        <div className="space-y-[8px]">
                                            <Label htmlFor="password" className="block text-[14px]">
                                                Mật khẩu
                                            </Label>
                                            <Input
                                                type="password"
                                                id="password"
                                                {...register('password')}
                                                className={`w-full h-[30px] ${errors.password ? 'border-red-500' : ''}`}
                                            />
                                            {errors.password && (
                                                <p className="text-[14px] text-red-500 mt-[4px]">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-[8px]">
                                            <Label htmlFor="password" className="block text-[14px]">
                                                Xác nhận mật khẩu
                                            </Label>
                                            <Input
                                                type="password"
                                                id="confirmPassword"
                                                {...register('confirmPassword', {
                                                    required: 'Xác nhận mật khẩu bắt buộc',
                                                })}
                                                className={`w-full h-[30px] ${errors.password ? 'border-red-500' : ''}`}
                                            />
                                            {errors.password && (
                                                <p className="text-[14px] text-red-500 mt-[4px]">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <Button
                                        type="submit"
                                        className="w-full h-[30px] text-2xl mb-[10px] cursor-pointer"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
                                    </Button>

                                    {/* Link đăng nhập */}
                                    <div className="text-center text-[14px]">
                                        Đã có tài khoản?{' '}
                                        <a href="/login" className="underline underline-offset-[4px]">
                                            Đăng nhập
                                        </a>
                                    </div>
                                </form>

                                {/* Ảnh bên phải */}
                                <div className="bg-muted relative hidden md:block">
                                    <img
                                        src="/placeholderSignUp.png"
                                        alt="Image"
                                        className="absolute top-1/2 -translate-y-1/2 object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Footer */}
                        <div className="text-[14px] text-balance px-[24px] text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-[4px]">
                            Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{' '}
                            <a href="#">Chính sách bảo mật</a> của chúng tôi.
                        </div>

                        {showOtp && (
                            <InputOTPDemo data={data} mode="register" onClose={() => setShowOtp(false)} onVerified />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;
