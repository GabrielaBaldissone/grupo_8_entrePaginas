import React, { useState, useEffect } from 'react';

function LastBookInDb() {
    const [products, setProducts] = useState({ count: 0, countByCategory: {}, productsArray: [], lastBook: {} });

    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch("http://localhost:8080/api/products");
            const newData = await res.json();
            setProducts(newData);
        };
        getProducts();
    }, []);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último libro de la Base de Datos</h5>
                </div>
                <div className="card-body">
                    <h4>{products.lastBook.name}</h4>
                    <div className="text-center">
                        {products.lastBook && products.lastBook.image && (
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                style={{ width: 40 + 'rem' }}
                                src={`http://localhost:8080/img/${products.lastBook.image}`}
                                alt={products.lastBook.name} />
                        )}
                    </div>
                    <p>{products.lastBook && products.lastBook.description}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href={`http://localhost:8080/products/detail/${products.lastBook.id_book}`}>View book detail</a>
                </div>
            </div>
        </div>
    );
}

export default LastBookInDb;
