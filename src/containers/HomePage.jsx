import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import './HomePage.css';
import { apiUrl, staticData } from '../appConstant';
import { request } from '../requestApi';
import FilmItem from '../components/FilmItem/FilmItem';
import NewItem from '../components/FilmItem/NewItem';
// import '../static.json';

class HomePage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			filmList: [],
			addMode: false
		};
	}

	async componentDidMount() {
		const config = {
		    headers: {'Access-Control-Allow-Origin': '*',
		    'Content-Type': 'application/json',}
		}
		const response = await Axios.get( 'http://us-central1-llab-development.cloudfunctions.net/fetch_film_store', config);
		const responseData = staticData.data;
		this.setState({ filmList: responseData });
		console.log(staticData);
	}

	submitFilmDetail = newDetail => {
		const newFilmList = [...this.state.filmList];
		const foundItem = newFilmList.findIndex(item => item.name == newDetail.name);
		if (foundItem >= 0) {
			newFilmList[foundItem] = newDetail;
		} else {
			newFilmList.push(newDetail);
		}
		this.setState({ filmList: newFilmList, addMode: false });
	};

    addNewItem = () => {
        this.setState({addMode: true})
    }

	render() {
		const { filmList } = this.state;
		return (
			<div className="main">
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
						{filmList.map((filmDetail, index) => (
							<FilmItem key={index} filmDetail={filmDetail} submitFilmDetail={this.submitFilmDetail} />
						))}

						{/* Add new item */}
						{this.state.addMode && <NewItem submitFilmDetail={this.submitFilmDetail} />}
						<tr>
                            <td colSpan="4" />
							<td>
								<button type="button" className="status-button btn btn-outline-success"
                                onClick={this.addNewItem}>
									Add new
								</button>
							</td>
							<td>
								<button type="button" className="status-button btn btn-outline-success">
									Update
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

HomePage.propTypes = {};

export default HomePage;
