import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './FilmItem.css';
import editIcon from '../../icons/edit.svg';
import doneIcon from '../../icons/done.svg';
import cancelIcon from '../../icons/cancel.svg';
import {db} from '../../firebase';

class NewItem extends PureComponent {

    addNewFilm = () => {
		const { newUrl, newFilmDate, newFilmPrice, newFilmName, filmStatus } = this.refs;
        // Validate data
        // if(!(newUrl.value && newName.value && newDate.value && newPrice.value)){
		// 	alert('Nhập đầy đủ thông tin!')
		// 	return;
		// }

		if( !(newUrl.value && newFilmDate.value && newFilmPrice.value && newFilmName.value )){
			alert('Nhập đầy đủ thông tin!')
			return;
		}
		const newItem = {
			filmImageUrl: newUrl.value,
            filmName: newFilmName.value,
            filmDate: newFilmDate.value,
            filmPrice: newFilmPrice.value,
            filmCategory: this.props.categoryName,
            filmType: this.props.categoryName,
            filmNewArrival: false,
            filmShowInList: true,
			filmStatus: filmStatus.checked?"in":"out"
		}
		// console.log(id, newDetail);
		try {
			db.collection('FilmList').add({...newItem}).then(ref => {
				console.log(ref);
				this.props.cancelAddMode();
			});
			

				// this.setState({filmData: {id, data: newDetail}, editMode:false});
			}
			catch(error) {
				console.log(error);
			}
    }

	render() {
		return (
		<tr>
				<td scope="row">
					{/* <img src={filmDetail.filmImageUrl} /> */}
					<div className="edit-url">
						<input type="text" ref="newUrl" />
					</div>
				</td>
				<td>
					<span></span>
					<input
						className="edit-name"
						type="text"
						ref="newFilmName"
					/>
				</td>
				<td>
					<input
						className="edit-date"
						type="text"
						ref="newFilmDate"
					/>
				</td>
				<td>
					<input
						className="edit-price"
						type="text"
						ref="newFilmPrice"
					/>
				</td>
				<td>

					<input type="checkbox" defaultChecked={true} ref="filmStatus" />
					<div>In stock</div>

				</td>
				<td>
					<button
						type="button"
						title="Done editting"
						className="btn btn-light edit-button"
						onClick={this.addNewFilm}
					>
						<img src={doneIcon} />
					</button>
					<button
						type="button"
						title="Cancel editting"
						className="btn btn-light edit-button"
						onClick={() => this.props.cancelAddMode}
					>
						<img src={cancelIcon} />
					</button>
				</td>
			</tr>
		);
	}
}

NewItem.propTypes = {};

export default NewItem;
