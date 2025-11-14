import axiosClient from "./axiosClient";

const AuthService = {
    logout: () => axiosClient.post('/Auth/logout'),
}

export default AuthService;