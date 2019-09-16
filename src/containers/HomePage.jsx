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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'


class HomePage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			filmList: [],
			loading: true
		};
	}

	async componentDidMount() {
		db.collection('FilmList')
			.get()
			.then(querySnapshot => {
				const data = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data()}));
				console.log(data);
				this.setState({filmList: data, loading: false})
			});
    }

	render() {
		
		const { filmList, loading } = this.state;
		if(loading) return (<div className="main"><h5>Loading...</h5></div>);
		const film120 = filmList.map(item => item.filmCatgory=="120");
		const film135 = filmList.map(item => item.filmCatgory=="135");
		const filmAccessories = filmList.map(item => item.filmCatgory=="Accessories");
		const filmChemistry = filmList.map(item => item.filmCatgory=="Chemistry");
		return (
			<div className="main">

			
				<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
				<Tab eventKey="film135" title="Film 135">
					<FilmGroup filmArray={film135} categoryName="Film 135" />
				</Tab>
				<Tab eventKey="film120" title="Film 120">
					<FilmGroup filmArray={film120} categoryName="Film 120" />
				</Tab>
				<Tab eventKey="filmAccessories" title="Accessories">
					<FilmGroup filmArray={filmAccessories} categoryName="Accessories" />
				</Tab>
				<Tab eventKey="filmChemistry" title="Chemistry">
					<FilmGroup filmArray={filmChemistry} categoryName="Chemistry" />
				</Tab>
				</Tabs>


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
					            {/* { filmList.map((filmData, index) => (
                <FilmItem key={index} filmData={filmData}
                    addNewFilm={this.addNewFilm}
                    deleteFilm={this.deleteFilm}/>
           		 ))} */}
												

						{/* Add new item */}
						{/* {addMode && <NewItem addNewFilm={this.addNewFilm} cancelAddMode={this.cancelAddMode}/>}
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
				</table> */}
			</div>
		);
	};
}
HomePage.propTypes = {};

export default HomePage;
