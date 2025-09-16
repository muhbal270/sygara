// mengimport component dari react-bootstrap
import { Navbar, Nav, Button, Container, NavDropdown} from 'react-bootstrap';

// mengimport fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/logo.png';


const NavbarComponent = ({ isLoggedIn }) => {
    return (
        <>
            <Navbar expand="lg" className='mb-3'>
                <Container>
                    <Navbar.Brand href="/"><img src={logo} alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='d-flex align-items-center'>
                            <Nav.Link href="/">Beranda</Nav.Link>
                            <Nav.Link href="/product">Produk</Nav.Link>
                            <div className="vr"></div>

                            {/* kondisi jika sudah/belum login */}
                            {isLoggedIn ? (
                                    <>
                                        <Nav.Link href='/cart'><FontAwesomeIcon icon={faShoppingCart} className='text-success'></FontAwesomeIcon></Nav.Link>
                                        <NavDropdown title="Username" id='basic-nav-dropdown'>
                                            <NavDropdown.Item href='/history'>Riwayat Belanja</NavDropdown.Item>
                                            <hr />
                                            <NavDropdown.Item href='/' className='text-danger'>Keluar</NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link href='/login'>
                                            <Button variant='outline-success'>Masuk</Button>
                                        </Nav.Link>
                                        <Nav.Link href='/register'>
                                            <Button variant='success'>Daftar</Button>
                                        </Nav.Link>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;