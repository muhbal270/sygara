import NavbarAdmin from "../components/Admin/NavbarAdmin";
import SidebarAdmin from "../components/Admin/SidebarAdmin";

const AdminLayout = ({ children }) => {
    return (
        <div className="d-flex min-vh-100">
            <SidebarAdmin />
            <div className="d-flex flex-column flex-grow-1">
                <NavbarAdmin />
                <main className="flex-grow-1 p-4 bg-body-secondary">{children}</main>
                <footer className="text-center p-3 bg-body-secondary">
                    Copyright &copy; All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;