import Facebook from '@helpers/facebook';

export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';
export const SET_LOADING = 'SET_LOADING';
export const SET_FACEBOOK = 'SET_FACEBOOK';
export const SET_FACEBOOK_SUCCESS = 'SET_FACEBOOK_SUCCESS';

export interface SetPageTitleAction {
    type: typeof SET_PAGE_TITLE;
    payload: string;
}

export interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

export interface SetFacebook {
    type: typeof SET_FACEBOOK;
}

export interface SetFacebookSuccess {
    type: typeof SET_FACEBOOK_SUCCESS;
    payload: typeof Facebook;
}

export type AppActionType =
    | SetPageTitleAction
    | SetLoadingAction
    | SetFacebook
    | SetFacebookSuccess;
