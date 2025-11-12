import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { toast } from 'sonner';
import { authApi } from './authApi';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (email, password) => {
        try {
            const response = await authApi.login(email, password);
            // Make sure we update the user state after successful login
            await fetchCurrentUser();
            toast.success('Đăng nhập thành công!');
            return response;
        } catch (error) {
            toast.error(error.response?.data?.Message || 'Đăng nhập thất bại');
            throw error;
        }
    };

    // Modify fetchCurrentUser to check for auth cookie first
    const fetchCurrentUser = useCallback(async () => {
        setIsLoading(true);
        try {
            // Cứ gọi API. Backend sẽ dùng cookie gửi kèm để xác thực.
            const userData = await authApi.getCurrentUser();
            setUser(userData);
        } catch (error) {
            // Nếu API trả về 401/403/lỗi khác, tức là phiên không hợp lệ.
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Call fetchCurrentUser on mount
    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    const logout = async () => {
        try {
            await authApi.logout(); // Call logout API if you have one
            setUser(null);
            toast.success('Đăng xuất thành công');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Có lỗi xảy ra khi đăng xuất');
        }
    };

    // Add a useEffect to monitor user state changes
    useEffect(() => {
        console.log('Auth state changed:', { user, isLoading });
    }, [user, isLoading]);

    // Add sendOTP function
    const sendOTP = async (email) => {
        try {
            await authApi.sendOTP(email);
            toast.success('Mã OTP đã được gửi đến email của bạn');
            return true;
        } catch (error) {
            const message = error.response?.data?.message || 'Không thể gửi mã OTP';
            toast.error(message);
            throw error;
        }
    };

    // Add verifyOTP function
    const verifyOTP = async (email, otp) => {
        try {
            await authApi.verifyOTP(email, otp);
            toast.success('Xác thực OTP thành công');
            return true;
        } catch (error) {
            const message = error.response?.data?.message || 'Mã OTP không hợp lệ';
            toast.error(message);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await authApi.register(userData);
            toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Có lỗi xảy ra khi đăng ký');
        }
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        fetchCurrentUser,
        sendOTP,
        verifyOTP,
        register,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
