import React, { useState } from 'react';
import { connect } from 'react-redux';

import { selectRelease } from '../actions';

import ReleaseIcon from './ReleaseIcon';
import ReleaseModal from './ReleaseModal';

const ReleaseCard = ({ release, selectRelease }) => {
    const [showModal, setShowModal] = useState(false);

    const handleSelectRelease = () => {
        selectRelease(release);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    if (!release) {
        return null;
    }

    return (
        <>
            <ReleaseModal show={showModal} onHide={handleCloseModal} />
            <div className="p-3">
                <div className="d-flex align-items-center">
                    <div className="p-2" onClick={handleSelectRelease}>
                        <ReleaseIcon complete={release.complete} />
                    </div>
                    <div className="h4">{release.title}</div>
                </div>
            </div>
        </>
    );
};

export default connect(null, { selectRelease })(ReleaseCard);
