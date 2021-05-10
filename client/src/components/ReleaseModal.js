import React from 'react';
import { connect } from 'react-redux';

import { updateSelectedRelease } from '../actions';
import { Modal, Button } from 'react-bootstrap';

const ReleaseModal = ({
    show,
    onHide,
    release,
    loading,
    updateSelectedRelease,
}) => {
    const handleUpdate = (complete) => {
        updateSelectedRelease({
            ...release,
            complete,
        });

        onHide();
    };

    if (!release) {
        return null;
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{release.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Have you completed this movie?</Modal.Body>
            <Modal.Footer>
                <Button
                    variant={`${
                        release.complete !== false ? 'outline-' : ''
                    }secondary`}
                    onClick={() => handleUpdate(false)}
                >
                    No
                </Button>
                <Button
                    variant={`${
                        release.complete !== true ? 'outline-' : ''
                    }success`}
                    onClick={() => handleUpdate(true)}
                >
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = ({ releases }) => {
    const { release, loading } = releases.selectedRelease;
    return {
        release,
        loading,
    };
};

export default connect(mapStateToProps, { updateSelectedRelease })(
    ReleaseModal,
);
