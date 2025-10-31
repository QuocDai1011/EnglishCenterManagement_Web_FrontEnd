import axiosClient from "./axiosClient";

const MyClassService = {
    getAll: () => axiosClient.get("/Class"),
    createClass: (data) => axiosClient.post("/Class", data),
    updateClass: (id, data) => axiosClient.put(`/Class/${id}`, data)
};

export default MyClassService;