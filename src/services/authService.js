import api from '@/lib/axios';

const authService = async (data) => {
    await api
        .post('/Auth/login', data)
        .then((res) => console.log(res.body.data))
        .catch((err) => console.log(err));
};

export default authService;
