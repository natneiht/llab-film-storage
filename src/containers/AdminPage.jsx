import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FilmManager from './FilmManager';
import './css/AdminPage.css'

class AdminPage
 extends PureComponent {

    componentDidMount() {
      const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
      if(loginStatus.status && loginStatus.userRole) this.props.history.push('./admin');
    }
    
    render() {
        return (
            <div className="container admin-wrapper">
                <div>
                <Link to='./admin/film-manager'>Film manager</Link>
                </div>
                <div>
                <Link to='./admin/print-manager'>Print manager</Link>
                </div>
                {/* <FilmManager /> */}
            </div>
        );
    }
}

AdminPage
.propTypes = {

};

export default AdminPage
;