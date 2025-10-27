import { useEffect, useState } from 'react';
import NavbarComponent from '../../components/Customer/NavbarComponent';
import FooterComponent from '../../components/Customer/FooterComponent';
import Swal from 'sweetalert2';

import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';

import imgPisang from '../../assets/img-pisang.png';
import imgJeruk from '../../assets/img-jeruk.png';
import imgApel from '../../assets/img-apel.png';
import imgSemangka from '../../assets/img-semangka.png';
import Api from '../../api/Api';
import Cookies from 'js-cookie'

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');

        // jika belum login arahkan ke halaman login
        if (!token) {
            Swal.fire('Gagal, Silahkan login terlebih dahulu.')
            return;
        }

        try {
            const payload = {
                product_id: selectedProduct.id,
                quantity: jumlah
            }

            await Api.post('/keranjang', payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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
        } catch (error) {
            console.error("Error adding to cart:", error);
            Swal.fire('Gagal menambahkan ke keranjang. Silahkan coba lagi.');
        }

    }




    // data product
    const [products, setProducts] = useState([]);

    const getDataProduct = async () => {
        await Api.get('/product')
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.error("Error fetching products:", error);
            }
            );
    };

    useEffect(() => {
        getDataProduct();
    }, []);


    return (
        <>
            <NavbarComponent isLoggedIn={true} />

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
                                        <Card.Title>{product.nama_product}</Card.Title>
                                        <Card.Text>Rp {product.harga}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <FooterComponent />

            {/* modal pop up */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct?.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedProduct ? (
                        <>
                            <div className="product-image d-flex justify-content-center mb-3">
                                <img
                                    src={
                                        selectedProduct.img.startsWith("http")
                                            ? selectedProduct.img
                                            : `${import.meta.env.VITE_API_URL}/storage/product/${selectedProduct.img}`
                                    }
                                    alt={selectedProduct.nama_product}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "250px", objectFit: "cover" }}
                                />
                            </div>

                            <div className="product-description">
                                <h6>Deskripsi</h6>
                                <p>
                                    {selectedProduct.deskripsi
                                        ? selectedProduct.deskripsi
                                        : "Tidak ada deskripsi untuk produk ini."}
                                </p>

                                <h6>Harga</h6>
                                <h5 className="text-success">
                                    Rp {Number(selectedProduct.harga).toLocaleString("id-ID")}
                                </h5>

                                <h6 className="mt-3">Stok</h6>
                                <p>{selectedProduct.stok}</p>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-muted">Memuat data produk...</p>
                    )}
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-between'>
                    <Form className="w-100">
                        <Row className="d-flex align-items-center">
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Jumlah/kg</Form.Label>
                                    <small className='mx-3 text-muted'><i>*Maks. 10kg</i></small>
                                    <Form.Control type='number' name='jumlah' max={10} min={1} onChange={handleJumlahChange} value={jumlah} />
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