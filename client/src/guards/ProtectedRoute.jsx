import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';


const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { token, user, loading } = useAppContext();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    if (!token) {
        toast.error("Please login to access this resource", { id: 'auth-error' });
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && user) {
        const hasPermission = allowedRoles.includes(user.role);
        if (!hasPermission) {
            toast.error("You are not authorized to view this page", { id: 'auth-forbidden' });
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
