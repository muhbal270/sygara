import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PrivateAdminRoutes = ({ children }) => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (token && role == '0') {
        return <Navigate to="/" replace />;
    }

    if (token && role == '1') {
        return children;
    }
}

export default PrivateAdminRoutes
