import React, { useEffect, useRef, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export function InputOTPDemo({ onClose, data }) {
    const modalRef = useRef(null);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Get both sendOTP and verifyOTP from useAuth
    const { sendOTP, verifyOTP } = useAuth();
    const { register } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose?.();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    // Resend OTP handler
    const handleSendOTP = async () => {
        try {
            setLoading(true);
            await sendOTP(data.email);
            toast.success('Mã OTP đã được gửi lại đến email của bạn.');
            // Toast is handled in AuthProvider
        } catch (error) {
            console.error('Lỗi khi gửi lại OTP:', error);
        } finally {
            setLoading(false);
        }
    };

    // Verify OTP handler
    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            toast.error('Vui lòng nhập đủ 6 chữ số OTP');
            return;
        }
        try {
            setLoading(true);
            await verifyOTP(data.email, otp);
            await register(data);
            toast.success('Xác thực OTP thành công! Vui lòng đăng nhập lại.');
            onClose?.();
            // Use navigate instead of Navigate component
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Lỗi khi xác thực OTP:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="min-h-screen flex items-center justify-center">
                <Card ref={modalRef} className="w-full max-w-md shadow-md border border-gray-200">
                    <CardContent className="flex flex-col items-center gap-6 py-10 px-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-semibold tracking-tight text-gray-800">Nhập mã OTP</h1>
                            <p className="text-gray-500 text-sm">
                                Mã xác thực gồm 6 chữ số đã được gửi đến email của bạn: **{data.email}**
                            </p>
                        </div>

                        {/* Ô nhập OTP */}
                        <div className="flex flex-col items-center gap-4">
                            <Label className="text-gray-700 font-medium">Mã OTP</Label>
                            <InputOTP maxLength={6} value={otp} onChange={setOtp} className="flex gap-2">
                                <InputOTPGroup className="flex gap-2">
                                    {[...Array(6)].map((_, i) => (
                                        <InputOTPSlot
                                            key={i}
                                            index={i}
                                            className="w-12 h-12 text-lg border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        {/* Nút xác nhận */}
                        <div className="w-full flex flex-col gap-3">
                            <Button
                                disabled={loading || otp.length !== 6}
                                onClick={handleVerifyOTP}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                {loading ? 'Đang xử lý...' : 'Xác nhận'}
                            </Button>

                            <Button
                                disabled={loading}
                                onClick={handleSendOTP}
                                variant="link"
                                className="text-sm text-indigo-600 hover:underline"
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
