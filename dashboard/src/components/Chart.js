import React from 'react';
import ChartRow from './ChartRow';
import LastUserInDb from './LastUserInDb';

function Chart(props) {
    const { products, users } = props;

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">
                    {products ? 'Libros' : 'Usuarios'}
                </h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                {products ? (
                                    <>
                                        <th>Nombre</th>
                                        <th>Autor</th>
                                        <th>Descripción</th>
                                        <th>Categoría</th>
                                    </>
                                ) : (
                                    <>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Teléfono</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.productsArray.map((product, i) => (
                                <ChartRow {...product} key={i} />
                            ))}
                            {users && users.usersArray.map((user, i) => (
                                <ChartRow {...user} key={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <LastUserInDb />

        </div>
        
    );
}

export default Chart;
