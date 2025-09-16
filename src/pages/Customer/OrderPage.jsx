import { Container, Row, Col, Form, Card, Button, FormControl } from 'react-bootstrap';
import NavbarComponent from '../../components/Customer/NavbarComponent';
import FooterComponent from '../../components/Customer/FooterComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import Swal from "sweetalert2";

import imgProduct from '../../assets/img-semangka.png'

const OrderPage = () => {
    
    const handleConfirmOrder = (event) => {
        event.preventDefault();

        Swal.fire({
            title: "Pesanan sudah benar?",
            text: "Silahkan cek kembali detail pesanan sebelum lanjut",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Lanjut Bayar",
            cancelButtonText: "Batal",
            confirmButtonColor: '#198754',
            customClass: {
                confirmButton: "rounded-pill",
                cancelButton: "rounded-pill"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/payment';
            }
        });
    }

    return (
        <>
            <NavbarComponent isLoggedIn={true} />

            <section className="order">
                <Container>
                    <Link to="/cart" className='text-success'><FontAwesomeIcon icon={faAngleLeft} /> Kembali ke Keranjang</Link>
                    <h1 className="text-success mt-3">Check Out</h1>

                    <Form action='/payment'>
                        <Row className="mt-3">
                            <Col lg={6}>
                                <h4 className="text-success">Informasi Pengiriman</h4>

                                {/* form info pengiriman */}
                                <Row className="mb-3">
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>Nama Pembeli</Form.Label>
                                            <Form.Control type='text' name='fullname' value="Ahmad Fulan" disabled />
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>Nomor Telepon</Form.Label>
                                            <Form.Control type='text' name='telepon' value="628123456789" disabled />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Alamat</Form.Label>
                                            <Form.Control as='textarea' name='alamat' rows={5} placeholder='cth. jalan jendral sudirman, disamping gang' />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Pilih Metode Pengiriman</Form.Label>
                                            <Form.Select aria-label='Metode Pengiriman'>
                                                <option>-- Pilih Metode Pengiriman --</option>
                                                <option value="reguler">Reguler | Rp 10.000 (tiba dalam 3 jam)</option>
                                                <option value="ekspres">Ekspres | Rp 20.000 (tiba dalam 1 jam)</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Pilih Metode Pembayaran</Form.Label>
                                            <Form.Select aria-label='Metode Pembayaran'>
                                                <option>-- Pilih Metode Pembayaran --</option>
                                                <option value="gopay">Gopay</option>
                                                <option value="transfer">Transfer Bank BCA</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>

                            <Col lg={6}>
                                <Card className="rounded-5 p-3">
                                    <Card.Body>
                                        <h4 className="text-success mb-3">Ringkasan Belanja</h4>

                                        <Row className="mb-3 d-flex align-items-center">
                                            <Col lg={2}>
                                                <img src={imgProduct} alt="" width='100%' className='border rounded-5 mb-3' />
                                            </Col>

                                            <Col lg={10} className='d-flex justify-content-between'>
                                                <h5>Semangka</h5>
                                                <p>1kg</p>
                                                <h5 className="text-success text-end">Rp 15.000</h5>
                                            </Col>
                                        </Row>

                                        <hr />

                                        <Row>
                                            <Col>
                                                <p>Berat Total</p>
                                            </Col>

                                            <Col className='d-flex justify-content-end'>
                                                <p>1 kg</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <p>Metode Pengiriman</p>
                                            </Col>

                                            <Col className='d-flex justify-content-end'>
                                                <p>Reguler | Rp 10.000</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <p>Metode Pembayaran</p>
                                            </Col>

                                            <Col className='d-flex justify-content-end'>
                                                <p>Transfer ke Bank BCA</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <h5>Total</h5>
                                            </Col>

                                            <Col className='d-flex justify-content-end'>
                                                <h5 className='text-success'>Rp 25.000</h5>
                                            </Col>
                                        </Row>

                                        <Button type='submit' variant='success' className='w-100 mt-3' onClick={handleConfirmOrder}>Bayar Sekarang</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </section>

            <FooterComponent />
        </>
    );
}

export default OrderPage