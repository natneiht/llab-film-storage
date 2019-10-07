import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FilmGroup from '../components/FilmManager/FilmGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import firebase from 'firebase';
import { getUserRole } from '../functions';
import { db } from '../firebase';
import './css/FilmManager.css';

class FilmManager extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			filmList: [],
			loading: true
		};
	}

	async componentDidMount() {
		db.collection('FilmList').get().then(querySnapshot => {
			const data = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
			// console.log(data);
			this.setState({ filmList: data, loading: false });
		});
	}

	deleteFilm = itemDetail => {
		if (!window.confirm('Are you sure you wish to delete this item?')) return;
		try {
			db
				.collection('FilmList')
				.doc(itemDetail.id)
				.delete()
				.then(function() {
					alert('Delete successfully!');
					console.log('Document successfully deleted!');
				})
				.catch(function(error) {
					alert('Error removing film!');
					console.error('Error removing film: ', error);
				});
		} catch (error) {
			console.error(error);
		}
	};

	addNewItem = () => {
		this.props.history.push('./admin/addnewfilm');
	};

	render() {
		var user = firebase.auth().currentUser;
		// if (user) {
		// 	console.log('Role', getUserRole(user.email));
		// }
		const { filmList, loading } = this.state;
		if (loading)
			return (
				<div className="container">
					<h3>Loading...</h3>
				</div>
			);
		const filmGroup = {
			'135': 'Film 135',
			'120': 'Film 120',
			Accessories: 'Accessories',
			Chemistry: 'Chemiscal'
		};
		const filmGroupArray = Object.keys(filmGroup);
		return (
			<div className="container-lg film-manager-wrapper">
				<h3>
					<strong>Quản lý film </strong>
				</h3>
				<br />
				<Tabs defaultActiveKey="135" id="uncontrolled-tab-example">
					{filmGroupArray.map(filmGroupItem => (
						<Tab key={filmGroupItem} eventKey={filmGroupItem} title={filmGroup[filmGroupItem]}>
							<FilmGroup
								filmArray={filmList}
								categoryName={filmGroupItem}
								deleteFilm={this.deleteFilm}
								addNewItem={this.addNewItem}
							/>
						</Tab>
					))}
				</Tabs>
			</div>
		);
	}
}
FilmManager.propTypes = {};

export default FilmManager;
