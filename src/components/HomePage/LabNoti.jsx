import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class LabNoti extends PureComponent {
	render() {
		return (
			<div style={{paddingLeft: "25px"}}>
				<h3>Danh sách các mặt hàng có tại Llab:</h3>
				<p>
					<em>
						<strong>{"("}SẢN PHẨM SẼ ẨN ĐI KHI HẾT HÀNG{")"}</strong>
					</em>
				</p>
				{/* <p>
					<h2>
						Khách hàng vui lòng gọi trực tiếp đến cửa hàng để nhân viên LLab cập nhật loại Film/Giá bán cụ
						thể trong trường hợp danh sách Film tại website chưa cập nhật kịp.
					</h2>
				</p> */}
				<p>
					LLab Quận 1: <strong>0934067834</strong>
				</p>
				<p>Add: 365F Trần Hưng Đạo, P.Cầu Kho, Quận 1, TP HCM</p>
				<p>
					LLab Quận 3: <strong>0931347467</strong>
				</p>
				<p>386/27C Đi vào hẻm 400/8 Lê Văn Sỹ, P14, Quận 3, TP HCM</p>
				<p>Xin cảm ơn!</p>
			</div>
		);
	}
}

LabNoti.propTypes = {};

export default LabNoti;
