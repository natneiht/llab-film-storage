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
		// const config = {
		//     headers: {'Access-Control-Allow-Origin': '*',
		// 	'Content-type': 'application/json; charset=utf-8',
		// 	'Access-Control-Allow-Credentials' : 'true'}
		// }
		const response = await Axios.get( 'https://us-central1-llab-development.cloudfunctions.net/fetch_film_store');
		// const requestURL = 'https://us-central1-llab-development.cloudfunctions.net/fetch_film_store'
		console.log(response);
		// const responseData = response.data;
		const responseData = response.data.data;
		this.setState({ filmList: responseData });
		// console.log(staticData);
	}

	generateFilmId = () => {
		const { filmList } = this.state;
		const idArray = [];
		filmList.forEach(item=> idArray.push(Number(item.id)));
		idArray.sort(function(a, b){return a - b});
		return Number(idArray[idArray.length-1]) + 1;
	}

	submitFilmDetail = newDetail => {
		const newFilmList = [...this.state.filmList];
		const foundItem = newFilmList.findIndex(item => item.id == newDetail.id);
		if (foundItem >= 0) {
			newFilmList[foundItem] = newDetail;
		} else {
			const newId = this.generateFilmId();
			newFilmList.push({...newDetail, id: newId});
		}
		this.setState({ filmList: newFilmList, addMode: false });
	};

    addNewItem = () => {
        this.setState({addMode: true})
	}
	
	putDetailToServer = () => {
		console.log(this.state.filmList);
		const response = Axios.post( 'https://us-central1-llab-development.cloudfunctions.net/fetch_film_store', {data: this.state.filmList});
		response.then(data =>console.log(data)).catch(err=> console.log(err));
		// Send a POST request
		// axios({
		// 	method: 'put',
		// 	url: '/user/12345',
		// 	data: {
		// 	firstName: 'Fred',
		// 	lastName: 'Flintstone'
		// 	}
		// });
	}

	cancelAddMode = () => {
		this.setState({addMode: false})
	}

	render() {
		const { filmList,addMode } = this.state;
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
						{addMode && <NewItem submitFilmDetail={this.submitFilmDetail} cancelAddMode={this.cancelAddMode}/>}
						<tr>
                            <td colSpan="4" />
							<td>
								{!addMode && (<button type="button" className="status-button btn btn-outline-success"
                                onClick={this.addNewItem}>
									Add new
								</button>)}
							</td>
							<td>
								<button type="button" className="status-button btn btn-outline-success"
								onClick={this.putDetailToServer}>
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
