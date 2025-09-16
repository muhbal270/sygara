import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import NavbarComponent from '../../components/Customer/NavbarComponent'
import FooterComponent from '../../components/Customer/FooterComponent'

import imgSuccess from '../../assets/img-success.png'
import imgMethod from '../../assets/ic-bca.png'

const SuccessPage = () => {
    return (
        <>
            <NavbarComponent isLoggedIn={true} />
            <section className="success">
                <Container className="my-5">
                    <Row className="d-flex justify-content-center">
                        <Col lg={6} className="text-center">
                            <h1 className='text-success'>Terima Kasih atas Pesanan Anda!</h1>
                            <p>Pesanan sedang di verifikasi dan akan segera diantarkan ke Alamat Anda, pastikan nomor telepon aktif  agar kurir dapat lebih mudah mengantar pesanan</p>

                            <Card className='mb-3 text-start'>
                                <Card.Body>
                                    <Row className='align-items-center'>
                                        <Col md={4}>
                                            <img src={imgMethod} alt="bca" className='img-fluid' />
                                        </Col>
                                        <Col md={8}>
                                            <h5>Pembayaran via Transfer ke Bank BCA </h5>
                                            <p>Nomor Rekening : <b>612009820028</b> (a.n Sygara)</p>
                                            <p>Total Pembayaran : <b>Rp 25.000</b></p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <Link to="/" className='btn btn-success rounded-5 w-100'>
                                Kembali ke Beranda
                            </Link>
                        </Col>
                    </Row>

                    <Row className="text-center mt-5">
                        <Col>
                            <img src={imgSuccess} alt="image" className='img-success' />
                        </Col>
                    </Row>
                </Container>
            </section>
            <FooterComponent />
        </>
    )
}

export default SuccessPage