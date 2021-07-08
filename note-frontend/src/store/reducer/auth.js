import * as actionTypes from '../actionTypes';

export const initialState = {
    user: null,
    error: null,
    notes: [],
    isUpdated: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                user: action.user,
                error: null
            }

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                user: null,
                error: action.error
            }

        case actionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                error: null
            }

        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error
            }

        case actionTypes.REMOVE_ERROR: {
            return {
                ...state,
                error: null
            }
        }

        case actionTypes.SET_AUTH_DATA: {
            return {
                ...state,
                user: action.user
            }
        }

        case actionTypes.SET_UPDATED_NOTES: {
            return {
                ...state,
                notes: action.notes,
                isUpdated: true
            }
        }

        case actionTypes.SET_ISUPDATE: {
            return {
                ...state,
                isUpdated: false
            }
        }

        default:
            return state;
    }
};

export default reducer;

