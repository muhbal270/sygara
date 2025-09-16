import AdminLayout from '../../../layouts/AdminLayout'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const TemplateIndex = () => {
    // contoh data dummy
    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm("Yakin ingin hapus data ini ?")) {
            console.log("Data dihapus");
        }
    };

    return (
        <AdminLayout>
            <div className="page-heading p-4">
                <div className="page-title mb-3">
                    <div className="row">
                        <div className="col-12 col-md-6 order-md-1 order-last">
                            <h3>DataTable</h3>
                        </div>
                    </div>
                </div>

                <section className="section">
                    <div className="card">
                        <div className="card-header">
                            <Link to="/admin/template/create" className="btn btn-primary">
                                + Tambah
                            </Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped" id="table1">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Unknown</th>
                                        <th>Unknown</th>
                                        <th>Unknown</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Loading...</td>
                                        <td>Loading...</td>
                                        <td>Loading...</td>
                                        <td>Loading...</td>
                                        <td>
                                            <Link to="/admin/template/edit" className="btn btn-sm btn-primary me-1">
                                                <FontAwesomeIcon icon={faPen} />
                                            </Link>
                                            <form style={{ display: "inline" }} onSubmit={handleDelete}>
                                                <button type="submit" className="btn btn-sm btn-danger">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    )
}

export default TemplateIndex;