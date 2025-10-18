import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import Cookies from "js-cookie";
import Api from "../../../api/Api";
import { toast } from "react-hot-toast";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = Cookies.get("token");

    const [nama_product, setNamaProduct] = useState("");
    const [harga, setHarga] = useState("");
    const [stok, setStok] = useState("");
    const [satuan_id, setSatuanId] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [img, setImg] = useState(null);
    const [oldImg, setOldImg] = useState(null);
    const [satuans, setSatuans] = useState([]);

    const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

    // 🔹 Ambil data produk berdasarkan ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await Api.get(`/product/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Jika respons terbungkus dalam {data: {...}}, sesuaikan
                const product = data.data || data;

                setNamaProduct(product.nama_product || "");
                setHarga(product.harga || "");
                setStok(product.stok || "");
                setSatuanId(product.satuan_id || "");
                setDeskripsi(product.deskripsi || "");
                setOldImg(product.img || null);
            } catch (error) {
                console.error("Gagal memuat data produk:", error);
                toast.error("Produk tidak ditemukan!");
                navigate("/admin/product");
            }
        };

        fetchProduct();
    }, [id, token, navigate]);

    // 🔹 Ambil data satuan
    useEffect(() => {
        const fetchSatuans = async () => {
            try {
                const { data } = await Api.get("/satuan", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSatuans(data.data || data);
            } catch (error) {
                console.error("Gagal mengambil data satuan:", error);
            }
        };
        fetchSatuans();
    }, [token]);

    // 🔹 Update produk
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("nama_product", nama_product);
        formData.append("harga", harga);
        formData.append("stok", stok);
        formData.append("satuan_id", satuan_id);
        formData.append("deskripsi", deskripsi);
        if (img) formData.append("img", img);

        try {
            await Api.post(`/product/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Produk berhasil diperbarui!");
            navigate("/admin/product");
        } catch (error) {
            console.error("Gagal memperbarui produk:", error.response || error);
            toast.error("Gagal memperbarui produk, periksa input!");
        }
    };

    return (
        <AdminLayout>
            <section className="p-3">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10 col-12">
                            <div className="card shadow-sm">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h4 className="mb-0">Edit Produk</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="row">
                                            {/* Nama Produk */}
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Nama Produk</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={nama_product}
                                                    onChange={(e) => setNamaProduct(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            {/* Harga */}
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Harga</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={harga}
                                                    onChange={(e) => setHarga(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            {/* Stok */}
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Stok</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={stok}
                                                    onChange={(e) => setStok(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            {/* Satuan */}
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Satuan</label>
                                                <select
                                                    className="form-select"
                                                    value={satuan_id}
                                                    onChange={(e) => setSatuanId(e.target.value)}
                                                    required
                                                >
                                                    <option value="">-- Pilih Satuan --</option>
                                                    {satuans.map((s) => (
                                                        <option key={s.id} value={s.id}>
                                                            {s.title}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Deskripsi */}
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Deskripsi</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="3"
                                                    value={deskripsi}
                                                    onChange={(e) => setDeskripsi(e.target.value)}
                                                ></textarea>
                                            </div>

                                            {/* Gambar Lama */}
                                            {oldImg && (
                                                <div className="col-12 mb-3 text-center">
                                                    <label className="form-label d-block">Gambar Lama</label>
                                                    <img
                                                        src={
                                                            oldImg.startsWith("http")
                                                                ? oldImg
                                                                : `${apiBaseUrl}/storage/product/${oldImg}`
                                                        }
                                                        alt="Gambar Produk Lama"
                                                        className="img-fluid rounded shadow-sm"
                                                        style={{
                                                            maxHeight: "100px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {/* Upload Gambar Baru */}
                                            <div className="col-12 mb-3">
                                                <label className="form-label">
                                                    Gambar Baru (Opsional)
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setImg(e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end gap-2">
                                            <button type="submit" className="btn btn-primary">
                                                Update
                                            </button>
                                            <Link to="/admin/product" className="btn btn-danger">
                                                Batal
                                            </Link>
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

export default EditProduct;
