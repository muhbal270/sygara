import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PrivateCustomerRoutes = ({ children }) => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (token && role == '1') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    if (token && role == '0') {
        return children;
    }
}

export default PrivateCustomerRoutes;
