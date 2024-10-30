import React from 'react';
import ContentRowCenter from './ContentRowCenter';
import ContentRowMovies from './ContentRowMovies';
import Chart from './Chart';
import { useState, useEffect } from 'react';

function ContentRowTop(){
	const [products, setProducts] = useState({ count: 0, countByCategory: {}, productsArray: [] });
    const [users, setUsers] = useState({});
    
    useEffect(()=>{
        const getProducts = async()=>{
            const res = await fetch("http://localhost:8080/api/products");
            const newData = await res.json();
            setProducts(newData);
        }
        const getUsers = async()=>{
            const res = await fetch("http://localhost:8080/api/users");
            const newData = await res.json();
            setUsers(newData);
        }
        getProducts();
        getUsers();
    }, []);
    return(
        <React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
					</div>
				
					{/*<!-- Content Row Movies-->*/}
					<ContentRowMovies products={products} users={users}/>
					<ContentRowCenter products={products}/>
					<Chart products={products}/>
	
				</div>
				{/*<!--End Content Row Top-->*/}

        </React.Fragment>
    )

}
export default ContentRowTop;