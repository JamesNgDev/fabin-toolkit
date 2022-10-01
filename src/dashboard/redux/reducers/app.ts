import {
    AppActionType,
    SET_FACEBOOK,
    SET_FACEBOOK_SUCCESS,
    SET_LOADING,
    SET_PAGE_TITLE,
} from '../action-types';
import Facebook from '@helpers/facebook';

export default interface StateInfo {
    pageTitle?: string;
    loading?: boolean;
    facebook?: typeof Facebook;
}

const initialState: StateInfo = {
    pageTitle: '',
    loading: false,
};

export const appReducers = (
    state = initialState,
    action: AppActionType,
): StateInfo => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_PAGE_TITLE:
            return {
                ...state,
                pageTitle: action.payload,
            };
        case SET_FACEBOOK:
            return {
                ...state,
                loading: true,
            };
        case SET_FACEBOOK_SUCCESS:
            return {
                ...state,
                facebook: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
