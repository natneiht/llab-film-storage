import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FilmManager from './FilmManager';
import './css/AdminPage.css'

class AdminPage
 extends PureComponent {
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