import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import NavbarComponent from '../../components/Customer/NavbarComponent';
import FooterComponent from '../../components/Customer/FooterComponent';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Api from '../../api/Api';
import { useNavigate } from 'react-router-dom';

import imgPayment from '../../assets/img-payment.png';
import imgMethod from '../../assets/ic-bca.png';

const PaymentPage = () => {
    const [order, setOrder] = useState(null);
    const [buktiBayar, setBuktiBayar] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = Cookies.get('token');
    const userId = Cookies.get('user_id');
    const navigate = useNavigate();

    // 🔹 Ambil data order terakhir user
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await Api.get(`/order`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const orders = Array.isArray(response.data.data) ? response.data.data : [];

                const lastOrder = orders
                    .filter((item) => item.user_id == userId)
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

                setOrder(lastOrder || null);
            } catch (error) {
                console.error('Gagal ambil data order:', error.response?.data || error.message);
                Swal.fire('Error', 'Gagal mengambil data pesanan!', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [token, userId]);

    // 🔹 Upload bukti pembayaran
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!buktiBayar) {
            Swal.fire('Peringatan', 'Silakan pilih file bukti pembayaran!', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append('bukti_pembayaran', buktiBayar);

        try {
            const response = await Api.post(
                `/upload-bukti-pembayaran/${order.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.status === 'success') {
                Swal.fire('Berhasil', 'Bukti pembayaran berhasil dikirim!', 'success')
                    .then(() => {
                        // 🔸 Alihkan ke halaman riwayat
                        navigate('/history');
                    });
            }
        } catch (error) {
            console.error('Gagal upload bukti pembayaran:', error.response?.data || error.message);
            Swal.fire('Error', 'Gagal upload bukti pembayaran!', 'error');
        }
    };

    if (loading) return <p className="text-center mt-5">Memuat data pembayaran...</p>;
    if (!order) return <p className="text-center mt-5">Tidak ada pesanan ditemukan.</p>;

    return (
        <>
            <NavbarComponent isLoggedIn={true} />

            <section className="payment mt-4 mb-5">
                <Container>
                    <h1 className="text-success mb-3">Menunggu Pembayaran</h1>
                    <Row className="d-flex align-items-center">
                        <Col lg={7}>
                            <Alert variant="warning">
                                Silahkan lakukan pembayaran sebelum <b>1 jam ke depan</b> atau pesanan akan dibatalkan.
                            </Alert>

                            <h6>Total yang harus dibayar</h6>
                            <h4 className="mb-4">
                                Rp {Number(order.total_harga || order.total || 0).toLocaleString('id-ID')}
                            </h4>

                            <h6>Metode Pembayaran</h6>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Row className="align-items-center">
                                        <Col md={4}>
                                            <img src={imgMethod} alt="bca" className="img-fluid" />
                                        </Col>
                                        <Col md={8}>
                                            {order.metode_pembayaran === 'bca' ? (
                                                <>
                                                    <h5>Transfer ke Bank BCA</h5>
                                                    <p>Nomor Rekening: <b>612009820028</b> (a.n Sygara)</p>
                                                </>
                                            ) : order.metode_pembayaran === 'gopay' ? (
                                                <>
                                                    <h5>Transfer via GoPay</h5>
                                                    <p>No. GoPay: <b>0812-3456-7890</b> (a.n Sygara)</p>
                                                </>
                                            ) : (
                                                <p>-</p>
                                            )}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <Form onSubmit={handleUpload}>
                                <Form.Group className="mb-3">
                                    <Form.Label><h6>Upload Bukti Pembayaran</h6></Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="bukti_bayar"
                                        onChange={(e) => setBuktiBayar(e.target.files[0])}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100 rounded-5">
                                    Konfirmasi Pembayaran
                                </Button>
                            </Form>
                        </Col>

                        <Col lg={5}>
                            <img src={imgPayment} alt="" className="img-payment img-fluid" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <FooterComponent />
        </>
    );
};

export default PaymentPage;
