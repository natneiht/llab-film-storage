import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom';
import HomePage from './containers/HomePage';
import Login from './containers/Login';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
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
