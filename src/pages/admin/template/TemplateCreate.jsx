import React from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { Link } from "react-router-dom";

const TemplateCreate = () => {
    return (
        <AdminLayout>
            <section id="basic-vertical-layouts" className="p-3">
                <div className="row match-height">
                    <div className="col-md-6 col-12">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h4 className="card-title">Tambah Data</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <form className="form form-vertical">
                                        <div className="form-body">
                                            <div className="row">
                                                {/* First Name */}
                                                <div className="col-12 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="first-name-vertical">First Name</label>
                                                        <input
                                                            type="text"
                                                            id="first-name-vertical"
                                                            className="form-control"
                                                            name="fname"
                                                            placeholder="First Name"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div className="col-12 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="email-id-vertical">Email</label>
                                                        <input
                                                            type="email"
                                                            id="email-id-vertical"
                                                            className="form-control"
                                                            name="email"
                                                            placeholder="Email"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Mobile */}
                                                <div className="col-12 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="contact-info-vertical">Mobile</label>
                                                        <input
                                                            type="number"
                                                            id="contact-info-vertical"
                                                            className="form-control"
                                                            name="contact"
                                                            placeholder="Mobile"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Password */}
                                                <div className="col-12 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="password-vertical">Password</label>
                                                        <input
                                                            type="password"
                                                            id="password-vertical"
                                                            className="form-control"
                                                            name="password"
                                                            placeholder="Password"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Buttons */}
                                                <div className="col-12 d-flex justify-content-end">
                                                    <button type="submit" className="btn btn-primary me-1 mb-1">
                                                        Simpan
                                                    </button>
                                                    <Link to="/admin/template" className="btn btn-danger me-1 mb-1">
                                                        Batal
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
};

export default TemplateCreate;