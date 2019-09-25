import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './FilmItem.css';
import editIcon from '../../icons/edit.svg';
import doneIcon from '../../icons/done.svg';
import cancelIcon from '../../icons/cancel.svg';
import deleteIcon from '../../icons/delete.svg';
import { db } from '../../firebase';
import { formatCurrency } from '../../functions';

class FilmItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			filmData: this.props.filmData
		};
	}

	switchToEditMode = () => {
		this.setState({ editMode: true });
	};


	updateFilmDetail = () =>{
		const {id, data} = this.state.filmData;
		const { newUrl, newFilmDate, newFilmPrice, newFilmName, filmStatus } = this.refs;
		if( !(newUrl.value && newFilmDate.value && newFilmPrice.value )) return;
		console.log(this.props.filmData);
		const newDetail = {
			...data,
			filmName: newFilmName.value,
			filmImageUrl: newUrl.value,
			filmPrice: newFilmPrice.value,
			filmDate: newFilmDate.value,
			filmStatus: filmStatus.checked?"in":"out"
		}
		console.log(id, newDetail);
		try {
			db.collection('FilmList').doc(id).set({...newDetail}).then(res => console.log(res));
			

				this.setState({filmData: {id, data: newDetail}, editMode:false});
			}
			catch(error) {
				console.log(error);
			}
	}
	
	deleteFilmItem = filmItem => {
		const { deleteFilm } = this.props;
		deleteFilm(filmItem);
		this.setState({filmData: null});
	}

	render() {
		if(!this.state.filmData) return (<div></div>);
		const { filmData, editMode } = this.state;
		const filmDetail = filmData.data;
		const filmStatus = filmDetail.filmStatus === 'in' ? true : false;
		const statusClass = filmStatus ? 'in-stock' : 'out-stock';
		// console.log(filmStatus);
		// console.log(this.props.filmDetail.status);
		const showView = (
			<tr className={statusClass}>
				<td scope="row">
					<img src={filmDetail.filmImageUrl} />
				</td>
				<td>
					<span>{filmDetail.filmName}</span>
				</td>
				<td>
					<span>{filmDetail.filmDate}</span>
				</td>
				<td>
					<span>{formatCurrency(filmDetail.filmPrice)}</span>
				</td>
				<td>
					<span className={statusClass}>
						{filmDetail.filmStatus === 'in' ? 'In stock' : 'Out stock'}
					</span>
				</td>
				<td>
					<button
						type="button"
						title="Edit film detail"
						className="btn btn-light edit-button"
						onClick={this.switchToEditMode}
					>
						<img src={editIcon} />
					</button>
					<button
						type="button"
						title="Delete from store"
						className="btn btn-light edit-button"
						onClick={() => this.deleteFilmItem(filmData)}
					>
						<img src={deleteIcon} />
					</button>
				</td>
			</tr>
		);
		const editView = (
			<tr className={statusClass}>
				<td scope="row">
					<img src={filmDetail.filmImageUrl} />
					<div className="edit-url">
						<input type="text" defaultValue={filmDetail.filmImageUrl} ref="newUrl" />
					</div>
				</td>
				<td>
					<span></span>
					<input
						className="edit-name"
						type="text"
						defaultValue={filmDetail.filmName}
						ref="newFilmName"
					/>
				</td>
				<td>
					<input
						className="edit-date"
						type="text"
						defaultValue={filmDetail.filmDate}
						ref="newFilmDate"
					/>
				</td>
				<td>
					<input
						className="edit-price"
						type="text"
						defaultValue={filmDetail.filmPrice}
						ref="newFilmPrice"
					/>
				</td>
				<td>
					{/* <button
						type="button"
						className={`status-button btn ${!filmStatus ? 'btn-outline-danger' : 'btn-outline-success'}`}
						onClick={this.toggleFilmStatus}
					>
						{filmDetail.status === 'in' ? 'In stock' : 'Out stock'}
					</button> */}
					<input type="checkbox" defaultChecked={filmStatus} ref="filmStatus" />
					<div>{filmStatus? 'In stock' : 'Out stock'}</div>
    				{/* <label class="form-check-label" for="exampleCheck1">Check me out</label> */}
				</td>
				<td>
					<button
						type="button"
						title="Done editting"
						className="btn btn-light edit-button"
						onClick={this.updateFilmDetail}
					>
						<img src={doneIcon} />
					</button>
					<button
						type="button"
						title="Cancel editting"
						className="btn btn-light edit-button"
						onClick={() => {
							this.setState({ editMode: false });
						}}
					>
						<img src={cancelIcon} />
					</button>
				</td>
			</tr>
		);
		return editMode ? editView : showView;
	}
}

FilmItem.propTypes = {};

export default FilmItem;
