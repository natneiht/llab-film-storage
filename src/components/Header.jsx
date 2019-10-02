import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';

class Header extends PureComponent {
	
	render() {
		const user = firebase.auth().currentUser;
		console.log(user);
		return (
			<header className="header trans_300">
				<div className="main_nav_container">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 text-right">
								<div className="logo_container">
								<NavLink to="/">
									<img
										className="stnd default-logo dark-version"
										alt="FILM STORE"
										src="https://filmstore.vn/wp-content/uploads/2018/08/llab-e1562947995671.jpg?2913d2&amp;2913d2"
										style={{ height: '50px' }}
									></img>
								</NavLink>
								</div>
								<nav className="navbar">
									<ul className="navbar_menu">
										<li>
											<NavLink to="/">Home</NavLink>
										</li>
										<li>
											<NavLink to="/print">
												Photo printing
											</NavLink>
										</li>
										{/* <li>
											<NavLink to="/login">
												Login
											</NavLink>
										</li> */}
										{/* {user !== null && (
										<>
										<li>
											<NavLink to="/admin/film-manager">
												Quản lý film
											</NavLink>
										</li>
										<li>
											<NavLink to="/admin/print-manager">
												Quản lý in ảnh
											</NavLink>
										</li>
										</>
										)} */}
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
		</header>
		);
	}
}

Header.propTypes = {};

export default Header;
