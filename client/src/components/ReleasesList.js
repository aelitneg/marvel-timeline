import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchReleases } from '../actions';

import Alert from './Alert';
import ReleaseItem from './ReleaseItem';
import ReleasesLoader from './ReleasesLoader';

const ReleasesList = ({ releases, loading, error, fetchReleases }) => {
    useEffect(() => {
        fetchReleases();
    }, [fetchReleases]);

    const renderReleases = () => {
        return releases.map((release) => {
            return (
                <div className="row" key={release.id}>
                    <div className="col">
                        <ReleaseItem release={release} />
                    </div>
                </div>
            );
        });
    };

    if (loading) {
        return <ReleasesLoader />;
    }

    if (error) {
        return (
            <div className="screen-center">
                <Alert
                    role="danger"
                    message="The timeline is currently unavailable. Please try again later."
                />
            </div>
        );
    }

    return <div>{renderReleases()}</div>;
};

const mapStateToProps = ({ releases }) => {
    return {
        releases: Object.values(releases.releases).sort(
            (a, b) => a.sortOrder - b.sortOrder,
        ),
    };
};

export default connect(mapStateToProps, { fetchReleases })(ReleasesList);
