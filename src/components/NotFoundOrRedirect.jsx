import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const NotFoundOrRedirect = () => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    return <div>404 - Page not found</div>;
};

export default NotFoundOrRedirect;
