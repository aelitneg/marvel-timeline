import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getIconStyle = (complete) => {
    return complete ? 'fas' : 'far';
};

const ReleaseIcon = ({ complete }) => {
    return <FontAwesomeIcon icon={[getIconStyle(complete), 'gem']} size="2x" />;
};

export default ReleaseIcon;
