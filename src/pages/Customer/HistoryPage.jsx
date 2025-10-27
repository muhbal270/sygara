import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Spinner, Alert, Button } from 'react-bootstrap';
import NavbarComponent from '../../components/Customer/NavbarComponent';
import Api from '../../api/Api';
import Cookies from 'js-cookie';

const HistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = Cookies.get('token');

    const fetchOrders = async () => {
        if (!token) {
            setError('Token tidak ditemukan. Silakan login kembali.');
            setLoading(false);
            return;
        }

        try {
            const response = await Api.get('/order', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data.data || []);
            setError(null);
        } catch (error) {
            console.error('Gagal memuat data riwayat:', error);
            if (error.response?.status === 401) {
                setError('Sesi Anda telah berakhir. Silakan login kembali.');
            } else {
                setError('Gagal memuat data riwayat pesanan.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(); // panggil pertama kali

        // interval refresh otomatis tiap 5 detik
        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);

        // bersihkan interval saat komponen unmount
        return () => clearInterval(interval);
    }, [token]);

    // Ubah status angka ke label
    const getStatusLabel = (status) => {
        switch (status) {
            case 0:
                return 'Menunggu Pembayaran';
            case 1:
                return 'Dalam Proses';
            case 2:
                return 'Selesai';
            case 3:
                return 'Dibatalkan';
            default:
                return 'Tidak Diketahui';
        }
    };

    return (
        <>
            <NavbarComponent isLoggedIn={true} />

            <section className="history">
                <Container className="my-5">
                    <h3 className="text-success mb-3">Riwayat Belanja</h3>

                    <Row>
                        <Col>
                            {loading ? (
                                <div className="text-center my-5">
                                    <Spinner animation="border" variant="success" />
                                </div>
                            ) : error ? (
                                <Alert variant="danger" className="text-center">
                                    {error} <br />
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={fetchOrders}
                                        className="mt-2"
                                    >
                                        Coba Lagi
                                    </Button>
                                </Alert>
                            ) : orders.length === 0 ? (
                                <p className="text-center text-muted">Belum ada riwayat pesanan.</p>
                            ) : (
                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Tanggal Pemesanan</th>
                                            <th>Alamat</th>
                                            <th>Metode Pembayaran</th>
                                            <th>Metode Pengiriman</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            <tr key={order.id}>
                                                <td>{index + 1}</td>
                                                <td>{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                                                <td>{order.alamat || '-'}</td>
                                                <td className="text-uppercase">{order.metode_pembayaran || '-'}</td>
                                                <td>{order.metode_pengiriman || '-'}</td>
                                                <td
                                                    className={`fw-bold ${
                                                        order.status === 2
                                                            ? 'text-success'
                                                            : order.status === 1
                                                            ? 'text-warning'
                                                            : order.status === 0
                                                            ? 'text-secondary'
                                                            : 'text-danger'
                                                    }`}
                                                >
                                                    {getStatusLabel(order.status)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default HistoryPage;
