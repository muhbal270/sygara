import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const NavbarAdmin = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary px-4">
            <div className="container-fluid">
                <div className="d-flex align-items-center ms-auto gap-3">
                    {/* Dropdown User */}
                    <div className="dropdown">
                        <button
                            className="btn btn-sm d-flex align-items-center text-light dropdown-toggle border-0 bg-transparent"
                            id="navbarDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle me-2 bg-primary text-white"
                                style={{ width: "32px", height: "32px" }}
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <span>Admin</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="navbarDropdown">
                            <li>
                                <Link className="dropdown-item text-danger" to="/logout">
                                    <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarAdmin;