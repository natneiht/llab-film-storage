import React, { PureComponent, Suspense } from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';
import { db } from '../firebase';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'
import LabNoti from '../components/HomePage/LabNoti';
import Footer from '../components/Footer/Footer';
const FilmGroup = React.lazy(() => import('../components/HomePage/FilmGroup'));



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

		return (
			<>
			<div className="main">
				<LabNoti />
				<Suspense fallback={(<div>Loading...</div>)}>
				<Tabs defaultActiveKey="film135" id="uncontrolled-tab-example">
				<Tab eventKey="film135" title="Film 135">
					<FilmGroup filmArray={filmList} categoryName="135" />
				</Tab>
				<Tab eventKey="film120" title="Film 120">
					<FilmGroup filmArray={filmList} categoryName="120" />
				</Tab>
				<Tab eventKey="filmAccessories" title="Accessories">
					<FilmGroup filmArray={filmList} categoryName="Accessories" />
				</Tab>
				<Tab eventKey="filmChemistry" title="Chemistry">
					<FilmGroup filmArray={filmList} categoryName="Chemistry" />
				</Tab>
				</Tabs>
				</Suspense>
			</div>
			<Footer />
			</>
		);
	};
}
HomePage.propTypes = {};

export default HomePage;
