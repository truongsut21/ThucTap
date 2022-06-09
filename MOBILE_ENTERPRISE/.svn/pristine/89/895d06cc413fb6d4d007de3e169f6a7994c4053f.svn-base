import * as AuthAction from '../controllers/actionTypes';
import * as BaseAction from '../../base/controllers/actionTypes';

const initialState = {
    splash: true,
    loadingSignIn: false,
    errorMessage: '',

}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SPLASH_SCREEN':
            return {
                ...state,
                splash: action.data,
            }
        case AuthAction.UPDATE_ERROR_MESSAGE_WHILE_AUTH:
            return {
                ...state,
                errorMessage: action.data
            }
        case BaseAction.CLEAR_ALL_DATA:
            {
                return {
                    ...state,
                    splash: true,
                    loadingSignIn: false,
                    errorMessage: '',
                }
            }
        case AuthAction.UPDATE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notificationMessage: action.data
            }
        default:
            return state;
    }
}