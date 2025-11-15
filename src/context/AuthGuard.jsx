import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const AuthGuard = ({ children, roles }) => {
    const { user, isLoading } = useAuth();

    const NotFoundOrRedirect = () => {
        const { user } = useAuth();

        if (!user) return <Navigate to="/login" replace />;

        return <div>404 - Page not found</div>;
    };

    if (isLoading) return <div>Loading...</div>;

    // Chưa đăng nhập
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Không đủ quyền
    if (roles && !roles.includes(user.role)) {
        window.location.href = 'https://404-not-found-1qv6ftd.gamma.site/';
        return null;
    }

    return children;
};
