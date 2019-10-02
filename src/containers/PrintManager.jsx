import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { getUserRole } from '../functions';
import { db } from '../firebase';
import { formatCurrency } from '../functions';
import './css/PrintManager.css';

class PrintManager extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			requestList: [],
			loading: true
		};
	}

	async componentDidMount() {
		db.collection('PrintingRequest').get().then(querySnapshot => {
			const data = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
			console.log(data);
			this.setState({ requestList: data, loading: false });
		});
	}

	deleteFilm = itemDetail => {
		if (!window.confirm('Are you sure you wish to delete this item?')) return;
		try {
			db
				.collection('requestList')
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

	addNewItem = () => {
		this.props.history.push('./admin/addnewfilm');
	};

	render() {
		const { requestList, loading } = this.state;
		console.log(this.state);
		if (loading)
			return (
				<div className="container">
					<h3>Loading...</h3>
				</div>
			);

		const requestArray = Object.keys(requestList);
		return (
			<div className="container print-manager-wrapper">
				<h3>
					<strong>Danh sách đơn hàng </strong>
				</h3>
				<table className="table print-table">
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
				</table>
			</div>
		);
	}
}

PrintManager.propTypes = {};

export default PrintManager;
