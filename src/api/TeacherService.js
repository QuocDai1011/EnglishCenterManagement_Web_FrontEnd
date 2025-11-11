import axiosClient from "./axiosClient";

const TeacherService = {
    getAll: () => axiosClient.get('/Teacher'),
};

export default TeacherService;