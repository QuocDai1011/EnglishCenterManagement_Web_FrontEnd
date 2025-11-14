import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const AuthGuard = ({ children, roles }) => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                navigate('/login', { replace: true });
            } else if (roles && !roles.includes(user.role)) {
                navigate('/', { replace: true }); // hoặc trang lỗi 403
            }
        }
    }, [user, isLoading, navigate, roles]);

    if (isLoading) return <div>Loading...</div>;
    if (!user) return null;

    return children;
};
