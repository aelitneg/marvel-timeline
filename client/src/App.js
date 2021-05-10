import React from 'react';

import NavBar from './components/NavBar';
import ReleasesList from './components/ReleasesList';

const App = () => {
    return (
        <>
            <NavBar />
            <div className="container" style={{ paddingTop: '48px' }}>
                <ReleasesList />
            </div>
        </>
    );
};

export default App;
