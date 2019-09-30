import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DropDown from 'react-bootstrap/Dropdown';
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';
import { formatCurrency } from '../../functions';
import './NewPrintingRequest.css';
import { isNumber } from 'util';

class NewPrintingRequest extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			printType: null,
			printSize: null,
			printItemPrice: null,
			printQuantity: 1
		};
	}

	addToPrintingList = () => {
		const { printType, printSize, printQuantity, printItemPrice } = this.state;
		if(!isNumber(printQuantity)) {
			alert("Số lượng không hợp lệ!");
			return;
		}
		this.props.addNewPrintItem({ printSize, printType, printQuantity, printItemPrice });

		this.setState({
			printType: null,
			printSize: null,
			printItemPrice: null,
			printQuantity: 1
		});
	};
	render() {
		const { printPrice, addNewPrintItem } = this.props;
		const { printType, printSize, printQuantity, printItemPrice } = this.state;
		const printingArray = Object.keys(printPrice);
		let printSizeArray = null;
		let printSizeList = null;
		//If user selects a printing type
		if (printType) {
			printSizeArray = Object.keys(printPrice[printType]);
			printSizeList = printPrice[printType];
		}
		// console.log(printSizeList);
		return (
			<tr>
				{/* <PrintingType printingType={this.props.printingArray}/> */}
				<td>
					<DropDown>
						<DropDown.Toggle variant="secondary" id="dropdown-basic">
							{printType ? printType : 'Chọn kiểu in'}
						</DropDown.Toggle>
						<DropDown.Menu>
							{printingArray.map(item => (
								<DropDown.Item key={item} onClick={() => this.setState({ printType: item, printSize: null })}>
									{item}
								</DropDown.Item>
							))}
						</DropDown.Menu>
					</DropDown>
				</td>

				{printType !== null && (
					<td>
						<DropDown>
							<DropDown.Toggle variant="secondary" id="dropdown-basic">
								{printSize ? printSize : 'Chọn kích cỡ'}
							</DropDown.Toggle>
							<DropDown.Menu>
								{printSizeArray.map(item => (
									<DropDown.Item
										key={item}
										onClick={() =>
											this.setState({ printSize: item, printItemPrice: printSizeList[item] })}
									>
										{item}
									</DropDown.Item>
								))}
							</DropDown.Menu>
						</DropDown>
					</td>
				)}
				{printSize !== null && (
					<>
						<td>
							<button
								type="button"
								className="btn btn-default btn-sm decrease-button"
								onClick={() =>
									this.setState({
										printQuantity: printQuantity <= 1 ? printQuantity : printQuantity - 1
									})}
							>
								-
							</button>
							<input
								type="text"
								className="product-quantity-input"
								value={printQuantity}
								onChange={e => this.setState({ printQuantity: e.target.value })}
							/>
							<button
								type="button"
								className="btn btn-default btn-sm increase-button"
								onClick={() => this.setState({ printQuantity: printQuantity + 1 })}
							>
								+
							</button>
						</td>
						<td>{formatCurrency(printItemPrice)}</td>
						<td>{formatCurrency(printItemPrice * printQuantity)}</td>
						<td>
							<button className="btn btn-success" onClick={() => this.addToPrintingList()}>
								Add
							</button>
						</td>
					</>
				)}
				{/* {printType !== null && (
					<select name="film-size">
						{printSizeArray.map(item => <option value="prtintingType">{item}</option>)}
					</select>
				)} */}
			</tr>
		);
	}
}

NewPrintingRequest.propTypes = {};

export default NewPrintingRequest;
