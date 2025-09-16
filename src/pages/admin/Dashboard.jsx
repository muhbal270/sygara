import AdminLayout from "../../layouts/AdminLayout";

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className="p-4">
                {/* Judul */}
                <div className="mb-4">
                    <h1 className="h3 fw-bold text-dark">Admin Dashboard</h1>
                    <p className="text-muted">
                        Welcome back! Manage users, view reports, and configure system settings here.
                    </p>
                </div>

                {/* Statistik singkat */}
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    <div className="col">
                        <div className="card shadow-sm border-0 rounded-3 h-100 dashboard-card">
                            <div className="card-body text-center py-4">
                                <i className="bi bi-people fs-1 text-primary"></i>
                                <h4 className="mt-3 mb-1 fw-bold">1,250</h4>
                                <p className="text-muted text-uppercase small mb-0">Total Users</p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card shadow-sm border-0 rounded-3 h-100 dashboard-card">
                            <div className="card-body text-center py-4">
                                <i className="bi bi-cart-check fs-1 text-success"></i>
                                <h4 className="mt-3 mb-1 fw-bold">480</h4>
                                <p className="text-muted text-uppercase small mb-0">Orders</p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card shadow-sm border-0 rounded-3 h-100 dashboard-card">
                            <div className="card-body text-center py-4">
                                <i className="bi bi-bar-chart-line fs-1 text-warning"></i>
                                <h4 className="mt-3 mb-1 fw-bold">75%</h4>
                                <p className="text-muted text-uppercase small mb-0">Reports</p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card shadow-sm border-0 rounded-3 h-100 dashboard-card">
                            <div className="card-body text-center py-4">
                                <i className="bi bi-gear fs-1 text-danger"></i>
                                <h4 className="mt-3 mb-1 fw-bold">Settings</h4>
                                <p className="text-muted text-uppercase small mb-0">Manage</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;