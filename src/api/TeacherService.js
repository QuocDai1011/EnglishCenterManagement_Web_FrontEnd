import axiosClient from "./axiosClient";

const TeacherService = {
    getAll: () => axiosClient.get('/Teacher'),
    create: (data) => axiosClient.post('/Teacher', data)
};

export default TeacherService;