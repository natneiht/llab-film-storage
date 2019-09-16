import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import './HomePage.css';
import { apiUrl, staticData } from '../appConstant';
import { request } from '../requestApi';
import FilmItem from '../components/HomePage/FilmItem/FilmItem';
import NewItem from '../components/HomePage/FilmItem/NewItem';
import FilmGroup from '../components/HomePage/FilmGroup';
import { db } from '../firebase';

class HomePage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			filmList: [],
			addMode: false,
			loading: true
		};
	}

	async componentDidMount() {
		// const response = await Axios.get( 'https://us-central1-llab-development.cloudfunctions.net/fetch_film_store');
		// console.log(response);
		// const responseData = response.data.data;
		// this.setState({ filmList: responseData, loading: false });
		db.collection('FilmList')
			.get()
			.then(querySnapshot => {
				const data = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data()}));
				console.log(data);
				this.setState({filmList: data, loading: false})
			});
    }

	generateFilmId = () => {
		const { filmList } = this.state;
		const idArray = [];
		filmList.forEach(item=> idArray.push(Number(item.id)));
		idArray.sort(function(a, b){return a - b});
		return Number(idArray[idArray.length-1]) + 1;
	}

	addNewFilm = newDetail => {
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

	deleteFilm = itemDetail => {
		
		const newFilmList = [...this.state.filmList];
		const foundItem = newFilmList.findIndex(item => item.id == itemDetail.id);
		console.log(foundItem);
		if (foundItem >= 0) {
			newFilmList.splice(foundItem,1);
		}
		this.setState({ filmList: newFilmList, addMode: false });

	}

    addNewItem = () => {
        this.setState({addMode: true})
	}
	
	putDetailToServer = () => {
		console.log(this.state.filmList);
		const response = Axios.post( 'https://us-central1-llab-development.cloudfunctions.net/fetch_film_store', {data: this.state.filmList});
		response.then(data =>console.log(data)).catch(err=> console.log(err));
	}

	cancelAddMode = () => {
		this.setState({addMode: false})
	}

	render() {
		
		const { filmList, addMode, loading } = this.state;
		if(loading) return (<div className="main"><h3>Can not get film list.</h3></div>);
		// const categoryArray = Object.keys(filmList);
		// categoryArray.map(cat => console.log(filmList[cat]));
		// const categoryName = {
		// 	accessories: "Accessories",
		// 	chemistry: "Chemistry",
		// 	film_120: "Film 120",
		// 	film_135: "Film 135",
		// 	sheet_film_4x5: "Sheet film 4x5",
		// }
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
					{/* {categoryArray.map(category =>(
						<FilmGroup categoryName={categoryName[category]} filmArray={filmList[category]}/>
					))} */}
					            { filmList.map((filmData, index) => (
                <FilmItem key={index} filmData={filmData}
                    addNewFilm={this.addNewFilm}
                    deleteFilm={this.deleteFilm}/>
           		 ))}
												

						{/* Add new item */}
						{addMode && <NewItem addNewFilm={this.addNewFilm} cancelAddMode={this.cancelAddMode}/>}
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
	};
}
HomePage.propTypes = {};

export default HomePage;
