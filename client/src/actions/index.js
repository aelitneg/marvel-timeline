import MarvelTimeline from '../apis/marvelTimeline';

import {
    SIGN_IN,
    SIGN_OUT,
    LOAD_RELEASES_REQUEST,
    LOAD_RELEASES_SUCCESS,
    LOAD_RELEASES_FAILURE,
    SELECT_RELEASE,
    UPDATE_SELECTED_RELEASE_REQUEST,
    UPDATE_SELECTED_RELEASE_SUCCESS,
    UPDATE_SELECTED_RELEASE_FAILURE,
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};

export const fetchReleases = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_RELEASES_REQUEST });

        const { data } = await MarvelTimeline.get('/releases');

        dispatch({
            type: LOAD_RELEASES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error(error);
        dispatch({ type: LOAD_RELEASES_FAILURE });
    }
};

export const selectRelease = (release) => {
    return {
        type: SELECT_RELEASE,
        payload: release,
    };
};

export const updateSelectedRelease = (release) => async (
    dispatch,
    getState,
) => {
    try {
        const { auth } = getState();
        dispatch({ type: UPDATE_SELECTED_RELEASE_REQUEST });

        const { data } = await MarvelTimeline.post(`/releases/${release.id}`, {
            ...release,
            userId: auth.userId,
        });

        dispatch({ type: UPDATE_SELECTED_RELEASE_SUCCESS, payload: data });
        return fetchReleases();
    } catch (error) {
        console.error(error);
        dispatch({ type: UPDATE_SELECTED_RELEASE_FAILURE });
    }
};
