import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import NavbarComponent from '../../components/Customer/NavbarComponent';
import FooterComponent from '../../components/Customer/FooterComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Api from '../../api/Api';

const OrderPage = () => {
    const [keranjang, setKeranjang] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alamat, setAlamat] = useState('');
    const [pengiriman, setPengiriman] = useState('');
    const [pembayaran, setPembayaran] = useState('');
    const [user, setUser] = useState({ nama: '', telepon: '' });

    const token = Cookies.get('token');
    const userId = Cookies.get('user_id');
    const navigate = useNavigate();

    // 🔹 Ambil data user dari cookies
    useEffect(() => {
        if (token && userId) {
            setUser({
                nama: Cookies.get('name') || '',
                telepon: Cookies.get('nomor_telepon') || '',
            });
            setAlamat(Cookies.get('alamat') || '');
        }
    }, [token, userId]);

    // 🔹 Ambil data keranjang user dari API
    useEffect(() => {
        const fetchKeranjang = async () => {
            if (!token || !userId) return;

            try {
                const response = await Api.get(`/keranjang-user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setKeranjang(response.data || []);
            } catch (error) {
                console.error('Gagal ambil data keranjang:', error.response?.data || error.message);
                setKeranjang([]);
            } finally {
                setLoading(false);
            }
        };

        fetchKeranjang();
    }, [token, userId]);

    // 🔹 Hitung total harga & berat
    const totalHarga = keranjang.reduce(
        (sum, item) => sum + (item.product?.harga || 0) * item.quantity,
        0
    );

    const totalBerat = keranjang.reduce(
        (sum, item) => sum + (item.product?.berat || 0) * item.quantity,
        0
    );

    // 🔹 Kirim data order ke backend
    const handleConfirmOrder = async (event) => {
        event.preventDefault();

        if (!alamat || !pengiriman || !pembayaran) {
            Swal.fire('Peringatan', 'Lengkapi semua data pengiriman & pembayaran!', 'warning');
            return;
        }

        Swal.fire({
            title: 'Pesanan sudah benar?',
            text: 'Silakan cek kembali detail pesanan sebelum lanjut',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Lanjut Bayar',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#198754',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const payload = {
                        user_id: userId, // penting agar tersimpan di DB
                        alamat,
                        metode_pengiriman: pengiriman,
                        metode_pembayaran: pembayaran,
                    };

                    const response = await Api.post('/order', payload, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    console.log('Order response:', response.data);

                    Swal.fire('Berhasil!', 'Pesanan berhasil dibuat.', 'success').then(() => {
                        navigate('/payment');
                    });
                } catch (error) {
                    console.error('Gagal membuat order:', error.response?.data || error.message);
                    Swal.fire('Error', 'Gagal membuat pesanan!', 'error');
                }
            }
        });
    };

    return (
        <>
            <NavbarComponent isLoggedIn={true} />
            <section className="order">
                <Container>
                    <Link to="/cart" className="text-success">
                        <FontAwesomeIcon icon={faAngleLeft} /> Kembali ke Keranjang
                    </Link>
                    <h1 className="text-success mt-3">Check Out</h1>

                    {loading ? (
                        <p>Memuat...</p>
                    ) : (
                        <Form onSubmit={handleConfirmOrder}>
                            <Row className="mt-3">
                                {/* ===================== INFORMASI PENGIRIMAN ===================== */}
                                <Col lg={6}>
                                    <h4 className="text-success">Informasi Pengiriman</h4>

                                    <Row className="mb-3">
                                        <Col lg={6}>
                                            <Form.Group>
                                                <Form.Label>Nama Pembeli</Form.Label>
                                                <Form.Control type="text" value={user.nama} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group>
                                                <Form.Label>Nomor Telepon</Form.Label>
                                                <Form.Control type="text" value={user.telepon} disabled />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Alamat</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="cth. Jalan Jendral Sudirman, disamping gang"
                                            value={alamat}
                                            onChange={(e) => setAlamat(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Metode Pengiriman</Form.Label>
                                        <Form.Select
                                            value={pengiriman}
                                            onChange={(e) => setPengiriman(e.target.value)}
                                        >
                                            <option value="">-- Pilih Metode Pengiriman --</option>
                                            <option value="reguler">Reguler | Rp 10.000 (3 jam)</option>
                                            <option value="ekspres">Ekspres | Rp 20.000 (1 jam)</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Metode Pembayaran</Form.Label>
                                        <Form.Select
                                            value={pembayaran}
                                            onChange={(e) => setPembayaran(e.target.value)}
                                        >
                                            <option value="">-- Pilih Metode Pembayaran --</option>
                                            <option value="gopay">Gopay</option>
                                            <option value="bca">Transfer Bank BCA</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                {/* ===================== RINGKASAN BELANJA ===================== */}
                                <Col lg={6}>
                                    <Card className="rounded-5 p-3 shadow-sm border-0">
                                        <Card.Body>
                                            <h4 className="text-success mb-3">Ringkasan Belanja</h4>

                                            {keranjang.map((item) => (
                                                <Row key={item.id} className="mb-3 align-items-center">
                                                    <Col lg={3}>
                                                        <img
                                                            src={
                                                                item.product?.img?.startsWith('http')
                                                                    ? item.product.img
                                                                    : `${import.meta.env.VITE_API_URL}/storage/product/${item.product?.img}`
                                                            }
                                                            alt={item.product?.nama_product || 'Produk'}
                                                            width="100%"
                                                            className="border rounded-4"
                                                        />
                                                    </Col>
                                                    <Col lg={9}>
                                                        <div className="d-flex justify-content-between">
                                                            <h6>{item.product?.nama_product}</h6>
                                                            <p className="text-success mb-0">
                                                                Rp {item.product?.harga?.toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <small>
                                                            {item.quantity} x {item.product?.berat} kg
                                                        </small>
                                                    </Col>
                                                </Row>
                                            ))}

                                            <hr />

                                            <Row>
                                                <Col>
                                                    <p>Berat Total</p>
                                                </Col>
                                                <Col className="text-end">
                                                    <p>{totalBerat} kg</p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>Metode Pengiriman</p>
                                                </Col>
                                                <Col className="text-end">
                                                    <p>
                                                        {pengiriman === 'ekspres'
                                                            ? 'Ekspres | Rp 20.000'
                                                            : pengiriman === 'reguler'
                                                            ? 'Reguler | Rp 10.000'
                                                            : '-'}
                                                    </p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>Metode Pembayaran</p>
                                                </Col>
                                                <Col className="text-end">
                                                    <p>
                                                        {pembayaran === 'bca'
                                                            ? 'Transfer BCA'
                                                            : pembayaran === 'gopay'
                                                            ? 'Gopay'
                                                            : '-'}
                                                    </p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <h5>Total</h5>
                                                </Col>
                                                <Col className="text-end">
                                                    <h5 className="text-success">
                                                        Rp
                                                        {(
                                                            totalHarga +
                                                            (pengiriman === 'ekspres'
                                                                ? 20000
                                                                : pengiriman === 'reguler'
                                                                ? 10000
                                                                : 0)
                                                        ).toLocaleString()}
                                                    </h5>
                                                </Col>
                                            </Row>

                                            <Button
                                                type="submit"
                                                variant="success"
                                                className="w-100 mt-3 rounded-5"
                                            >
                                                Bayar Sekarang
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Container>
            </section>
            <FooterComponent />
        </>
    );
};

export default OrderPage;
