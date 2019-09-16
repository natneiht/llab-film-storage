import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { NavLink } from 'react-router-dom';

class Header extends PureComponent {
	render() {
		return (
			<div className="navbar">
				<NavLink to="/">
					<img
						className="stnd default-logo dark-version"
						alt="FILM STORE"
						src="https://filmstore.vn/wp-content/uploads/2018/08/llab-e1562947995671.jpg?2913d2&amp;2913d2"
						style={{ height: '50px' }}
					></img>
				</NavLink>
				<ul className="nav-menu">
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/admin">Admin</NavLink>
					</li>
					{/* <NavLink to="/admin">Admin</NavLink> */}
				</ul>
				{/* <a href="#news">News</a>
            <a href="#contact">Contact</a> */}
			</div>
		);
	}
}

Header.propTypes = {};

export default Header;
