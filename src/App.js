import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom';
import HomePage from './containers/HomePage';
import PrivateRoute from './components/Route/PrivateRoute';
const NewItem = React.lazy(() => import('./components/AdminPage/NewItem'));
const Login = React.lazy(() => import('./containers/Login'));
const AdminPage = React.lazy(() => import('./containers/AdminPage'));
const PhotoPrinting = React.lazy(() => import('./containers/PhotoPrinting'));

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Suspense fallback={<div>Loading...</div>}>
					<Route exact path="/login" component={Login} />
					<Route exact path="/print" component={PhotoPrinting} />
					<PrivateRoute exact path="/admin" component={AdminPage} />
					<PrivateRoute exact path="/admin/addnewfilm" component={NewItem} />
					
				</Suspense>
				<Route
					render={props => (
						<div className="container" style={{ marginTop: '200px' }}>
							<h3>
								Nothing here... Back to <NavLink to="/">homepage.</NavLink>
							</h3>
						</div>
					)}
				/>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
