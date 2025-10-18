import React, { use, useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../api/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {

    const navigate = useNavigate();
    const token = Cookies.get('token');

    const [nama_product, setNamaProduct] = useState("");
    const [harga, setHarga] = useState("");
    const [stok, setStok] = useState("");
    const [satuan_id, setSatuanId] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [img, setImg] = useState(null);
    const [satuans, setSatuans] = useState([]);

    useEffect(() => {
        const getSatuans = async () => {
            try {
                const { data } = await Api.get('/satuan', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setSatuans(data);
                // console.log(data);
            } catch (error) {
                console.error("Error fetching satuans:", error);
            }
        };
        getSatuans();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama_product', nama_product);
        formData.append('harga', harga);
        formData.append('stok', stok);
        formData.append('satuan_id', satuan_id);
        formData.append('deskripsi', deskripsi);
        if (img) formData.append("img", img);

        try {
            await Api.post('/product', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/admin/product');
            toast.success("Produk berhasil ditambahkan");
        } catch (error) {
            // console.error("Error creating product:", error);
            toast.error("Gagal menambahkan produk");
        }
    };


    return (
        <AdminLayout>
            <section id="basic-vertical-layouts" className="p-3">
                <div className="row match-height">
                    <div className="col-md-6 col-12">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h4 className="card-title">Tambah Data Produk</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <form className="form form-vertical" onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="form-body">
                                            <div className="row">

                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="first-name-vertical">Nama Produk</label>
                                                        <input
                                                            type="text"
                                                            id="nama_product"
                                                            value={nama_product}
                                                            className="form-control"
                                                            onChange={(e) => setNamaProduct(e.target.value)}
                                                            placeholder="Nama Produk"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="first-name-vertical">Harga</label>
                                                        <input
                                                            type="number"
                                                            id="harga"
                                                            value={harga}
                                                            onChange={(e) => setHarga(e.target.value)}
                                                            className="form-control"
                                                            placeholder="Harga"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="first-name-vertical">Stok</label>
                                                        <input
                                                            type="number"
                                                            id="stok"
                                                            value={stok}
                                                            onChange={(e) => setStok(e.target.value)}
                                                            className="form-control"
                                                            placeholder="Stok"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="first-name-vertical">Satuan</label>
                                                        <select
                                                            type="text"
                                                            id="satuan_id"
                                                            value={satuan_id}
                                                            onChange={(e) => setSatuanId(e.target.value)}
                                                            className="form-select"
                                                            placeholder="Nama Produk"
                                                        >
                                                            <option value="">-- Pilih Satuan --</option>
                                                            {satuans.map((satuan) => (
                                                                <option key={satuan.id} value={satuan.id}>
                                                                    {satuan.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="first-name-vertical">Deskripsi</label>
                                                        <textarea
                                                            type="text"
                                                            id="desksripsi"
                                                            value={deskripsi}
                                                            onChange={(e) => setDeskripsi(e.target.value)}
                                                            className="form-control"
                                                            placeholder="Deskripsi"
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="col-12 mb-3">
                                                    <label className="form-label">Gambar</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        onChange={(e) => setImg(e.target.files[0])}
                                                        accept="image/*"
                                                    />
                                                </div>

                                                {/* Buttons */}
                                                <div className="col-12 d-flex justify-content-end">
                                                    <button type="submit" className="btn btn-primary me-1 mb-1">
                                                        Simpan
                                                    </button>
                                                    <Link to="/admin/product" className="btn btn-danger me-1 mb-1">
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

export default CreateProduct;