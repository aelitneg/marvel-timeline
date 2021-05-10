import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getIcon = (role) => {
    switch (role) {
        case 'danger':
            return 'exclamation-circle';
        default:
            return;
    }
};

const Alert = ({ role, message }) => {
    const icon = getIcon(role);

    return (
        <div className="alert alert-danger" role={role}>
            {icon ? <FontAwesomeIcon icon={icon} /> : null}
            <span className="ms-2">{message}</span>
        </div>
    );
};

export default Alert;
