import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Api from "../../../api/Api";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const OrderPageAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = Cookies.get("token");

    const baseURL = "http://localhost:8000/uploads/bukti_pembayaran/";

    useEffect(() => {
        if (!token) {
            toast.error("Token tidak ditemukan, silakan login ulang!");
            return;
        }

        Api.get("/order-masuk", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => setOrders(res.data.data || res.data))
            .catch((err) => {
                console.error("Gagal memuat data order:", err);
                toast.error("Gagal memuat data order!");
            })
            .finally(() => setLoading(false));
    }, [token]);

    const handleStatusChange = (id, status) => {
        Api.put(
            `/order/${id}`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(() => {
                toast.success("Status berhasil diperbarui");
                setOrders((prev) =>
                    prev.map((order) =>
                        order.id === id ? { ...order, status } : order
                    )
                );
            })
            .catch(() => toast.error("Gagal mengubah status"));
    };

    const handleDelete = (id) => {
        if (window.confirm("Yakin ingin hapus data ini?")) {
            Api.delete(`/order/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(() => {
                    toast.success("Data berhasil dihapus!");
                    setOrders((prev) => prev.filter((order) => order.id !== id));
                })
                .catch(() => toast.error("Gagal menghapus data!"));
        }
    };

    const getImageUrl = (url) => {
        if (!url) return null;
        return url.startsWith("http") ? url : `${baseURL}${url}`;
    };

    return (
        <AdminLayout>
            <div className="page-heading p-4">
                <h3>Data Order Masuk</h3>
                <section className="section mt-3">
                    <div className="card">
                        <div className="card-body table-responsive">
                            <table className="table table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Pemesan</th>
                                        <th>Alamat</th>
                                        <th>Metode Pengiriman</th>
                                        <th>Metode Pembayaran</th>
                                        <th>Bukti Pembayaran</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                Memuat data...
                                            </td>
                                        </tr>
                                    ) : orders.length > 0 ? (
                                        orders.map((order, index) => (
                                            <tr key={order.id}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{order.user?.name || "-"}</td>
                                                <td>{order.alamat || "-"}</td>
                                                <td>{order.metode_pengiriman || "-"}</td>
                                                <td>{order.metode_pembayaran || "-"}</td>
                                                <td className="text-center">
                                                    {order.bukti_pembayaran ? (
                                                        <a
                                                            href={getImageUrl(order.bukti_pembayaran)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <img
                                                                src={getImageUrl(order.bukti_pembayaran)}
                                                                alt="Bukti Pembayaran"
                                                                width="80"
                                                                height="80"
                                                                className="rounded border"
                                                                style={{ objectFit: "cover" }}
                                                            />
                                                        </a>
                                                    ) : (
                                                        <small className="text-muted">
                                                            Tidak ada bukti
                                                        </small>
                                                    )}
                                                </td>

                                                <td className="text-center">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(order.id, e.target.value)
                                                        }
                                                        className="form-select form-select-sm"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="verified">Verified</option>
                                                        <option value="done">Selesai</option>
                                                    </select>
                                                </td>

                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(order.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                Tidak ada data order
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default OrderPageAdmin;
