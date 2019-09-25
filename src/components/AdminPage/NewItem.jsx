import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './FilmItem.css';
import editIcon from '../../icons/edit.svg';
import doneIcon from '../../icons/done.svg';
import cancelIcon from '../../icons/cancel.svg';
import { db } from '../../firebase';
import './NewItem.css';

class NewItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			filmImageUrl: '',
			filmName: '',
			filmDate: '',
			filmPrice: '',
			filmCategory: '',
			filmType: '',
			filmNewArrival: false,
			filmShowInList: true,
			filmStatus: 'in'
		};
	}
	addNewFilm = () => {
		const {
			filmImageUrl,
			filmName,
			filmDate,
			filmPrice,
			filmCategory,
			filmType,
			filmNewArrival,
			filmShowInList,
			filmStatus
		} = this.state;
		
		// Validate data
		if (!(filmImageUrl && filmName && filmDate && filmPrice && filmCategory && filmType)) {
			alert('Nhập đầy đủ thông tin!');
			return;
		}
		const newItem = {
			filmImageUrl,
			filmName,
			filmDate,
			filmPrice,
			filmCategory,
			filmType,
			filmNewArrival,
			filmShowInList,
			filmStatus
		};
		try {
			db.collection('FilmList').add({ ...newItem }).then(ref => {
				alert("Add successfully!")
			});
		} catch (error) {
			alert("Adding error!")
			console.log(error);
		}
	};

	render() {
		return (
			<div className="container" style={{ marginTop: '200px' }}>
				<div className="form-group">
					<label>Image URL: </label>
					<input
						type="text"
						className="form-control"
						onChange={e => this.setState({ filmImageUrl: e.target.value })}
					/>
					<small className="form-text text-muted">
						Input image url.
					</small>
				</div>
				<div className="form-group">
					<label>Film name: </label>
					<input
						className="form-control"
						type="text"
						onChange={e => this.setState({ filmName: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<label>Film category: </label>
					<input
						className="form-control"
						type="text"
						onChange={e => this.setState({ filmCategory: e.target.value })}
					/>
				</div>
				<small className="form-text text-muted">
						Eg. "120", "135", "Accessories", "Chemistry",...
					</small>
				<div className="form-group">
					<label>Film type: </label>
					<input
						className="form-control"
						type="text"
						onChange={e => this.setState({ filmType: e.target.value })}
					/>
									<small className="form-text text-muted">
						Eg. "BW", "Color",...
					</small>
				</div>
				<div className="form-group">
					<label>Film date: </label>
					<input
						className="form-control"
						type="text"
						onChange={e => this.setState({ filmDate: e.target.value })}
					/>				<small className="form-text text-muted">
					Eg. "2020", "2021",...
				</small>
				</div>
				<div className="form-group">
					<label>Film price: </label>
					<input
						className="form-control"
						type="text"
						onChange={e => this.setState({ filmPrice: e.target.value })}
					/>
									<small className="form-text text-muted">
						Eg. "120000", "180000",...
					</small>
				</div>

				{/* <div className="form-group">
					<input className="form-control" type="checkbox" defaultChecked={true} ref="filmStatus" />
					<div>In stock</div>
				</div> */}
				<div className="form-group">
				<button type="button" class="status-button btn btn-outline-success submitnewfilm-button" onClick={() => this.addNewFilm()}>Submit</button>
				<button type="button" class="status-button btn btn-outline-success goback-button" onClick={() => this.props.history.push('./admin')}>Go back</button>
				</div>
			</div>
		);
	}
}

NewItem.propTypes = {};

export default NewItem;
