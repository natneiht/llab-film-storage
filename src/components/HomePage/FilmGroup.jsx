import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FilmItem from './FilmItem/FilmItem';

class FilmGroup extends PureComponent {
	render() {
		const { filmArray, categoryName } = this.props;
		const renderArray = filmArray.filter(item => item.data.filmCategory==categoryName).sort((a,b) => {
			if(a.data.filmType < b.data.filmType) return 1;
			if(a.data.filmType < b.data.filmType) return -1;
			return 0 });
			
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Tên film</th>
						<th scope="col">Loại film</th>
						<th scope="col">Date</th>
						<th scope="col">Giá</th>
						<th scope="col">Tình trạng</th>
					</tr>
				</thead>
				<tbody>
					{renderArray.map((filmDetail, index) => (
						<FilmItem key={index} filmData={filmDetail} />
					))}
				</tbody>
			</table>
		);
	}
}

FilmGroup.propTypes = {};

export default FilmGroup;
