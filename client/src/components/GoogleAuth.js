import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

const { REACT_APP_GOOGLE_API_CLIENT_ID: CLIENT_ID } = process.env;

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({ clientId: CLIENT_ID, scope: 'email' })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.auth.isSignedIn.listen(this.onAuthChange);
                    this.onAuthChange(this.auth.isSignedIn.get());
                });
        });
    }

    onAuthChange = (isSignedIn) => {
        isSignedIn
            ? this.props.signIn(this.auth.currentUser.get().getId())
            : this.props.signOut();
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        const { isSignedIn } = this.props;

        if (isSignedIn === null) {
            return null;
        } else if (isSignedIn === true) {
            return (
                <div className="text-light " onClick={this.onSignOutClick}>
                    Sign Out
                </div>
            );
        } else {
            return (
                <div className="text-light" onClick={this.onSignInClick}>
                    Sign In
                </div>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = ({ auth }) => {
    const { isSignedIn } = auth;
    return {
        isSignedIn,
    };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
