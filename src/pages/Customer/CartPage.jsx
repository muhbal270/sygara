import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/Customer/FooterComponent";
import NavbarComponent from "../../components/Customer/NavbarComponent";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Api from "../../api/Api";

import imgEmptyCart from "../../assets/img-empty-cart.png";

const CartPage = () => {
    // 🔹 State untuk menyimpan data keranjang dari API
    const [keranjang, setKeranjang] = useState([]);

    // 🔹 State untuk menandakan proses loading data
    const [loading, setLoading] = useState(true);

    // 🔹 State jumlah (belum digunakan penuh, bisa dikembangkan nanti)
    const [jumlah, setJumlah] = useState(1);

    // 🔹 Ambil data token & user_id dari cookies (digunakan untuk autentikasi)
    const token = Cookies.get("token");
    const userId = Cookies.get("user_id"); // diset saat login

    // ========================================
    // 🔹 FUNGSI: Ambil data keranjang user dari server
    // ========================================
    useEffect(() => {
        const fetchKeranjang = async () => {
            try {
                // 🔸 Panggil API dengan autentikasi Bearer token
                const response = await Api.get(`/keranjang-user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("Data keranjang:", response.data);
                setKeranjang(response.data || []);
            } catch (error) {
                console.log("⚠️ Gagal ambil data keranjang:", error.response?.data || error.message);
                setKeranjang([]); // fallback jika gagal
            } finally {
                setLoading(false); // hentikan indikator loading
            }
        };

        // Jalankan hanya jika user sudah login
        if (token && userId) {
            fetchKeranjang();
        } else {
            console.warn("⚠️ Token atau user_id tidak ditemukan di Cookies.");
            setLoading(false);
        }
    }, [token, userId]);

    // ========================================
    // 🔹 FUNGSI: Hapus item dari keranjang
    // ========================================
    const handleRemoveItem = async (id) => {
        Swal.fire({
            title: "Yakin ingin hapus?",
            text: "Anda bisa menambahkannya kembali di halaman produk.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "red",
            customClass: {
                confirmButton: "rounded-pill",
                cancelButton: "rounded-pill",
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // 🔸 Hapus item di server
                    await Api.delete(`/keranjang/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    // 🔸 Update state agar UI langsung berubah
                    setKeranjang((prev) => prev.filter((item) => item.id !== id));

                    Swal.fire("Dihapus!", "Item berhasil dihapus dari keranjang.", "success");
                } catch (error) {
                    console.error(error);
                    Swal.fire("Gagal", "Tidak dapat menghapus item.", "error");
                }
            }
        });
    };

    // ========================================
    // 🔹 FUNGSI: Arahkan user ke halaman checkout/order
    // ========================================
    const handleBuyClick = () => {
        window.location.href = "/order";
    };

    // ========================================
    // 🔹 HITUNG TOTAL HARGA
    // ========================================
    const totalHarga = keranjang.reduce(
        (sum, item) => sum + (item.product?.harga || 0) * item.quantity,
        0
    );

    // ========================================
    // 🔹 RENDER UI
    // ========================================
    return (
        <>
            {/* 🔸 Navbar */}
            <NavbarComponent isLoggedIn={true} />

            <section className="cart">
                <Container>
                    <h2 className="text-success mb-3">Keranjang Belanja</h2>

                    {/* 🔹 Tampilkan loading, kosong, atau daftar item */}
                    {loading ? (
                        <p>Memuat...</p>
                    ) : keranjang.length === 0 ? (
                        // Jika keranjang kosong
                        <div className="text-center mt-5 mb-5">
                            <h4>
                                Keranjang masih kosong :(,{" "}
                                <Link to="/product" className="text-success">
                                    Ayo Belanja Sekarang!
                                </Link>
                            </h4>
                            <img src={imgEmptyCart} alt="Empty Cart" className="img-fluid" />
                        </div>
                    ) : (
                        <Row>
                            {/* ========================================
                                🔸 BAGIAN KIRI: Daftar Produk dalam Keranjang
                            ======================================== */}
                            <Col lg={6}>
                                {keranjang.map((item) => (
                                    <Card key={item.id} className="mb-3 rounded-5 shadow-sm border-0">
                                        <Row className="align-items-center">
                                            {/* Gambar Produk */}
                                            <Col md={4}>
                                                <img
                                                    src={
                                                        item.product?.img?.startsWith("http")
                                                            ? item.product.img
                                                            : `${import.meta.env.VITE_API_URL}/storage/product/${item.product?.img}`
                                                    }
                                                    alt={item.product?.nama_product || "Produk"}
                                                    className="img-fluid rounded-4 border"
                                                    style={{
                                                        maxHeight: "150px",
                                                        objectFit: "cover",
                                                        width: "100%",
                                                    }}
                                                />
                                            </Col>

                                            {/* Detail Produk */}
                                            <Col md={8}>
                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                            <h5>{item.product?.nama_product}</h5>
                                                        </Col>
                                                        <Col className="d-flex justify-content-end">
                                                            <h5 className="text-success">
                                                                Rp{" "}
                                                                {item.product?.harga
                                                                    ? item.product.harga.toLocaleString()
                                                                    : 0}
                                                            </h5>
                                                        </Col>
                                                    </Row>

                                                    {/* Input jumlah & tombol hapus */}
                                                    <Form className="mt-2">
                                                        <Row className="align-items-center">
                                                            <Form.Label>Jumlah</Form.Label>
                                                            <Col lg={8}>
                                                                <Form.Control
                                                                    type="number"
                                                                    max={10}
                                                                    min={1}
                                                                    value={item.quantity}
                                                                    onChange={(e) =>
                                                                        setJumlah(e.target.value)
                                                                    }
                                                                />
                                                            </Col>

                                                            <Col
                                                                lg={4}
                                                                className="d-flex justify-content-end"
                                                            >
                                                                <Button
                                                                    variant="outline-danger"
                                                                    onClick={() =>
                                                                        handleRemoveItem(item.id)
                                                                    }
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))}
                            </Col>

                            {/* ========================================
                                🔸 BAGIAN KANAN: Ringkasan Belanja
                            ======================================== */}
                            <Col lg={6}>
                                <Card className="rounded-5 shadow-sm border-0">
                                    <Card.Body className="p-4">
                                        <h3>Ringkasan Belanja</h3>
                                        {/* <h6>Total Berat : {totalBerat} kg</h6> */}
                                        <h6 className="mt-3">
                                            Subtotal : Rp {totalHarga.toLocaleString()}
                                        </h6>

                                        <Button
                                            variant="success"
                                            className="w-100 mt-3 rounded-5"
                                            onClick={handleBuyClick}
                                        >
                                            Beli
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>

            {/* 🔸 Footer */}
            <FooterComponent />
        </>
    );
};

export default CartPage;
