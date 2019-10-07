import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { isLogin } from '../utils';

class AdminPage extends PureComponent {
	componentDidMount() {
		const loginStatus = isLogin();
		//   console.log(loginStatus);
		if (!loginStatus) this.props.history.push('./login');
		if (loginStatus) this.props.history.push('./admin/film-manager');
	}

	render() {
		return (
			<div className="container admin-wrapper">
				{/* <div>
                <Link to='./admin/film-manager'>Film manager</Link>
                </div>
                <div>
                <Link to='./admin/print-manager'>Print manager</Link>
                </div> */}
				{/* <FilmManager /> */}
				{/* <Tabs defaultActiveKey="film-manager" id="uncontrolled-tab-example">
					<Tab eventKey="film-manager" title="Quản lý film">
						<FilmManager />
					</Tab>
					<Tab eventKey="print-manager" title="Quản lý in ấn">
                        <PrintManager />
					</Tab>
				</Tabs> */}
			</div>
		);
	}
}

AdminPage.propTypes = {};

export default AdminPage;
