import React, { PureComponent } from 'react';
import { formatCurrency } from '../../functions';
import PropTypes from 'prop-types';

class PrintItem extends PureComponent {
	render() {

        const { itemDetail, removePrintitemDetail } = this.props;
		return (
			<tr>
			<td>{itemDetail.printType}</td>
			<td>{itemDetail.printSize}</td>
			<td>{itemDetail.printQuantity}</td>
			<td>{formatCurrency(itemDetail.printItemPrice)}</td>

			<td>{formatCurrency(itemDetail.printItemPrice * itemDetail.printQuantity)}</td>
			<td>
				<button className="btn btn-danger" onClick={() => removePrintitemDetail(itemDetail)}>
					x
				</button>
			</td>
		</tr>
		);
	}
}

PrintItem.propTypes = {

};

export default PrintItem;