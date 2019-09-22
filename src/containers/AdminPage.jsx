import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import './HomePage.css';
import { apiUrl, staticData } from '../appConstant';
import { request } from '../requestApi';
import FilmItem from '../components/AdminPage/FilmItem';
import NewItem from '../components/AdminPage/NewItem';
import FilmGroup from '../components/AdminPage/FilmGroup';
import { db } from '../firebase';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'

class AdminPage extends PureComponent {
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

	// generateFilmId = () => {
	// 	const { filmList } = this.state;
	// 	const idArray = [];
	// 	filmList.forEach(item=> idArray.push(Number(item.id)));
	// 	idArray.sort(function(a, b){return a - b});
	// 	return Number(idArray[idArray.length-1]) + 1;
	// }

	// addNewFilm = newDetail => {
	// 	const newFilmList = [...this.state.filmList];
	// 	const foundItem = newFilmList.findIndex(item => item.id == newDetail.id);
	// 	if (foundItem >= 0) {
	// 		newFilmList[foundItem] = newDetail;
	// 	} else {
	// 		const newId = this.generateFilmId();
	// 		newFilmList.push({...newDetail, id: newId});
	// 	}
	// 	this.setState({ filmList: newFilmList, addMode: false });
	// };

	deleteFilm = itemDetail => {
		try{
			db.collection("FilmList").doc(itemDetail.id).delete().then(function() {
				alert("Delete successfully!");
				console.log("Document successfully deleted!");
				// this.setState({...this.state});
			}).catch(function(error) {
				console.error("Error removing document: ", error);
			});
		}
		catch (error){
			console.error(error);
		}
	}

    addNewItem = () => {
        this.setState({addMode: true})
	}
	
	updateFilmDetail = (filmId, filmDetail) => {
		// console.log(this.state.filmList);
		// const response = Axios.post( 'https://us-central1-llab-development.cloudfunctions.net/fetch_film_store', {data: this.state.filmList});
		// response.then(data =>console.log(data)).catch(err=> console.log(err));
	}

	cancelAddMode = () => {
		this.setState({addMode: false})
	}

	render() {
		
		const { filmList, addMode, loading } = this.state;
		if(loading) return (<div className="main"><h3>Can not get film list.</h3></div>);

		return (
			<div className="main">
				{/* <table className="table table-hover">
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
					<tbody> */}
					{/* {categoryArray.map(category =>(
						<FilmGroup categoryName={categoryName[category]} filmArray={filmList[category]}/>
					))} */}
					<Tabs defaultActiveKey="film135" id="uncontrolled-tab-example">
					<Tab eventKey="film135" title="Film 135">
						<FilmGroup filmArray={filmList} categoryName="135" deleteFilm={this.deleteFilm}/>
					</Tab>
					<Tab eventKey="film120" title="Film 120">
						<FilmGroup filmArray={filmList} categoryName="120" deleteFilm={this.deleteFilm}/>
					</Tab>
					<Tab eventKey="filmAccessories" title="Accessories">
						<FilmGroup filmArray={filmList} categoryName="Accessories" deleteFilm={this.deleteFilm} />
					</Tab>
					<Tab eventKey="filmChemistry" title="Chemistry">
						<FilmGroup filmArray={filmList} categoryName="Chemistry" deleteFilm={this.deleteFilm}/>
					</Tab>
					</Tabs>
												

						{/* Add new item */}

					{/* </tbody>
				</table> */}
			</div>
		);
	};
}
AdminPage.propTypes = {};

export default AdminPage;
