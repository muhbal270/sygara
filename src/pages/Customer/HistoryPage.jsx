import NavbarComponent from '../../components/Customer/NavbarComponent'

import { Container, Row, Col, Table } from 'react-bootstrap';

const HistoryPage = () => {
    return (
        <>
            <NavbarComponent isLoggedIn={true}/>

            <section className="history">
                <Container>
                    <h3 className='text-success mb-3'>Riwayat Belanja</h3>

                    <Row>
                        <Col>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Tanggal Pemesanan</th>
                                        <th>Item</th>
                                        <th>Berat Total</th>
                                        <th>Total Harga</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>2025-06-30</td>
                                        <td>Semangka, Pisang, Apel</td>
                                        <td>3 kg</td>
                                        <td>Rp 150.000</td>
                                        <td className='text-warning'>Dalam Proses</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>2025-06-29</td>
                                        <td>Bayam, Brokoli</td>
                                        <td>2 kg</td>
                                        <td>Rp 50.000</td>
                                        <td className='text-success'>Selesai</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default HistoryPage;