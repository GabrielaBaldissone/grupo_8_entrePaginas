import React from 'react';
import foto from '../assets/images/banner-e.png';

function TopBar(){
    return(
        <React.Fragment>
				{/*<!-- Topbar -->*/}
				<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

					

					{/*<!-- Topbar Navbar -->*/}
					<ul className="navbar-nav ml-auto">

						{/*<!-- Nav Item - Alerts -->*/}
						<li className="nav-item dropdown no-arrow mx-1">
							<a className="nav-link dropdown-toggle" href="/" id="alertsDropdown">
								{/*<!-- Counter - Alerts -->*/}
								<span>Dashboard EntrePáginas</span>
							</a>
						</li>


						<div className="topbar-divider d-none d-sm-block"></div>

						{/*<!-- Nav Item - User Information -->*/}
						<li className="nav-item dropdown no-arrow1">
							<a className="nav-link dropdown-toggle" href="/" id="userDropdown">
								<span className="mr-2 d-none d-lg-inline text-gray-600 small"></span>
								<img src={foto} alt="logo" width="150" height="auto"/>
							</a>
						</li>

					</ul>

				</nav>
				{/*<!-- End of Topbar -->*/}

        </React.Fragment>
    )
}
export default TopBar;