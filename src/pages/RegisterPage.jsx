import { Container, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

import FooterComponent from '../components/Customer/FooterComponent'

import logo from '../assets/logo.png'
import imgRegister from '../assets/img-register.png'
import { useState } from "react";
import Api from "../api/Api";

// menghubungkan sweetalert
import Swal from "sweetalert2";

const RegisterPage = () => {

    // setting sweetalert
    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     Swal.fire({
    //         title: "Berhasil Buat Akun!",
    //         icon: "success",
    //         confirmButtonText: "OK",
    //         confirmButtonColor: "#198754",
    //         customClass: {
    //             confirmButton: "rounded-pill"
    //         }
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             window.location.href = "/login";
    //         }
    //     });
    // }

    const [name, setName] = useState('');
    const [nomor_telepon, setNomorTelepon] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const [validation, setValidation] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('nomor_telepon', nomor_telepon);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', password_confirmation);

        await Api.post('/register', formData)
            .then((response) => {
                // console.log(response);
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
            })
            .catch((error) => {
                setValidation(error.response.data.errors);
                // console.log(error.response.data.errors);
            })

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
                                            <FloatingLabel controlId="name" label="cth. Ahmad Fulan" className="mb-3 text-secondary">
                                                <Form.Control type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} isInvalid={!!validation.name} placeholder="cth. Ahmad Fulan" />
                                                <Form.Control.Feedback type="invalid">
                                                    {validation.name}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>Nomor Telepon</Form.Label>
                                            <FloatingLabel controlId="nomor_telepon" label="cth. 628xxx" className="mb-3 text-secondary">
                                                <Form.Control type="text" name="nomor_telepon" value={nomor_telepon} onChange={(e) => setNomorTelepon(e.target.value)} isInvalid={!!validation.nomor_telepon} placeholder="cth. 628xxx" />
                                                <Form.Control.Feedback type="invalid">
                                                    {validation.nomor_telepon}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <FloatingLabel controlId="email" label="cth. example@email.com" className="mb-3 text-secondary">
                                                <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!validation.email} placeholder="name@example.com" />
                                                <Form.Control.Feedback type="invalid">
                                                    {validation.email}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>Buat Password</Form.Label>
                                            <FloatingLabel controlId="password" label="Masukkan Password" className="mb-3 text-secondary">
                                                <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={!!validation.password} placeholder="Masukkan Password" />
                                                <Form.Control.Feedback type="invalid">
                                                    {validation.password}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>Konfirmasi Password</Form.Label>
                                            <FloatingLabel controlId="password_confirmation" label="Masukkan Password" className="mb-3 text-secondary">
                                                <Form.Control type="password" name="password_cofirmation" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} isInvalid={!!validation.password} placeholder="Masukkan Password" />
                                                <Form.Control.Feedback type="invalid">
                                                    {validation.password}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button type="submit" className="w-100 mt-5" variant="success">Daftar</Button>
                            </Form>
                        </Col>

                        <Col lg={6}>
                            <img src={imgRegister} alt="" className="img-register" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <FooterComponent />
        </>
    );
}

export default RegisterPage;
