import * as AuthAction from '../controllers/actionTypes';
import * as BaseAction from '../../base/controllers/actionTypes';

const initialState = {
    landingUser: false,
    networkStatus: true,
    token: "",
    myUserInfo: '',
    startScreen: false
}

//  cai activeserId dung myUserInfo._id/// ukU
//  a nam kêu bỏ may thang . chỉ dùng token với myUserInfo thôi/

export default (state = initialState, action) => {
    switch (action.type) {
        case AuthAction.UPDATE_TOKEN_SUCCSESS:
            return {
                ...state,
                token: action.data,
            }
        case AuthAction.UPDATE_USER_INFO_SUCCSESS:
            return {
                ...state,
                myUserInfo: action.data,
            }
        case 'UPDATE_NETWORK_STATUS':
            return {
                ...state,
                networkStatus: action.data
            }
        case "UPDATE_LANDING_USER_SUCCSESS":
            return {
                ...state,
                landingUser: action.data
            }
        case BaseAction.CLEAR_ALL_DATA:
            {
                return {
                    ...state,
                    landingUser: false,
                    networkStatus: true,
                    token: "",
                    myUserInfo: '',
                }
            }

        case AuthAction.START_SCREEN:
            return {
                ...state,
                startScreen: action.data
            }
        default:
            return state;
    }
}