import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../functions';
import './NewPrintingRequest.css';
import { isNumber } from 'util';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

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
		return (
			<tr>
				<td>
					<Select
					value={printType!==null ? printType : printingArray[0]}
					onChange={(e) => this.setState({ printType: e.target.value, printSize: null })}
					inputProps={{
						name: 'type',
						id: 'item-type',
					}}
					>
							{printingArray.map(item => (
								<MenuItem key={item} value={item}>{item}</MenuItem>
							))}
					</Select>
					<FormHelperText style={{textAlign: "center"}}>Chọn kiểu in</FormHelperText>
				</td>

				{printType !== null && (
					<td>
					<Select
						value={printSize!==null ? printSize : printSizeArray[0]}
						onChange={(e) => this.setState({ printSize: e.target.value, printItemPrice: printSizeList[e.target.value] })}
						inputProps={{
							name: 'size',
							id: 'item-size',
						}}
						>
								{printSizeArray.map(item => (
									<MenuItem key={item} value={item}>{item}</MenuItem>
								))}
					</Select>
					</td>
				)}
				{printSize !== null && (
					<>
						<td>
							<TextField
								id="standard-number"
								// label="Number"
								value={this.state.printQuantity}
								onChange={e => {
									if(e.target.value > 0) this.setState({ printQuantity: Number(e.target.value) })
								}}
								type="number"
								// className={classes.textField}
								InputLabelProps={{
								shrink: true,
								}}
								// margin="normal"
							/>
						</td>
						<td>{formatCurrency(printItemPrice)}</td>
						<td>{formatCurrency(printItemPrice * printQuantity)}</td>
						<td>
							<button className="btn btn-success" onClick={() => this.addToPrintingList()}>
								Thêm
							</button>
						</td>
					</>
				)}
			</tr>
		);
	}
}

NewPrintingRequest.propTypes = {};

export default NewPrintingRequest;
