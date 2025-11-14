import React, { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '~/context/authContext.jsx';

const ResetPassword = ({ email, onClose }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
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

    const handleSubmit = async () => {
        if (!password || !confirmPassword) {
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp');
            return;
        }

        setLoading(true);
        try {
            await resetPassword(email, password, confirmPassword);
            toast.success('Đặt lại mật khẩu thành công');
            onClose?.(); // <-- Thông báo parent đóng modal
        } catch (err) {
            toast.error('Đặt lại mật khẩu thất bại');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/[0.4]">
            <div ref={ref} className="bg-white p-6 rounded-lg w-full max-w-[400px] flex flex-col gap-4">
                <h2 className="text-[16px] font-semibold text-center mb-2">Đặt lại mật khẩu</h2>
                <p className="text-center text-gray-600 text-[10px] mb-4">Email: {email}</p>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 text-[16px] font-medium">Mật khẩu mới</label>
                        <Input
                            className="h-[30px]"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu mới"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 text-[16px] font-medium">Xác nhận mật khẩu</label>
                        <Input
                            className="h-[30px]"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Nhập lại mật khẩu"
                        />
                    </div>

                    <Button onClick={handleSubmit} className="w-full text-[16px] h-[30px] mt-2" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
