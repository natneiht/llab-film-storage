import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FilmItem from './FilmItem';
import NewItem from './NewItem';

class FilmGroup extends PureComponent {

	render() {
		const { filmArray, categoryName, addNewItem } = this.props;
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Tên film</th>
						<th scope="col">Date</th>
						<th scope="col">Giá</th>
						<th scope="col">Tình trạng</th>
						<th scope="col">#</th>
					</tr>
				</thead>
				<tbody>
					{filmArray.map((filmDetail, index) => (
						filmDetail.data.filmCategory===categoryName?<FilmItem key={index} filmData={filmDetail} deleteFilm={this.props.deleteFilm}/>:null
					))}

					{/* {addMode && <NewItem categoryName={categoryName} cancelAddMode={this.cancelAddMode}/>} */}
						<tr>
                            <td colSpan="5" />
							<td>
								<button type="button" className="status-button btn btn-outline-success"
                                onClick={() => addNewItem()}>
									Add new
								</button>
							</td>
						</tr>
				</tbody>
			</table>
		);
	}
}

FilmGroup.propTypes = {};

export default FilmGroup;
