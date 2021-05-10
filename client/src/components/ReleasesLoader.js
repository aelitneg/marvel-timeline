import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReleasesLoader = () => {
    return (
        <div className="screen-center">
            <FontAwesomeIcon icon="gem" size="6x" />
            <div className="text-center">Loading</div>
        </div>
    );
};

export default ReleasesLoader;
