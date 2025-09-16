// import komponen bootstrap
import { Container, Row, Col } from "react-bootstrap";

// mengimport file component
import NavbarComponent from "../../components/Customer/NavbarComponent";
import FooterComponent from "../../components/Customer/FooterComponent";

// mengimpor komponen Link dari react-router-dom untuk navigasi
import { Link } from "react-router-dom";

import banner3 from "../../assets/img-banner3.png";
import logo from "../../assets/logo-putih.png";

const LandingPage = () => {
    return (
        <>
            <NavbarComponent isLoggedIn={false} />

            <section className="hero">
                <Container>
                    {/* sesi 1 */}
                    <Row>
                        <Col lg={8}>
                            <div className="banner1 d-flex align-items-center">
                                <div className="description ms-5">
                                    <h1 className="text-success">Natural & Segar <br /> untuk kesehatan</h1>
                                    <Link to='/product' className="btn btn-outline-success">Belanja Sekarang</Link>
                                </div>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="banner2">
                                <div className="description text-center">
                                    <h3 className="text-success">Produk segar langsung dari kebun!</h3>
                                    <Link to='/product' className="btn btn-outline-success">Lihat Produk</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* sesi 2 */}
                    <Row className="mt-5">
                        <Col lg={5}>
                            <div className="bg-text d-flex align-items-center">
                                <div className="description">
                                    <h3 className="text-success">Produk yang dirawat & dipilih dengan kualitas terbaik</h3>
                                    <p>Miliki buah dan sayur berkualitas dari hasis panen yang dijaga ketat agar kesegaran tetap dapat Anda rasakan.</p>
                                </div>
                            </div>
                        </Col>

                        <Col lg={7}>
                            <img src={banner3} alt="" width="100%" className="banner3 rounded-5" />
                        </Col>
                    </Row>

                    {/* sesi 3 */}
                    <Row className="mt-5">
                        <Col>
                            <div className="cta text-center">
                                <div className="description">
                                    <img src={logo} alt="" />
                                    <h1 className="text-light mt-3 mb-3">Ayo Belanja sekarang dan mulai nikmati <br />
                                        kesegaran buah & sayur yang sehat!
                                    </h1>
                                    <Link to="/product" className="btn btn-outline-light">Belanja Sekarang</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <FooterComponent/>
        </>
    );
}

export default LandingPage;