import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPassword } from '~/components/ForgotPassword';
import { InputOTPDemo } from '~/components/otp';
import ResetPassword from '~/components/ResetPassword';

const Card = ({ children, ...props }) => (
    <div className={'bg-white shadow-xl rounded-xl ' + props.className}>{children}</div>
);
const CardContent = ({ children, ...props }) => <div className={'p-6 ' + props.className}>{children}</div>;
const Input = ({ className, ...props }) => (
    <input
        {...props}
        className={'w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 ' + className}
    />
);
const Label = ({ children, ...props }) => (
    <label {...props} className="font-medium block mb-1">
        {children}
    </label>
);

// Định nghĩa Schema (giữ nguyên)
const signInSchema = z.object({
    username: z.string().min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

const API_ENDPOINT = 'https://localhost:7069/api/Auth/login';

const SignInForm = () => {
    const { login, user, isLoading } = useAuth(); // Get user and isLoading state
    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null);
    const [showForgot, setShowForgot] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [email, setEmail] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, // isSubmitting được kiểm soát bởi useForm
    } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    // Add effect to handle navigation when user state changes
    useEffect(() => {
        if (user && !isLoading) {
            const redirectPath = user.role === 'Admin' ? '/admin' : user.role === 'Teacher' ? '/teacher' : '/'; // còn lại là Student
            navigate(redirectPath, { replace: true });
        }
    }, [user, isLoading, navigate]);

    // 2. Logic xử lý API
    const onSubmit = useCallback(
        async (formData) => {
            try {
                setApiError(null);
                await login(formData.username, formData.password);
            } catch (error) {
                console.error('Login error:', error);
                setApiError(error.message);
            }
        },
        [login],
    );
    // Remove the isSuccess check and return since we're using navigate
    return (
        <>
            <div className="min-h-screen w-full relative bg-white">
                {/* Purple Glow Top (Giữ nguyên style) */}
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
                    <div className="flex flex-col gap-[60px] w-full max-w-[480px] md:max-w-[768px]">
                        <Card className="overflow-hidden p-0 border-border">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="p-[24px] md:p-[32px] flex flex-col gap-[24px]"
                                >
                                    {/* Header - logo */}
                                    <div className="flex flex-col items-center text-center gap-[8px]">
                                        <a href="/" className="mx-auto block w-fit text-center">
                                            <img
                                                src="/logo.svg"
                                                className="w-[128px] object-cover"
                                                alt="logo"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        'https://placehold.co/128x40/AD6DF4/ffffff?text=LOGO';
                                                }}
                                            />
                                        </a>
                                        <h1 className="text-[24px] font-bold">Chào mừng quay lại</h1>
                                        <p className="text-[16px] text-muted-foreground text-balance">
                                            Đăng nhập vào tài khoản của bạn
                                        </p>
                                    </div>

                                    {/* Hiển thị lỗi API */}
                                    {apiError && (
                                        <div
                                            className="p-[12px] bg-red-100 border border-red-400 text-red-700 rounded-[8px] text-[14px]"
                                            role="alert"
                                        >
                                            {apiError}
                                        </div>
                                    )}

                                    {/* Username */}
                                    <div className="flex flex-col gap-[12px]">
                                        <div className="space-y-[8px]">
                                            <Label htmlFor="username" className="block text-[14px]">
                                                Email
                                            </Label>
                                            <Input
                                                type="text"
                                                id="username"
                                                placeholder="user@gmail.com"
                                                {...register('username')}
                                                className={errors.username ? 'border-red-500' : ''}
                                            />
                                            {errors.username && (
                                                <p className="text-[14px] text-red-500 mt-[4px]">
                                                    {errors.username.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-[12px]">
                                        <div className="space-y-[8px]">
                                            <Label htmlFor="password" className="block text-[14px]">
                                                Mật khẩu
                                            </Label>
                                            <Input
                                                type="password"
                                                id="password"
                                                {...register('password')}
                                                className={errors.password ? 'border-red-500' : ''}
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
                                        className="w-full h-[30px] text-2xl"
                                        disabled={isSubmitting || isLoading}
                                    >
                                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                    </Button>

                                    {/* Link đăng nhập */}
                                    <div className="text-center text-[14px] filex">
                                        <div>
                                            Chưa có tài khoản?{' '}
                                            <a href="/register" className="underline underline-offset-[4px]">
                                                Đăng ký
                                            </a>
                                        </div>
                                        <div>
                                            <Link
                                                onClick={() => setShowForgot(true)}
                                                className="underline underline-offset-[4px]"
                                            >
                                                Quên mật khẩu?
                                            </Link>
                                        </div>
                                    </div>
                                </form>

                                {/* Ảnh bên phải */}
                                <div className="bg-muted relative hidden md:block">
                                    <img
                                        src="/placeholder.png"
                                        alt="Image"
                                        className="absolute top-1/2 -translate-y-1/2 object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/400x400/AD6DF4/ffffff?text=LOGIN';
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Footer */}
                        <div className="text-[14px] text-balance px-[24px] text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-[4px]">
                            Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{' '}
                            <a href="#">Chính sách bảo mật</a> của chúng tôi.
                        </div>
                    </div>
                </div>
                <>
                    {showForgot && (
                        <ForgotPassword
                            onClose={() => setShowForgot(false)}
                            onNext={(email) => {
                                setEmail(email);
                                setShowOTP(true);
                            }}
                        />
                    )}
                    {showOTP && (
                        <InputOTPDemo
                            data={{ email }}
                            mode="resetPassword"
                            onClose={() => setShowOTP(false)}
                            onVerified={() => {
                                setShowReset(true);
                            }}
                        />
                    )}
                    {showReset && <ResetPassword email={email} onClose={() => setShowReset(false)} />}
                </>
            </div>
        </>
    );
};

export default SignInForm;
