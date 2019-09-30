import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PrintIntro extends PureComponent {
	render() {
		return (
			<div>
				<div>
						<h2>DỊCH VỤ IN ẢNH MỌI KÍCH CỠ</h2>
				</div>
				<div>
					<p>
						<strong>1. Kích thước in: </strong>
					</p>
					<p>Tất cả các kích thước từ 6×9(cm) đến 127×400 (cm)</p>
				</div>
				<div>
					<p>
						<strong>2.Quy Cách in:</strong>
					</p>
					<p>
						Ngoài các kích thước phổ thông LLab cũng in các quy cách Polaroid 6×9 và Instax 4×5″ (Như hình).
						Bạn có thể lựa chọn quy cách khi đến gởi đơn hàng.
					</p>
				</div>
				<div>
					<p>
						<strong>3. Phương thức gởi ảnh in:</strong>
					</p>
					<ul>
						<li>
								Gởi qua mail: Khách hàng lựa chọn ảnh cần in sau đó nén lại 1 folder rồi up lên Drive
								của mình, sau đó share qua email service@llab.vn và điền thông tin về quy cách, kích
								thước, số lượng cần in trong mẫu dưới đây.
						</li>
						<li>
								Chép file trực tiếp: Khách hàng mang USB đến LLab, nhân viên tại đây sẽ tạo đơn hàng và
								chép file để in.
						</li>
					</ul>
				</div>
				<div>
					<p>
						<strong>4. Thời gian xử lý:&nbsp;</strong>
					</p>
					<div>
						<p>
							Tất cả ảnh gởi in sẽ được xử lý trong vòng 72hs . Bạn sẽ nhận được tin nhắn sms thông báo
							hoàn thành đơn hàng từ LLab.
						</p>
					</div>
				</div>
				<div>
                    <div>
					<p>
						<strong>5. Hình thức thanh toán:</strong>
					</p>
                    </div>
                    <div>
						<ul>
							<li>
								Thanh toán trưc tiếp tại Lab
							</li>
							<li>
									Thanh toán bằng hình thức chuyển khoản (xem thông tin thanh toán tại{' '}
									<strong>
										<a href="https://llab.vn/lien-he/" target="_blank" rel="noopener noreferrer">
											đây
										</a>)
									</strong>
							</li>
							<li>
									Đơn hàng chỉ xử lý sau khi nhận được chi phí thanh toán (xem thông tin thanh toán
									tại{' '}
									<strong>
										<a href="https://llab.vn/lien-he/" target="_blank" rel="noopener noreferrer">
											đây
										</a>)
									</strong>
							</li>
						</ul>
                    </div>
				</div>
			</div>
		);
	}
}

PrintIntro.propTypes = {};

export default PrintIntro;
