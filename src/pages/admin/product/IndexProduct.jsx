import AdminLayout from '../../../layouts/AdminLayout'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Api from '../../../api/Api';

const IndexProduct = () => {

    const [products, setProducts] = useState([]);

    const token = Cookies.get('token');

    const getDataProduct = async () => {
        try {
            const response = await Api.get('/product', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            // console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getDataProduct();
    }, []);

    // contoh data dummy
    // const handleDelete = (e) => {
    //     e.preventDefault();
    //     if (window.confirm("Yakin ingin hapus data ini ?")) {
    //         console.log("Data dihapus");
    //     }
    // };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin hapus data ini ?")) {
            try {
                await Api.delete(`/product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                alert("Data berhasil dihapus");
                // Refresh data produk setelah penghapusan
                getDataProduct();
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Gagal menghapus data");
            }
        }
    };

    return (
        <AdminLayout>
            <div className="page-heading p-4">
                <div className="page-title mb-3">
                    <div className="row">
                        <div className="col-12 col-md-6 order-md-1 order-last">
                            <h3>Data Product</h3>
                        </div>
                    </div>
                </div>

                <section className="section">
                    <div className="card">
                        <div className="card-header">
                            <Link to="/admin/product/create" className="btn btn-primary">
                                + Tambah
                            </Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped" id="table1">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Gambar</th>
                                        <th>Nama Produk</th>
                                        <th>Harga</th>
                                        <th>Stok</th>
                                        <th>Satuan</th>
                                        <th>Deskripsi</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length !== 0 ? (
                                        products.map((product, index) => (
                                            <tr key={product.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {product.img ? (
                                                        <img
                                                            src={product.img.startsWith('http') ? product.img : `${import.meta.env.VITE_API_URL}/storage/product${product.img}`}
                                                            alt={product.nama_product}
                                                            width={100}
                                                        />
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                                <td>{product.nama_product}</td>
                                                <td>Rp {product.harga.toLocaleString()}</td>
                                                <td>{product.stok}</td>
                                                <td>{product.satuan?.title}</td>
                                                <td>{product.deskripsi}</td>
                                                <td>
                                                    <Link to={`/admin/product/edit/${product.id}`} className="btn btn-sm btn-primary me-1">
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </Link>
                                                    <button onClick={() => handleDelete(product.id)}
                                                        className='btn btn-sm btn-danger'>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                Tidak ada data produk.
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
    )
}

export default IndexProduct;