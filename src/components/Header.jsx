import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Header.css'
import { NavLink } from 'react-router-dom';

class Header extends PureComponent {
    render() {
        return (
            <div className="navbar">
            <NavLink to="/">Home</NavLink>
            {/* <a href="#news">News</a>
            <a href="#contact">Contact</a> */}
            </div>
        );
    }
}

Header.propTypes = {

};

export default Header;