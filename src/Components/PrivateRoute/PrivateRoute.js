import { useUserContext } from './../../Contexts/Context';
import { Navigate } from 'react-router-dom';

const Private = ({ role = "user", children }) => {
    const { token, user } = useUserContext();

    if (!token) return <Navigate replace to="/login" />;
    if (!user || user.role !== role) return <Navigate replace to="/404" />;
    return children;
}

export default Private;