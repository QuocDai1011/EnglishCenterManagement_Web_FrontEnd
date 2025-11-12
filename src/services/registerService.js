import { authApi } from '../api/authApi';
import { toast } from 'sonner';

export const registerService = {
    register: async (data) => {
        try {
            const response = await authApi.register(data);
            toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
            return response;
        } catch (error) {
            toast.error('Có lỗi xảy ra khi đăng ký');
            throw error;
        }
    },

    sendOTP: async (email) => {
        try {
            const response = await authApi.sendOTP(email);
            toast.success('Đã gửi OTP đến email của bạn!');
            return response;
        } catch (error) {
            toast.error('Có lỗi xảy ra khi gửi OTP');
            throw error;
        }
    },

    verifyOTP: async (email, otp) => {
        try {
            const response = await authApi.verifyOTP(email, otp);
            toast.success('Xác thực OTP thành công!');
            return response;
        } catch (error) {
            toast.error('OTP sai hoặc hết hạn');
            throw error;
        }
    },
};
