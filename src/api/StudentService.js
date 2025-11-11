import axiosClient from "./axiosClient";

const StudentService = {
    getAll: () => axiosClient.get('/Student'),
    update: (id, data) => axiosClient.put(`/Student/${id}`, data),
    delete: (id) => axiosClient.delete(`/Student/${id}`),
    // Xóa mềm (deactivate)
    deactivate: (id) => axiosClient.patch(`/Student/${id}/soft-delete`),
    
    // Khôi phục (activate)
    activate: (id) => axiosClient.patch(`/Student/${id}/restore`),
    create: (data) => axiosClient.post('/Student', data),
}

export default StudentService;