import React, { PureComponent } from 'react';
import './PhotoPrint.css';
import { printPrice } from '../printPrice';
import { formatCurrency } from '../functions';
import NewPrintingRequest from '../components/PhotoPrint/NewPrintingRequest';
import PrintIntro from '../components/PhotoPrint/PrintIntro';

export default class PhotoPrinting extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			printList: []
		};
	}

	addNewPrintItem = printItem => {
		const newPrintList = [
			...this.state.printList
		];
		// console.log(printItem);
		const findIdx = newPrintList.findIndex(
			item => (item.printType === printItem.printType && item.printSize === printItem.printSize)
		);
		if (findIdx >= 0) {
			newPrintList[findIdx].printQuantity += printItem.printQuantity;
		} else {
			newPrintList.push(printItem);
		}
		this.setState({ printList: newPrintList });
		console.log(newPrintList);
	};

	removePrintItem = printItem => {
		const confirmRemove = window.confirm("Bạn có muốn xóa yêu cầu này?");
		if(!confirmRemove) return;
		const newPrintList = [
			...this.state.printList
		];
		// console.log(printItem);
		const findIdx = newPrintList.findIndex(
			item => (item.printType === printItem.printType && item.printSize === printItem.printSize)
		);
		
		if (findIdx >= 0) {
			newPrintList.splice(findIdx,1);
		}
		this.setState({ printList: newPrintList });
		console.log(newPrintList);
	}
	render() {
		const printingArray = Object.keys(printPrice);
		const { printList } = this.state;
		return (
			<div className="container" style={{ marginTop: '200px' }}>
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
						{printList.map(item => (
							<tr>
								<td>{item.printType}</td>
								<td>{item.printSize}</td>
								<td>{item.printQuantity}</td>
								<td>{formatCurrency(item.printItemPrice)}</td>

								<td>{formatCurrency(item.printItemPrice * item.printQuantity)}</td>
								<td>
									<button className="btn btn-danger" onClick={() => this.removePrintItem(item)}>x</button>
								</td>
							</tr>
						))}
						<NewPrintingRequest printPrice={printPrice} addNewPrintItem={this.addNewPrintItem} />

					</tbody>

				</table>
				{ printList.length > 0 && (
				<div className="form-group">
						<input type="checkbox" class="form-check-input" id="isShip" />
						<label class="form-check-label" for="isShip">Ship/Chuyển phát nhanh</label>
    					{/* <textarea class="form-control" id="ship-infomation" rows="2"></textarea> */}
						<label class="form-check-label" for="note">Ghi chú:</label>
    					<textarea class="form-control" id="note" rows="2"></textarea>
						
					</div>
					
				)}
				{ printList.length > 0 && (
				<div className="form-group submit-button"><button className="btn btn-success">Đồng ý</button></div>
				)}
			</div>
		);
	}
}
