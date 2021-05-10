import React from 'react';

import GoogleAuth from './GoogleAuth';

const NavBar = () => {
    return (
        <nav className="navbar fixed-top navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand" href="#">
                    Marvel Timeline
                </span>
                <GoogleAuth />
            </div>
        </nav>
    );
};

export default NavBar;
