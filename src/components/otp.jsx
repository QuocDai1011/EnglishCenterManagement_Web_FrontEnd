import React, { useEffect, useRef, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export function InputOTPDemo({ data, mode, onClose, onVerified }) {
    const modalRef = useRef(null);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const firstInputRef = useRef(null);
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose?.(); // click ngoài thì gọi onClose để đóng modal
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const { sendOTP, verifyOTP, register } = useAuth();

    useEffect(() => {
        if (modalRef.current) {
            const firstInput = modalRef.current.querySelector('input');
            if (firstInput) firstInput.focus();
        }
    }, []);

    const handleSendOTP = async () => {
        try {
            setLoading(true);
            await sendOTP(data.email, mode);
            toast.success('Mã OTP đã được gửi lại đến email của bạn.');
        } catch (error) {
            console.error('Lỗi khi gửi lại OTP:', error);
            toast.error('Gửi mã OTP thất bại, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            toast.error('Vui lòng nhập đủ 6 chữ số OTP');
            return;
        }
        try {
            setLoading(true);
            await verifyOTP(data.email, otp);

            if (mode === 'register') {
                await register(data);
                toast.success('Xác thực OTP thành công! Vui lòng đăng nhập lại.');
                navigate('/login', { replace: true });
            } else if (mode === 'resetPassword') {
                toast.success('Xác thực OTP thành công! Vui lòng nhập mật khẩu mới.');
                onVerified?.(); // gọi callback cho parent render ResetPassword
                onClose?.();
            }
        } catch (error) {
            console.error('Lỗi khi xác thực OTP:', error);
            toast.error('Xác thực OTP thất bại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black/[0.4]">
            <div ref={ref} className="min-h-[100vh] flex items-center justify-center">
                <Card
                    ref={modalRef}
                    className="w-full max-w-[400px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-200"
                >
                    <CardContent className="flex flex-col items-center gap-[24px] py-[40px] px-[24px]">
                        <div className="text-center space-y-[8px]">
                            <h1 className="text-[24px] font-semibold tracking-tight text-gray-800">Nhập mã OTP</h1>
                            <p className="text-gray-500 text-[14px]">
                                Mã xác thực gồm 6 chữ số đã được gửi đến email của bạn: <strong>{data.email}</strong>
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-[16px]">
                            <Label className="text-gray-700 font-medium text-[14px]">Mã OTP</Label>
                            <InputOTP maxLength={6} value={otp} onChange={setOtp} className="flex gap-[8px]">
                                <InputOTPGroup className="flex gap-[8px]">
                                    {[...Array(6)].map((_, i) => (
                                        <InputOTPSlot
                                            key={i}
                                            index={i}
                                            ref={i === 0 ? firstInputRef : null}
                                            className="w-[48px] h-[48px] text-[18px] border rounded-[8px] focus:ring-[2px] focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        <div className="w-full flex flex-col gap-[12px]">
                            <Button
                                disabled={loading || otp.length !== 6}
                                onClick={handleVerifyOTP}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-[40px] text-[16px]"
                            >
                                {loading ? 'Đang xử lý...' : 'Xác nhận'}
                            </Button>

                            <Button
                                disabled={loading}
                                onClick={handleSendOTP}
                                variant="link"
                                className="text-[14px] text-indigo-600 hover:underline"
                            >
                                {loading ? 'Đang gửi...' : 'Gửi lại mã OTP'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
