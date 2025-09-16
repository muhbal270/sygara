import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap'

import NavbarComponent from '../../components/Customer/NavbarComponent'
import FooterComponent from '../../components/Customer/FooterComponent'

import imgPayment from '../../assets/img-payment.png'
import imgMethod from '../../assets/ic-bca.png'

const PaymentPage = () => {
    return (
        <>
            <NavbarComponent isLoggedIn={true} />

            <section className="payment">
                <Container>
                    <h1 className='text-success mb-3'>Menunggu Pembayaran</h1>
                    <Row className='d-flex align-items-center'>
                        <Col lg={7}>
                            <Row className='mb-3'>
                                <Col>
                                    <Alert variant='warning'>Silahkan lakukan pembayaran sebelum <b>1 jam kedepan</b> atau pesanan akan dibatalkan.</Alert>
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                                <Col>
                                    <h6>Total yang harus dibayar</h6>
                                    <h4>Rp 25.000</h4>
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                                <Col>
                                    <h6>Metode Pembayaran</h6>
                                    <Card>
                                        <Card.Body>
                                            <Row className='align-items-center'>
                                                <Col md={4}>
                                                    <img src={imgMethod} alt="bca" className='img-fluid' />
                                                </Col>
                                                <Col md={8}>
                                                    <h5>Pembayaran via Transfer ke Bank BCA </h5>
                                                    <p>Nomor Rekening : <b>612009820028</b> (a.n Sygara)</p>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Form action='/success'>
                                <Row className='mb-3'>
                                    <Col>
                                        <Form.Group className='mb-3'>
                                            <Form.Label><h6>Upload Bukti Pembayaran</h6></Form.Label>
                                            <Form.Control type="file" name='bukti-bayar' />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Button variant='success' type='submit' className='w-100 rounded-5'>Konfirmasi</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>

                        <Col lg={5}>
                            <img src={imgPayment} alt="" className='img-payment' />
                        </Col>
                    </Row>
                </Container>
            </section>

            <FooterComponent />
        </>
    )
}

export default PaymentPage