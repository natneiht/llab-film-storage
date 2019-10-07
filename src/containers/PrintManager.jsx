import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import MaterialTable from 'material-table';
import { getUserRole } from '../functions';
import { db } from '../firebase';
import { generateNewID } from '../utils';
import { formatCurrency } from '../functions';
import 'material-icons/iconfont/material-icons.scss';
import './css/PrintManager.css';

class PrintManager extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			requestList: [],
			columns: [
				{ title: 'Id', field: 'id', type: 'string' },
				{ title: 'Số điện thoại', field: 'phoneNumber' },
				{ title: 'Đơn hàng', field: 'requestDetailString', type: 'string' },
				{ title: 'Tổng tiền', field: 'totalBill' },
				{
					title: 'Ship',
					field: 'isShip',
					lookup: { true: 'Có', false: 'Không' }
				},
				{ title: 'Shipping info', field: 'shippingInfo' },
				{ title: 'Ghi chú', field: 'orderNote' },
				{
					title: 'Thanh toán',
					field: 'isPurchased',
					lookup: { true: 'Yes', false: 'No' }
				},
				{ title: 'Ngày', field: 'submitDate', hidden: true, defaultSort: 'desc' },
				{ title: 'Ngày', field: 'submitDateString', hidden: false }
			],
			loading: true
		};
	}

	async componentDidMount() {
		db.collection('PrintingRequest').get().then(querySnapshot => {
			const data = querySnapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id }));
			// console.log(data);
			this.setState({ requestList: data, loading: false });
		});
	}

	deleteRequest = itemDetail => {
		// if (!window.confirm('Are you sure you wish to delete this item?')) return;
		try {
			db
				.collection('PrintingRequest')
				.doc(itemDetail.id)
				.delete()
				.then(function() {
					alert('Delete successfully!');
					console.log('Document successfully deleted!');
				})
				.catch(function(error) {
					alert('Error removing film!');
					console.error('Error removing film: ', error);
				});
		} catch (error) {
			console.error(error);
		}
	};

	addNewRequest = itemDetail => {
		try {
			delete itemDetail.id;
			delete itemDetail.requestDetailString;
			delete itemDetail.totalBill;
			db
				.collection('PrintingRequest')
				.doc(generateNewID())
				.set(itemDetail)
				.then(function() {
					// alert('Delete successfully!');
					console.log('Document successfully deleted!');
				})
				.catch(function(error) {
					alert('Error removing film!');
					console.error('Error removing film: ', error);
				});
		} catch (error) {
			console.error(error);
		}
	};

	updateRequest = (itemId, itemDetail) => {
		try {
			delete itemDetail.id;
			delete itemDetail.requestDetailString;
			delete itemDetail.totalBill;
			db
				.collection('PrintingRequest')
				.doc(itemId)
				.set(itemDetail)
				.then(function() {
					// alert('Delete successfully!');
					console.log('Document successfully updated!');
				})
				.catch(function(error) {
					alert('Error updating request!');
					console.error('Error removing film: ', error);
				});
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		const { requestList, loading } = this.state;
		// console.log(this.state);
		if (loading)
			return (
				<div className="container">
					<h3>Loading...</h3>
				</div>
			);
		const renderData = requestList.map(request => {
			let requestDetailString = request.printList.reduce((prev, item) => {
				return prev + `${item.printQuantity} x ${item.printType} (${item.printSize}); `;
			}, '');
			// Custom fields here
			let totalBill = formatCurrency(
				request.printList.reduce((total, item) => {
					return total + item.printQuantity * item.printItemPrice;
				}, 0)
			);
			let sDate = new Date(request.submitDate);
			let submitDateString = `${sDate.getDay()}/${sDate.getMonth()}/${sDate.getFullYear()}`;
			return Object.assign(request, { requestDetailString, totalBill, submitDateString });
		});
		const requestArray = Object.keys(requestList);
		return (
			<div className="container-lg print-manager-wrapper">
				<h3>
					<strong>Quản lý đơn hàng in ảnh </strong>
				</h3>
				<div className="col-lg-12">
					<MaterialTable
						title="Danh sách đơn hàng"
						columns={this.state.columns}
						data={renderData}
						options={{ pageSize: 25 }}
						editable={{
							onRowAdd: newData =>
								new Promise(resolve => {
									setTimeout(() => {
										resolve();
										const requestList = [
											...this.state.requestList
										];
										requestList.push(newData);
										this.setState({ requestList });
									}, 600);
								}),
							onRowUpdate: (newData, oldData) =>
								new Promise(resolve => {
									setTimeout(() => {
										resolve();
										const requestList = [
											...this.state.requestList
										];
										this.updateRequest(oldData.id, newData);
										requestList[requestList.indexOf(oldData)] = newData;
										this.setState({ requestList });
									}, 600);
								}),
							onRowDelete: oldData =>
								new Promise(resolve => {
									setTimeout(() => {
										resolve();
										const requestList = [
											...this.state.requestList
										];
										const deleteItem = requestList.indexOf(oldData);
										// console.log(oldData);
										this.deleteRequest(oldData);
										requestList.splice(deleteItem, 1);
										this.setState({ requestList });
									}, 600);
								})
						}}
						onRowClick={(event, data, panel) => this.props.history.push('./print-manager/' + data.id)}
					/>
				</div>
				{/* <table className="table print-table">
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Số điện thoại</th>
							<th scope="col">Nội dung</th>
							<th scope="col">Ship</th>
							<th scope="col">Thanh toán</th>
							<th scope="col">Ghi chú</th>
						</tr>
					</thead>
					<tbody>
						{requestArray.map(requestItem => (
							<tr>
								<td>{requestList[requestItem].id}</td>
								<td>{requestList[requestItem].data.phoneNumber}</td>
								<td className="request-detail">
									{requestList[requestItem].data.printList.map(item => (
										<div>{`- ${item.printQuantity} x ${item.printType} - ${item.printSize}`}</div>
									))}
									<div>
										<strong>Tổng cộng: </strong>{'  '}
										{formatCurrency(requestList[requestItem].data.printList.reduce(
											(prev, curr) => prev + curr.printQuantity * curr.printItemPrice,
											0
										))} VNĐ
									</div>
								</td>
								<td>{requestList[requestItem].data.isShip ? 'Có' : 'Không'}</td>
								<td>
                                    <select value={requestList[requestItem].data.isPurrchased ? 'Đã thanh toán' : 'Chưa thanh toán'}>
                                        <option>Đã thanh toán</option>
                                        <option>Chưa thanh toán</option>
                                    </select>
								</td>
								<td>{requestList[requestItem].data.orderNote}</td>
							</tr>
						))}
					</tbody>
				</table> */}
			</div>
		);
	}
}

PrintManager.propTypes = {};

export default PrintManager;
