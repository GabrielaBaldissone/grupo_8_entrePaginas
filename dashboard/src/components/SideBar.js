import React from 'react';
import image from '../assets/images/logo-DH.png';
import ContentWrapper from './ContentWrapper';
import GenresInDb from './GenresInDb';
import LastMovieInDb from './LastMovieInDb';
import Chart from './Chart';
import ContentRowMovies from './ContentRowMovies';
import NotFound from './NotFound';
import {Link, Route, Switch} from 'react-router-dom';
import { useState, useEffect } from 'react';

function SideBar(){
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
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="Digital House"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - DH movies</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>


                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/users">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Users</span>
                    </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/books">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Books</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/LastMovieInDb">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                {/* <li className="nav-item nav-link">
                <Link className="nav-link" to="/ContentRowMovies">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tables</span></Link>
                </li> */}

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}

            {/*<!-- Microdesafio 1 -->*/}
            {/*<!--<Route exact path="/">
                <ContentWrapper />
            </Route>
            <Route path="/GenresInDb">
            <GenresInDb />
            </Route>
            <Route path="/LastMovieInDb">
                <LastMovieInDb />
                </Route>
            <Route path="/ContentRowMovies">
                <ContentRowMovies />
                </Route>*/}
            {/*<!-- End Microdesafio 1 -->*/}

            {/*<!-- End Microdesafio 2 -->*/}
            {/* pasar como props a contentWrapper y hacer en la columna uno solo para libros asi como esta la tabla de users */}
            <Switch>
                <Route exact path="/">
                    <ContentWrapper />
                </Route>
                <Route path="/users">
                    <Chart users={users}/>
                </Route>
                <Route path="/books">
                    <Chart products={products}/>
                </Route>
                <Route path="/LastMovieInDb">
                    <LastMovieInDb />
                </Route>
                {/* <Route path="/ContentRowMovies">
                    <ContentRowMovies users={users} products={products}/>
                </Route> */}
                <Route component={NotFound} />
            </Switch>
            {/*<!-- End Microdesafio 2 -->*/}
        </React.Fragment>
    )
}
export default SideBar;