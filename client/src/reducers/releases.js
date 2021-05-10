const initialState = {
    loading: true,
    error: false,
    releases: [],
    selectedRelease: {
        release: null,
        loading: false,
    },
};

const releases = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_RELEASES_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'LOAD_RELEASES_SUCCESS': {
            const releases = {};
            action.payload.forEach((r) => {
                releases[r.id] = r;
            });

            return {
                ...state,
                releases,
                loading: false,
            };
        }
        case 'LOAD_RELEASES_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
            };
        case 'SELECT_RELEASE':
            return {
                ...state,
                selectedRelease: {
                    release: action.payload,
                    loading: false,
                },
            };
        case 'UPDATE_SELECTED_RELEASE_REQUEST':
            return {
                ...state,
                selectedRelease: {
                    ...state.selectedRelease,
                    loading: true,
                },
            };
        case 'UPDATE_SELECTED_RELEASE_SUCCESS':
            return {
                ...state,
                releases: {
                    ...state.releases,
                    [action.payload.id]: action.payload,
                },
                selectedRelease: {
                    release: action.payload,
                    loading: false,
                },
            };
        case 'UPDATE_SELECTED_RELEASE_FAILURE':
            return {
                ...state,
                selectedRelease: {
                    ...state.selectedRelease,
                    loading: false,
                },
            };
        default:
            return state;
    }
};

export default releases;
