import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FilmItem from './FilmItem/FilmItem';

class FilmGroup extends PureComponent {
	render() {
		const { filmArray, categoryName } = this.props;
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
						<FilmItem key={index} filmData={filmDetail} />
					))}
				</tbody>
			</table>
		);
	}
}

FilmGroup.propTypes = {};

export default FilmGroup;
