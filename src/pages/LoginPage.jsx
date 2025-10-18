import { Container, Row, Col, Form, Button, FloatingLabel, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import FooterComponent from '../components/Customer/FooterComponent'

import logo from '../assets/logo.png'
import imgLogin from '../assets/img-login.png'
import { use, useState } from "react";
import Api from "../api/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validation, setValidation] = useState({});

    // navigasi untuk redirect halaman
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        await Api.post('/login', formData)
            .then((response) => {
                // jika login berhasil, simpan token & data user di cookies
                Cookies.set('token', response.data.access_token);
                Cookies.set('name', response.data.user.name);
                Cookies.set('role', response.data.user.role);
                Cookies.set('nomor_telepon', response.data.user.nomor_telepon);

                // Tampilkan notifikasi sukses
                toast.success('Berhasil masuk, terimakasih! 👌', {
                    duration: 4000,
                    position: 'top-center'
                });

                // redirect ke halaman utama
                // navigate('/');

                // cek role dan arahkan sesuai role
                if (response.data.user.role == 1 ) {
                    navigate('/admin/dashboard'); // admin
                } else {
                    navigate('/'); // customer
                }

            })
            .catch((error) => {
                // jika login gagal, tampilkan notifikasi error
                if (error.response.status === 401) {
                    toast.error('Email atau Password Salah!', {
                        duration: 4000,
                        position: 'top-center'
                    });
                } else if (error.response.status === 422) {
                    setValidation(error.response.data.errors);
                } else {
                    toast.error('Terjadi kesalahan pada server!', {
                        duration: 4000,
                        position: 'top-center'
                    });
                }
            });
    }

    return (
        <>
            <section className="login mt-5">
                <Container>
                    <Row className="d-flex align-items-center">
                        <Col lg={6}>
                            <div className="brand mb-5">
                                <img src={logo} alt="" />
                            </div>

                            <Row className="d-flex align-items-center mb-5">
                                <Col lg={6}>
                                    <h1>Masuk ke Sygara</h1>
                                </Col>

                                <Col lg={6}>
                                    <Link to="/register" className="text-success d-flex justify-content-end">Buat Akun</Link>
                                </Col>
                            </Row>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <FloatingLabel controlId="floatingInput" label="cth. example@email.com" className="mb-3 text-secondary">
                                        <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!validation.email} placeholder="name@example.com" />
                                        <Form.Control.Feedback type="invalid">
                                            {validation.email}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <FloatingLabel controlId="floating" label="Masukkan Password" className="mb-3 text-secondary">
                                        <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={!!validation.password} placeholder="Masukkan Password" />
                                        <Form.Control.Feedback type="invalid">
                                            {validation.password}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <a href="mailto:support@sygara.com" target="_blank" className="text-success d-flex justify-content-end mt-3">Lupa Password?</a>

                                <Button type="submit" className="w-100 mt-5" variant="success">Masuk</Button>
                            </Form>
                        </Col>

                        <Col lg={6}>
                            <img src={imgLogin} alt="" className="img-login" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <FooterComponent />
        </>
    );
}

export default LoginPage;
