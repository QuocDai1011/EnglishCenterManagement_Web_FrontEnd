import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '~/context/authContext.jsx';
import { Input } from './ui/input';

export function ForgotPassword({ onClose, onNext }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { sendResetPassword } = useAuth();

    const handleSubmit = async () => {
        if (!email) {
            toast.error('Vui lòng nhập email');
            return;
        }

        try {
            setLoading(true);
            await sendResetPassword(email, 'resetPassword');
            toast.success('OTP đã được gửi về Email của bạn!');
            onNext?.(email);
            onClose?.();
        } catch (error) {
            console.error('Lỗi gửi email:', error);
            toast.error('Gửi OTP thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white p-8 rounded-lg w-[360px] flex flex-col gap-4 shadow-lg">
                <h2 className="text-xl font-bold text-center">Quên mật khẩu</h2>
                <h3 className="text-xl text-center">Nhập email để đặt lại mật khẩu</h3>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email của bạn"
                    className="w-full h-[40px] border border-gray-300 rounded-lg p-2"
                />
                <Button onClick={handleSubmit} disabled={loading} className="text-[16px] h-[30px]">
                    {loading ? 'Đang gửi...' : 'Gửi email'}
                </Button>
                {/* <Button variant="outline" onClick={onClose} className="text-[16px] h-[30px]">
                    Hủy
                </Button> */}
            </div>
        </div>
    );
}
