import React, { PureComponent } from 'react';
import './PhotoPrint.css';
import { printPrice } from '../printPrice';
import NewPrintingRequest from '../components/PhotoPrint/NewPrintingRequest';
import PrintIntro from '../components/PhotoPrint/PrintIntro';
// import { ReCaptcha } from 'react-recaptcha-google'
import { db } from '../firebase';
import PrintItem from '../components/PhotoPrint/PrintItem';

export default class PhotoPrinting extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			printList: [],
			isShip: false,
			shippingInfo: '',
			orderNote: ''
		};
	}

	addNewPrintItem = printItem => {
		const newPrintList = [
			...this.state.printList
		];
		// console.log(printItem);
		const findIdx = newPrintList.findIndex(
			item => item.printType === printItem.printType && item.printSize === printItem.printSize
		);
		if (findIdx >= 0) {
			newPrintList[findIdx].printQuantity += printItem.printQuantity;
		} else {
			newPrintList.push(printItem);
		}
		this.setState({ printList: newPrintList });
		// console.log(newPrintList);
	};

	removePrintItem = printItem => {
		const confirmRemove = window.confirm('Bạn có muốn xóa yêu cầu này?');
		if (!confirmRemove) return;
		const newPrintList = [
			...this.state.printList
		];
		// console.log(printItem);
		const findIdx = newPrintList.findIndex(
			item => item.printType === printItem.printType && item.printSize === printItem.printSize
		);

		if (findIdx >= 0) {
			newPrintList.splice(findIdx, 1);
		}
		this.setState({ printList: newPrintList });
		// console.log(newPrintList);
	};

	submitPrintingItem = printItem => {
		console.log(printItem);
		try {
			db.collection('PrintingRequest').add({ ...printItem }).then(ref => {
				alert('Đơn hàng đã được ghi nhận!');
				// Clear old info
				this.setState({
					printList: [],
					isShip: false,
					shippingInfo: '',
					orderNote: ''
				});
			});
		} catch (error) {
			alert('Adding error!');
			console.log(error);
		}
	};
	render() {
		const printingArray = Object.keys(printPrice);
		const { printList, isShip, shippingInfo, orderNote } = this.state;
		return (
			<div className="container content-wrapper">
				<PrintIntro />
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Kiểu in</th>
							<th scope="col">Kích cỡ</th>
							<th scope="col">Số lượng</th>
							<th scope="col">Đơn giá</th>
							<th scope="col">Tổng</th>
							<th scope="col">#</th>
						</tr>
					</thead>
					<tbody>
						{/* Requests list */}
						{printList.map(item => (
							<PrintItem key={`${item.printType}_${item.printSize}`} itemDetail={item} removePrintitemDetail={this.removePrintitemDetail}/>
						))}
						{/* Add new request */}
						<NewPrintingRequest printPrice={printPrice} addNewPrintItem={this.addNewPrintItem} />

						{printList.length > 0 && (
							<tr>
								<td colSpan="3">
									<div className="form-group shipping-info">
										<input
											type="checkbox"
											className="form-check-input shipping-checkbox"
											id="isShip"
											value={this.state.isShip}
											onClick={e => this.setState({ isShip: !isShip })}
										/>
										<label className="form-check-label" htmlFor="isShip">
											Ship/Chuyển phát nhanh
										</label>
										<textarea
											className="form-control"
											id="ship-infomation"
											rows="2"
											onChange={e => this.setState({ shippingInfo: e.target.value })}
										/>
									</div>
								</td>
								<td colSpan="3">
									<div className="form-group">
										<label className="form-check-label" htmlFor="note">
											Ghi chú:
										</label>
										<textarea
											className="form-control"
											id="note"
											rows="3"
											onChange={e => this.setState({ orderNote: e.target.value })}
										/>
									</div>
								</td>
							</tr>
						)}

						{printList.length > 0 && (
							<tr>
								<td colSpan="6">
									<div className="form-group submit-button">
										<button
											className="btn btn-success"
											onClick={() =>
												this.submitPrintingItem({ printList, isShip, shippingInfo, orderNote })}
										>
											Đồng ý
										</button>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}
