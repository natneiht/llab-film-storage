import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './FilmItem.css';
import editIcon from '../../icons/edit.svg';
import doneIcon from '../../icons/done.svg';
import cancelIcon from '../../icons/cancel.svg';

class NewItem extends PureComponent {

    submitNewFilm = () => {
        const {newUrl, newName, newDate, newPrice } = this.refs;
        // Validate data
        if(!(newUrl.value && newName.value && newDate.value && newPrice.value)){
			alert('Nhập đầy đủ thông tin!')
			return;
		}
        this.props.submitFilmDetail({
            name: newName.value,
            image_url: newUrl.value,
            date: newDate.value,
            price: newPrice.value,
            status: 'in',
        });
        
    }

	render() {
		return (
			<tr>
				<td scope="row">
					{/* <img src={this.refs.newUrl.value} /> */}
					<div className="edit-url">
						<input type="text" ref="newUrl" />
					</div>
				</td>
				<td>
					<div className="edit-name">
						<input type="text" ref="newName" />
					</div>
				</td>
				<td>
                    <div className="edit-date">
						<input type="text" ref="newDate" />
					</div>
				</td>
				<td>
                    <div className="edit-price">
						<input type="text" ref="newPrice" />
					</div>
				</td>
				<td>
					<button
						type="button"
						className={`status-button btn btn-outline-success disabled`}>
                        In stock
					</button>
				</td>
				<td>
					<button type="button" className="btn btn-light edit-button" onClick={this.submitNewFilm}>
						<img src={doneIcon} />
					</button>

					<button type="button" className="btn btn-light edit-button" onClick={this.props.cancelAddMode}>
						<img src={cancelIcon} />
					</button>

				</td>
			</tr>
		);
	}
}

NewItem.propTypes = {};

export default NewItem;
