import React, { useState, useCallback, useEffect } from 'react';
// Giả định các components UI này đã được định nghĩa ở đâu đó
// Trong môi trường thực tế, bạn sẽ cần định nghĩa chúng hoặc import từ thư viện UI
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
const Button = ({ children, ...props }) => (
    <button
        {...props}
        className={
            'px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 ' + props.className


            
        }
    >
        {children}
    </button>
);
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

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
            navigate('/admin', { replace: true });
        }
    }, [user, isLoading, navigate]);

    // 2. Logic xử lý API
    const onSubmit = useCallback(
        async (formData) => {
            try {
                setApiError(null);
                await login(formData.username, formData.password);
                // Navigation will happen automatically through the useEffect
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
                          rgba(173, 109, 244, 0.5),
                          transparent 70%
                        )
                      `,
                        filter: 'blur(80px)',
                        backgroundRepeat: 'no-repeat',
                    }}
                />

                {/* Nội dung chính */}
                <div className="relative flex flex-col justify-center items-center min-h-screen w-full ">
                    <div className="flex flex-col gap-6 w-full max-w-md md:max-w-3xl">
                        <Card className="overflow-hidden p-0 border-border">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                {/* Dùng onSubmit đã định nghĩa */}
                                <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 flex flex-col gap-6">
                                    {/* header - logo (Giữ nguyên) */}
                                    <div className="flex flex-col items-center text-center gap-2">
                                        <a href="/" className="mx-auto block w-fit text-center">
                                            {/* Thêm fallback cho ảnh */}
                                            <img
                                                src="/logo.svg"
                                                className="w-32 object-cover"
                                                alt="logo"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        'https://placehold.co/128x40/AD6DF4/ffffff?text=LOGO';
                                                }}
                                            />
                                        </a>
                                        <h1 className="text-2xl font-bold">Chào mừng quay lại</h1>
                                        <p className="text-muted-foreground text-balance">
                                            Đăng nhập vào tài khoản của bạn
                                        </p>
                                    </div>

                                    {/* 4. Hiển thị lỗi API chung */}
                                    {apiError && (
                                        <div
                                            className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
                                            role="alert"
                                        >
                                            {apiError}
                                        </div>
                                    )}

                                    {/* Username */}
                                    <div className="flex flex-col gap-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="username" className="block text-sm">
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
                                                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="block text-sm">
                                                Mật khẩu
                                            </Label>
                                            <Input
                                                type="password"
                                                id="password"
                                                {...register('password')}
                                                className={errors.password ? 'border-red-500' : ''}
                                            />
                                            {errors.password && (
                                                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
                                        {/* Hiển thị trạng thái tải */}
                                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                    </Button>

                                    {/* Link đăng nhập (Giữ nguyên) */}
                                    <div className="text-center text-sm">
                                        Chưa có tài khoản?{' '}
                                        <a href="/register" className="underline underline-offset-4">
                                            Đăng ký
                                        </a>
                                    </div>
                                </form>

                                {/* Ảnh bên phải (Giữ nguyên) */}
                                <div className="bg-muted relative hidden md:block">
                                    <img
                                        src="/placeholder.png"
                                        alt="Image"
                                        className="absolute top-1/2 -translate-y-1/2 object-cover"
                                        // Thêm fallback cho ảnh
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/400x400/AD6DF4/ffffff?text=LOGIN';
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Footer (Giữ nguyên) */}
                        <div className="text-sm text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-4">
                            Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{' '}
                            <a href="#">Chính sách bảo mật</a> của chúng tôi.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignInForm;
