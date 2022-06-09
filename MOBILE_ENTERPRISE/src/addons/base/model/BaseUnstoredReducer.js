import * as AuthAction from '../../auth/controllers/actionTypes';
import * as BaseAction from '../controllers/actionTypes';
const initialState = {
    errorApp: [],
    beautifulLoading: false,
    thongbao: "",
    appState: 'background',
}


export default (state = initialState, action) => {
    switch (action.type) {
        case AuthAction.UPDATE_ERROR_SUCCESS: {
            const error = [...state.errorApp]
            return {
                ...state,
                errorApp: [...error, action.data]
            }
        }
        case AuthAction.CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                errorApp: []
            }
        case AuthAction.UPDATE_BEAUTY_LOADING_SUCCESS: {
            return {
                ...state,
                beautifulLoading: action.data
            }
        }
        case AuthAction.CLEAR_BEAUTY_LOADING: {
            return {
                ...state,
                beautifulLoading: action.data
            }
        }
        case AuthAction.UPDATE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                thongbao: action.data
            }
        case AuthAction.CLEAR_NOTIFICATION_SUCCESS:
            return {
                ...state,
                thongbao: ""
            }
        case BaseAction.CHANGE_APP_STATE: {
            const { appState } = action.data;
            return {
                ...state,
                appState: appState,
            }
        }
        case BaseAction.CLEAR_ALL_DATA: {
            return {
                ...state,
                errorApp: [],
                beautifulLoading: false,
                thongbao: "",
                appState: 'foreground',
            }
        }
        default:
            return state
    }

}