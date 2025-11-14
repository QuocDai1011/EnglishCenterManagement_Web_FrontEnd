import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7069/api/Auth',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const authApi = {
    login: async (email, password) => {
        const response = await axiosInstance.post('/login', { email, password });
        return response.data;
    },

    logout: async () => {
        const response = await axiosInstance.post('/logout');
        return response.data;
    },

    register: async (data) => {
        const response = await axiosInstance.post('/register', data);
        return response.data;
    },

    sendResetPassword: async (email, mode) => {
        const response = await axiosInstance.post('/forgot-password', { email, mode });
        return response.data;
    },

    sendOTP: async (email, mode) => {
        const response = await axiosInstance.post('/send-otp', { email, mode });
        return response.data;
    },

    verifyOTP: async (email, otp) => {
        const response = await axiosInstance.post('/verify-otp', { email, otp });
        return response.data;
    },

    getCurrentUser: async () => {
        try {
            const response = await axiosInstance.get('/currentuser');
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                return null;
            }
            throw error;
        }
    },

    resetPassword: async (email, newPassword, confirmPassword) => {
        const response = await axiosInstance.post('/reset-password', { email, newPassword, confirmPassword });
        return response.data;
    },
};
