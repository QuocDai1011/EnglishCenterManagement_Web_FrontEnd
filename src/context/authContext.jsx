import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
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
            return response;
        } catch (error) {
            console.error('Lỗi khi đăng nhập', error);
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
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    // Add a useEffect to monitor user state changes
    useEffect(() => {
        console.log('Auth state changed:', { user, isLoading });
    }, [user, isLoading]);

    // Add sendOTP function
    const sendOTP = async (email, mode) => {
        try {
            await authApi.sendOTP(email, mode);
            return true;
        } catch (error) {
            console.error('Lỗi khi gửi OTP', error);
            throw error;
        }
    };

    // Add verifyOTP function
    const verifyOTP = async (email, otp) => {
        try {
            await authApi.verifyOTP(email, otp);
            return true;
        } catch (error) {
            console.error('Lỗi xác thực OTP', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await authApi.register(userData);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const sendResetPassword = async (email, mode) => {
        try {
            await authApi.sendResetPassword(email, mode); // gửi thẳng email
            return true;
        } catch (error) {
            console.error('Send reset password error:', error);
            throw error;
        }
    };

    const resetPassword = async (email, newPassword, confirmPassword) => {
        try {
            await authApi.resetPassword(email, newPassword, confirmPassword);
        } catch (error) {
            console.error('Reset password error:', error);
            throw error;
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
        sendResetPassword,
        resetPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
