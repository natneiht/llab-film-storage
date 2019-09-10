import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './FilmItem.css';
import editIcon from '../../icons/edit.svg';
import doneIcon from '../../icons/done.svg';
import cancelIcon from '../../icons/cancel.svg';
import deleteIcon from '../../icons/delete.svg';

class FilmItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			newFilmDetail: this.props.filmDetail
		};
	}

	switchToEditMode = () => {
		this.setState({ editMode: true });
	};

	changeFilmDetail = detail => {
		const newFilmDetail = {
			...this.state.newFilmDetail,
			...detail
		};
		this.setState({
			newFilmDetail
		});
	};

	updateFilmDetail = () => {
		const { newFilmDetail } = this.state;
		this.setState({ editMode: false });
		this.props.addNewFilm(newFilmDetail);
	};

	toggleFilmStatus = () => {
		const filmStatus = this.props.filmDetail.status;
		alert(filmStatus === 'in' ? 'Đã thông báo hết hàng!' : 'Đã thông báo còn hàng!');
		const newFilmDetail = {
			...this.state.newFilmDetail,
			status: filmStatus === 'in' ? 'out' : 'in'
		};
		this.props.addNewFilm(newFilmDetail);
	};
	render() {
		const { filmDetail, deleteFilm } = this.props;
		const { editMode } = this.state;
		const filmStatus = filmDetail.status === 'in' ? true : false;
		const statusClass = filmStatus ? '' : 'table-secondary';
		// console.log(this.props.filmDetail.status);
		const showView = (
			<tr className={statusClass}>
				<td scope="row">
					<img src={filmDetail.image_url} />
				</td>
				<td>
					<span>{filmDetail.name}</span>
				</td>
				<td>
					<span>{filmDetail.date}</span>
				</td>
				<td>
					<span>{filmDetail.price}</span>
				</td>
				<td>
					<button
						type="button"
						className={`status-button btn ${!filmStatus ? 'btn-outline-danger' : 'btn-outline-success'}`}
						onClick={this.toggleFilmStatus}
					>
						{filmDetail.status === 'in' ? 'In stock' : 'Out stock'}
					</button>
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
						onClick={() => deleteFilm(filmDetail)}
					>
						<img src={deleteIcon} />
					</button>
				</td>
			</tr>
		);
		const editView = (
			<tr className={statusClass}>
				<td scope="row">
					<img src={filmDetail.image_url} />
					<div className="edit-url">
						<input type="text" defaultValue={filmDetail.image_url} ref="newUrl" />
					</div>
				</td>
				<td>
					<span>{filmDetail.name}</span>
				</td>
				<td>
					<input
						className="edit-date"
						type="text"
						defaultValue={filmDetail.date}
						onChange={e => this.changeFilmDetail({ date: e.target.value })}
					/>
				</td>
				<td>
					<input
						className="edit-price"
						type="text"
						defaultValue={filmDetail.price}
						onChange={e => this.changeFilmDetail({ price: e.target.value })}
					/>
				</td>
				<td>
					<button
						type="button"
						className={`status-button btn ${!filmStatus ? 'btn-outline-danger' : 'btn-outline-success'}`}
						onClick={this.toggleFilmStatus}
					>
						{filmDetail.status === 'in' ? 'In stock' : 'Out stock'}
					</button>
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
