import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom';
import HomePage from './containers/HomePage';
const Login = React.lazy(()=> import('./containers/Login'));
const AdminPage = React.lazy(() =>import('./containers/AdminPage'));

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/admin" component={AdminPage} />
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
  </BrowserRouter>
  );
}

export default App;
