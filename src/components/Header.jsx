import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { NavLink } from 'react-router-dom';

class Header extends PureComponent {
	render() {
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
												In ảnh
											</NavLink>
										</li>
										<li>
											<NavLink to="/admin">
												Admin
											</NavLink>
										</li>
									</ul>
									{/* <ul className="navbar_user">
										<li>
											<a href="#">
												<i className="fa fa-search" aria-hidden="true"></i>
											</a>
										</li>
										<li>
											<a href="#">
												<i className="fa fa-user" aria-hidden="true"></i>
											</a>
										</li>
										<li className="checkout">
											<NavLink to="/checkout">
												<i className="fa fa-shopping-cart" aria-hidden="true" />
												<span id="checkout_items" className="checkout_items">
													{this.props.totalProduct}
												</span>
											</NavLink>
										</li>
									</ul>
									<div className="hamburger_container">
										<i className="fa fa-bars" aria-hidden="true" />
									</div> */}
								</nav>
							</div>
						</div>
					</div>
				</div>
		</header>
		// <div className="fs_menu_overlay" />
		// <div className="hamburger_menu">
		// 	<div className="hamburger_close">
		// 		<i className="fa fa-times" aria-hidden="true" />
		// 	</div>
		// 	<div className="hamburger_menu_content text-right">
		// 		<ul className="menu_top_nav">
		// 			<li className="menu_item has-children">
		// 				<a href="#">
		// 					usd
		// 					<i className="fa fa-angle-down" />
		// 				</a>
		// 				<ul className="menu_selection">
		// 					<li>
		// 						<a href="#">cad</a>
		// 					</li>
		// 					<li>
		// 						<a href="#">aud</a>
		// 					</li>
		// 					<li>
		// 						<a href="#">eur</a>
		// 					</li>
		// 					<li>
		// 						<a href="#">gbp</a>
		// 					</li>
		// 				</ul>
		// 			</li>
		// 			<li className="menu_item has-children">
		// 				<a href="#">
		// 					English
		// 					<i className="fa fa-angle-down" />
		// 				</a>
		// 				<ul className="menu_selection">
		// 					<li>
		// 						<a href="#">French</a>
		// 					</li>
		// 					<li>
		// 						<a href="#">Italian</a>
		// 					</li>
		// 					<li>
		// 						<a href="#">German</a>
		// 					</li>
		// 					<li>
		// 						<a href="#">Spanish</a>
		// 					</li>
		// 				</ul>
		// 			</li>
		// 			<li className="menu_item has-children">
		// 				<a href="#">
		// 					My Account
		// 					<i className="fa fa-angle-down" />
		// 				</a>
		// 				<ul className="menu_selection">
		// 					<li>
		// 						<a href="#">
		// 							<i className="fa fa-sign-in" aria-hidden="true" />
		// 							Sign In
		// 						</a>
		// 					</li>
		// 					<li>
		// 						<a href="#">
		// 							<i className="fa fa-user-plus" aria-hidden="true" />
		// 							Register
		// 						</a>
		// 					</li>
		// 				</ul>
		// 			</li>
		// 			<li className="menu_item">
		// 				<a href="#">home</a>
		// 			</li>
		// 			<li className="menu_item">
		// 				<a href="categories.html">shop</a>
		// 			</li>
		// 			<li className="menu_item">
		// 				<a href="#">promotion</a>
		// 			</li>
		// 			<li className="menu_item">
		// 				<a href="#">pages</a>
		// 			</li>
		// 			<li className="menu_item">
		// 				<a href="https://nordiccoder.com/blog" target="blank">
		// 					blog
		// 				</a>
		// 			</li>
		// 			<li className="menu_item">
		// 				<a href="#">contact</a>
		// 			</li>
		// 		</ul>
		// 	</div>
		// </div>


		);
	}
}

Header.propTypes = {};

export default Header;
