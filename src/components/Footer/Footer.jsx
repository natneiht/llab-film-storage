import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

class Footer extends PureComponent {
	render() {
		return (
			<div className="footer-container">
				<h4 className="media-heading">Llab</h4>

				<p>Chi nhánh 1:</p>
				<p>365f Đường Trần Hưng Đạo, Cầu Kho, Quận 1, Hồ Chí Minh, Việt Nam</p>


				<p>Chi nhánh 2:</p>
				<p>386/27C Lê Văn Sỹ, Phường 14, Quận 3 (Vào hẻm 400, đối diện cafe RedDoor)</p>

				<p>Số điện thoại chi nhánh 1: 0934067834 (call only)</p>


				<p>Số điện thoại chi nhánh 2: 0931347467 (call only)</p>

				<p>Mail: service@llab.vn</p>
				<p>
                © 2019 FILM STORE. Coppyright by @LLab Co.Ltd Version 2.1
				</p>
			</div>
		);
	}
}

Footer.propTypes = {};

export default Footer;
