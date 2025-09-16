import { Container, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

import FooterComponent from '../components/Customer/FooterComponent'

import logo from '../assets/logo.png'
import imgRegister from '../assets/img-register.png'

// menghubungkan sweetalert
import Swal from "sweetalert2";

const RegisterPage = () => {

    // setting sweetalert
    const handleSubmit = (event) => {
        event.preventDefault();

        Swal.fire({
            title: "Berhasil Buat Akun!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#198754",
            customClass: {
                confirmButton: "rounded-pill"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/login";
            }
        });
    }


    return (
        <>
            <section className="register mt-5">
                <Container>
                    <Row className="d-flex align-items-center">
                        <Col lg={6}>
                            <div className="brand mb-5">
                                <img src={logo} alt="" />
                            </div>

                            <Row className="d-flex align-items-center mb-5">
                                <Col lg={6}>
                                    <h1>Daftar di Sygara</h1>
                                </Col>

                                <Col lg={6}>
                                    <Link to="/login" className="text-success d-flex justify-content-end">Masuk</Link>
                                </Col>
                            </Row>

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Nama Lengkap</Form.Label>
                                            <FloatingLabel controlId="floatingInput" label="cth. Ahmad Fulan" className="mb-3 text-secondary">
                                                <Form.Control type="text" name="fullname" placeholder="cth. Ahmad Fulan" />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>Nomor Telepon</Form.Label>
                                            <FloatingLabel controlId="floatingInput" label="cth. 628xxx" className="mb-3 text-secondary">
                                                <Form.Control type="text" name="telepon" placeholder="cth. 628xxx" />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <FloatingLabel controlId="floatingInput" label="cth. example@email.com" className="mb-3 text-secondary">
                                                <Form.Control type="email" name="email" placeholder="name@example.com" />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>Buat Password</Form.Label>
                                            <FloatingLabel controlId="floatingInput" label="Masukkan Password" className="mb-3 text-secondary">
                                                <Form.Control type="password" name="password" placeholder="Masukkan Password" />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>Konfirmasi Password</Form.Label>
                                            <FloatingLabel controlId="floatingInput" label="Masukkan Password" className="mb-3 text-secondary">
                                                <Form.Control type="password" name="password" placeholder="Masukkan Password" />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button type="submit" className="w-100 mt-5" variant="success">Daftar</Button>
                            </Form>
                        </Col>

                        <Col lg={6}>
                            <img src={imgRegister} alt="" className="img-register"/>
                        </Col>
                    </Row>
                </Container>
            </section>

            <FooterComponent />
        </>
    );
}

export default RegisterPage;
