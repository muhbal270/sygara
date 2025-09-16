import { useState } from 'react';
import NavbarComponent from '../../components/Customer/NavbarComponent';
import FooterComponent from '../../components/Customer/FooterComponent';
import Swal from 'sweetalert2';

import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';

import imgPisang from '../../assets/img-pisang.png';
import imgJeruk from '../../assets/img-jeruk.png';
import imgApel from '../../assets/img-apel.png';
import imgSemangka from '../../assets/img-semangka.png';

const ProductPage = () => {

    // modal
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [jumlah, setJumlah] = useState(1);

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    }

    const handleJumlahChange = (e) => {
        setJumlah(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        Swal.fire({
            title: 'Berhasil ditambah ke Keranjang!',
            icon: 'success',
            confirmButtonText: 'Cek Keranjang',
            confirmButtonColor: '#198754',
            showCancelButton: true,
            cancelButtonText: 'Lanjut Belanja',
            customClass: {
                confirmButton: 'rounded-pill',
                cancelButton: 'rounded-pill'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/cart';
            } else {
                handleCloseModal();
            }
        });
    }


    

    // data product
    const products = [
        {title: 'Pisang Cavendish', price: 'Rp 15.000/kg', img: imgPisang},
        {title: 'Jeruk Sunkist', price: 'Rp 10.000/kg', img: imgJeruk},
        {title: 'Apel Fuji', price: 'Rp 25.000/kg', img: imgApel},
        {title: 'Semangka', price: 'Rp 15.000/kg', img: imgSemangka},
    ];

    return (
        <>
            <NavbarComponent isLoggedIn={true}/>

            <section className="product mt-3">
                <Container>
                    <Row className='d-flex align-items-center'>
                        <Col lg={5}>
                            <h1 className="text-success">Rasakan kesegaran buah dan sayur untuk keluarga</h1>
                        </Col>

                        <Col lg={7}>
                            <Form>
                                <Row>
                                    <Col lg={10}>
                                        <Form.Control type='text' placeholder='cari apa? (cth. bayam, apel, etc.)' />
                                    </Col>

                                    <Col lg={2}>
                                        <Button type='submit' variant='success'>Cari</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>

                    {/* product */}
                    <Row className="all-product mt-3">
                        {products.map((product, index) => (
                            <Col lg={3} className='mb-3' key={index}>
                                <Card className='text-center rounded-5' onClick={() => handleCardClick(product)}>
                                    <Card.Img variant='top' src={product.img} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>{product.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <FooterComponent/>

            {/* modal pop up */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                        <Modal.Title>{selectedProduct?.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                        <div className="product-image d-flex justify-content-center">
                            <img src={selectedProduct?.img} alt={selectedProduct?.title} className='img-fluid' />
                        </div>
                        <div className="product-description">
                            <h6>Deskripsi</h6>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <h6>Harga</h6>
                            <h5 className="text-success">{selectedProduct?.price}</h5>
                        </div>
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-between'>
                        <Form className="w-100">
                            <Row className="d-flex align-items-center">
                                <Col lg={6}>
                                    <Form.Group>
                                        <Form.Label>Jumlah/kg</Form.Label>
                                        <small className='mx-3 text-muted'><i>*Maks. 10kg</i></small>
                                        <Form.Control  type='number' name='jumlah' max={10} min={1} onChange={handleJumlahChange} value={jumlah} />
                                    </Form.Group>
                                </Col>

                                <Col lg={6} className='d-flex justify-content-end'>
                                    <Button type='submit' variant='success' onClick={handleSubmit}>+Keranjang</Button>
                                </Col>
                            </Row>
                        </Form>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductPage;