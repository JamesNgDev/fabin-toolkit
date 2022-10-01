import {
    AppActionType,
    SET_FACEBOOK,
    SET_FACEBOOK_SUCCESS,
    SET_LOADING,
    SET_PAGE_TITLE,
} from '../action-types';
import Facebook from '@helpers/facebook';

export const SetLoading = (payload: boolean): AppActionType => ({
    type: SET_LOADING,
    payload,
});

export const SetPageTitle = (payload: string): AppActionType => ({
    type: SET_PAGE_TITLE,
    payload,
});

export const SetFacebook = (): AppActionType => ({
    type: SET_FACEBOOK,
});

export const SetFacebookSuccess = (payload: Facebook): AppActionType => ({
    type: SET_FACEBOOK_SUCCESS,
    payload,
});
