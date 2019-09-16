import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

class Footer extends PureComponent {
	render() {
		return (
			<div className="footer-container">
				<h3 className="media-heading">Mail</h3>
				<p>
                © 2019 FILM STORE. Coppyright by @LLab Co.Ltd Version 2.1
				</p>
			</div>
		);
	}
}

Footer.propTypes = {};

export default Footer;
