// mengimport component dari react-bootstrap
import { Navbar, Nav, Button, Container, NavDropdown} from 'react-bootstrap';

// mengimport fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/logo.png';
import Cookies from 'js-cookie';
import Api from '../../api/Api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {

    const token = Cookies.get('token');

    const userName = Cookies.get('name');

    const isLoggedIn = !!token; // true jika token ada, false jika tidak ada

    const navigate = useNavigate();

    const handleLogout = async () => {
        if (!token) {
            toast.error('Kamu belum masuk!');
            return;
        }
        
        await Api.post('/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
            withCredentials: true
        })
 
        .then((response) => {
            // console.log(response);
            // hapus token & data user dari cookies
            Cookies.remove('token');
            Cookies.remove('name');
            Cookies.remove('role');
            Cookies.remove('nomor_telepon');

            if (response.status === 200) {
                toast.success('Berhasil keluar, sampai jumpa! 👋', {
                    duration: 4000,
                    position: 'top-center'
                });
            }

            // redirect ke halaman utama
            navigate('/');

        })
        .catch((error) => {
            // console.log(error.response || error.message);
            toast.error('Gagal logout. Silahkan coba lagi.');
        });
    }
    
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
                                        <NavDropdown title={userName} id='basic-nav-dropdown'>
                                            <NavDropdown.Item href='/history'>Riwayat Belanja</NavDropdown.Item>
                                            <hr />
                                            <NavDropdown.Item onClick={handleLogout} className='text-danger'>Keluar</NavDropdown.Item>
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