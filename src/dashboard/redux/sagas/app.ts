import { all, put, takeLatest } from 'redux-saga/effects';
import { SET_FACEBOOK } from '@redux/action-types';
import Facebook from '@helpers/facebook';
import { SetFacebookSuccess } from '@redux/actions';

export function* setFacebookSaga(): any {
    const facebook = yield new Facebook().init();
    yield put(SetFacebookSuccess(facebook));
}

export default function* app(): any {
    return all([yield takeLatest(SET_FACEBOOK, setFacebookSaga)]);
}
