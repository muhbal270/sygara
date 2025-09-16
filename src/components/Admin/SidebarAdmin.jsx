import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBox, faClipboardList, faLandmark, faTruck, faUsers, faRectangleAd, faCopy, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const SidebarAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navItems = [
        { name: "Template", icon: faCopy, path: "/admin/template" },
        { name: "Dashboard", icon: faHome, path: "/admin/dashboard" },
        { name: "Bank", icon: faLandmark, path: "/admin/bank" },
        { name: "Banner", icon: faRectangleAd, path: "/admin/banner" },
        { name: "Courier", icon: faTruck, path: "/admin/courier" },
        { name: "Order", icon: faClipboardList, path: "/admin/order" },
        { name: "Product", icon: faBox, path: "/admin/product" },
        { name: "User", icon: faUsers, path: "/admin/user" },
    ];

    return (
        <aside
            className="d-flex flex-column vh-100 bg-dark text-light border-end border-secondary"
            style={{
                width: collapsed ? "80px" : "240px",
                transition: "width 0.3s ease",
            }}
        >
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
                {!collapsed && <h5 className="fw-semibold mb-0">Admin Panel</h5>}
                <button
                    className="btn btn-sm btn-outline-light d-flex justify-content-center ms-2"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>

            {/* Navigation */}
            <Nav variant="pills" className="flex-column p-3 mt-2">
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center mb-2 ${collapsed ? "justify-content-center" : ""
                            } ${isActive ? "active" : "text-light"}`
                        }
                        style={{ fontWeight: 400, fontSize: "16px" }}
                    >
                        <FontAwesomeIcon
                            icon={item.icon}
                            className={!collapsed ? "me-2" : ""}
                            style={{ fontSize: "14px" }}
                        />
                        {!collapsed && item.name}
                    </NavLink>
                ))}
            </Nav>

            {/* Footer */}
            <div className="mt-auto p-3 border-top border-secondary small">
                {!collapsed && (
                    <>
                        <div className="fw-semibold">Admin User</div>
                        <div className="text-secondary">admin@example.com</div>
                    </>
                )}
            </div>
        </aside>
    );
};

export default SidebarAdmin;